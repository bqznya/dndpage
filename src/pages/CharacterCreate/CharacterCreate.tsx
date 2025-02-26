import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCharacter } from '../../services/api.ts';
import './CharacterCreate.css';

// Интерфейс персонажа
interface Character {
  id?: number;
  name: string;
  race: string;
  class: string;
  image: string;
  armor: string;
  health: string;
  strength: string;
  dexterity: string;
  endurance: string;
  wisdom: string;
  intelligence: string;
  charisma: string;
  backstory: string;
  features: string;
  equipment: string;
  spells: string;
  notes: string;
  level: string;
}

const CharacterCreate: React.FC = () => {
  const navigate = useNavigate();

  // Состояние персонажа
  const [character, setCharacter] = useState<Character>({
    name: '',
    race: '',
    class: '',
    image: '/image.webp', // Заглушка по умолчанию
    armor: '',
    health: '',
    strength: '',
    dexterity: '',
    endurance: '',
    wisdom: '',
    intelligence: '',
    charisma: '',
    backstory: '',
    features: '',
    equipment: '',
    spells: '',
    notes: '',
    level: '',
  });

  // Обработчик изменений в полях формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик загрузки изображения
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file);
  }
};

  // Отправка данных на сервер
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", character.name);
    formData.append("race", character.race);
    formData.append("class", character.class);
    formData.append("armor", character.armor);
    formData.append("health", character.health);
    formData.append("strength", character.strength);
    formData.append("dexterity", character.dexterity);
    formData.append("endurance", character.endurance);
    formData.append("wisdom", character.wisdom);
    formData.append("intelligence", character.intelligence);
    formData.append("charisma", character.charisma);
    formData.append("backstory", character.backstory);
    formData.append("features", character.features);
    formData.append("equipment", character.equipment);
    formData.append("spells", character.spells);
    formData.append("notes", character.notes);
    formData.append("level", character.level);    
    if (imageFile) { // ✅ Проверяем, есть ли файл
      formData.append("image", imageFile);
    }

    const response = await createCharacter(formData);
    
    if (response && response.id) {
      alert("Персонаж успешно создан!");
      navigate("/");
    } else {
      throw new Error("Ошибка при создании персонажа");
    }
  } catch (error) {
    console.error("Ошибка при создании персонажа:", error);
    alert("Не удалось сохранить персонажа.");
  }
};
const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <div className="character-create">
      <h1>Создание нового персонажа</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <p className="photo">Фото персонажа <input type="file" name="image" accept="image/*" onChange={handleImageChange} /></p>
        <input type="text" name="name" placeholder="Имя персонажа" required onChange={handleChange} />
        <input type="text" name="race" placeholder="Раса" required onChange={handleChange} />
        <input type="text" name="class" placeholder="Класс" required onChange={handleChange} />
        <input type="text" name="level" placeholder="Уровень" required onChange={handleChange} />
        <input type="text" name="armor" placeholder="Броня" required onChange={handleChange} />
        <input type="text" name="health" placeholder="Здоровье" required onChange={handleChange} />
        <input type="text" name="strength" placeholder="Сила" required onChange={handleChange} />
        <input type="text" name="dexterity" placeholder="Ловкость" required onChange={handleChange} />
        <input type="text" name="endurance" placeholder="Выносливость" required onChange={handleChange} />
        <input type="text" name="wisdom" placeholder="Мудрость" required onChange={handleChange} />
        <input type="text" name="intelligence" placeholder="Интеллект" required onChange={handleChange} />
        <input type="text" name="charisma" placeholder="Харизма" required onChange={handleChange} />
        <textarea name="backstory" placeholder="Предыстория" onChange={handleChange}></textarea>
        <textarea name="features" placeholder="Особенности" onChange={handleChange}></textarea>
        <textarea name="equipment" placeholder="Снаряжение" onChange={handleChange}></textarea>
        <textarea name="spells" placeholder="Заклинания" onChange={handleChange}></textarea>
        <textarea name="notes" placeholder="Заметки" onChange={handleChange}></textarea>
        <button type="submit">Создать персонажа</button>
      </form>
    </div>
  );
};

export default CharacterCreate;
