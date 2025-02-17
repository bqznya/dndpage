import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCharacterById, updateCharacter, deleteCharacter } from '../../services/api.ts';
import './CharacterDetail.css';

interface Character {
  id: number;
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
  level?: string;
  imageFile?: File; // Добавляем поле для хранения файла
}

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка персонажа
  useEffect(() => {
    const loadCharacter = async () => {
      if (id) {
        try {
          const data = await fetchCharacterById(id);
          setCharacter(data);
        } catch (error) {
          console.error('Ошибка при загрузке персонажа:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadCharacter();
  }, [id]);

  // Обработчик изменения текстовых полей
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCharacter((prev) => prev && { ...prev, [name]: value });
  };

  // Обработчик изменения изображения
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Сохраняем файл для отправки и создаем временный URL для предпросмотра
    const previewUrl = URL.createObjectURL(file);
    setCharacter((prev) => prev && { 
      ...prev, 
      image: previewUrl, // Для предпросмотра
      imageFile: file // Сохраняем сам файл
    });
  }
};

  // Сохранение изменений
const handleSave = async () => {
  if (!character || !id) return;

  const formData = new FormData();
  
  // Добавляем все поля кроме image
  Object.keys(character).forEach(key => {
    if (key !== 'image' && key !== 'imageFile') {
      formData.append(key, character[key as keyof Character]);
    }
  });

  // Добавляем файл изображения если есть
  if (character.imageFile) {
    formData.append('image', character.imageFile);
  }

  try {
    // Преобразуем id в число
    await updateCharacter(Number(id), formData);
    setIsEditing(false);
	navigate(`/character/${id}`);
  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    alert('Ошибка сохранения!');
  }
};

  // Удаление персонажа
  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm('Вы уверены, что хотите удалить персонажа?')) {
      try {
        await deleteCharacter(id);
        navigate('/');
      } catch (error) {
        console.error('Ошибка при удалении персонажа:', error);
        alert('Не удалось удалить персонажа.');
      }
    }
  };

  // Копирование информации о персонаже в буфер обмена
  const handleCopyToClipboard = () => {
    if (!character) return;

    const characterString = JSON.stringify(character, null, 2);
    navigator.clipboard
      .writeText(characterString)
      .then(() => alert('Информация о персонаже скопирована в буфер обмена!'))
      .catch((err) => {
        console.error('Ошибка при копировании:', err);
        alert('Не удалось скопировать информацию.');
      });
  };

  // Отображение загрузки
  if (isLoading) return <div className="loading">Загрузка...</div>;

  // Если персонаж не найден
  if (!character) return (
    <div className="character-not-found">
      <img src="/notfound.png" alt="Not Found" className="not-found-image" />
      <h2>Такого персонажа ещё нет, хотите создать?</h2>
      <button onClick={() => navigate('/create')} className="nav-button">
        Создать Персонажа
      </button>
    </div>
  );

  return (
    <div className="character-detail">
      {isEditing ? (
        <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <label htmlFor="name">Имя персонажа:</label>
          <input type="text" name="name" placeholder="Имя персонажа" value={character.name} onChange={handleChange} required />

          <label htmlFor="race">Раса:</label>
          <input type="text" name="race" placeholder="Раса" value={character.race} onChange={handleChange} required />

          <label htmlFor="class">Класс:</label>
          <input type="text" name="class" placeholder="Класс" value={character.class} onChange={handleChange} required />

          <label htmlFor="image">Изображение:</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />

          <label htmlFor="armor">Броня:</label>
          <input type="text" name="armor" placeholder="Броня" value={character.armor} onChange={handleChange} required />

          <label htmlFor="health">Здоровье:</label>
          <input type="text" name="health" placeholder="Здоровье" value={character.health} onChange={handleChange} required />


          <label htmlFor="level">Уровень:</label>
          <input type="text" name="level" placeholder="Уровень" value={character.level} onChange={handleChange} required />


          <label htmlFor="strength">Сила:</label>
          <input type="text" name="strength" placeholder="Сила" value={character.strength} onChange={handleChange} required />

          <label htmlFor="dexterity">Ловкость:</label>
          <input type="text" name="dexterity" placeholder="Ловкость" value={character.dexterity} onChange={handleChange} required />

          <label htmlFor="endurance">Выносливость:</label>
          <input type="text" name="endurance" placeholder="Выносливость" value={character.endurance} onChange={handleChange} required />

          <label htmlFor="wisdom">Мудрость:</label>
          <input type="text" name="wisdom" placeholder="Мудрость" value={character.wisdom} onChange={handleChange} required />

          <label htmlFor="intelligence">Интеллект:</label>
          <input type="text" name="intelligence" placeholder="Интеллект" value={character.intelligence} onChange={handleChange} required />

          <label htmlFor="charisma">Харизма:</label>
          <input type="text" name="charisma" placeholder="Харизма" value={character.charisma} onChange={handleChange} required />

          <label htmlFor="backstory">Предыстория:</label>
          <textarea name="backstory" placeholder="Предыстория" value={character.backstory} onChange={handleChange}></textarea>

          <label htmlFor="features">Особенности:</label>
          <textarea name="features" placeholder="Особенности" value={character.features} onChange={handleChange}></textarea>

          <label htmlFor="equipment">Снаряжение:</label>
          <textarea name="equipment" placeholder="Снаряжение" value={character.equipment} onChange={handleChange}></textarea>

          <label htmlFor="spells">Заклинания:</label>
          <textarea name="spells" placeholder="Заклинания" value={character.spells} onChange={handleChange}></textarea>

          <label htmlFor="notes">Заметки:</label>
          <textarea name="notes" placeholder="Заметки" value={character.notes} onChange={handleChange}></textarea>

          <button type="submit">Сохранить</button>
		  
          <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Отмена</button>
        </form>
		
      ) : (
        <>
          <div className="character-info">
            <h1>{character.name}</h1>
            <h2>{character.race}</h2>
            <h2>{character.class}</h2>
          </div>
          <div className="character-container">
            <div className="character-image">
              <img src={`http://localhost:5000${character.image}`} alt={character.name} />
              <div className="stat-box level">{character.level}</div>
              <div className="stats-overlay">
                <div className="stat-box armor">{character.armor}</div>
                <div className="stat-box health">{character.health}</div>
              </div>
            </div>
            <div className="character-stats">
              <div className="stat"><div className="value">{character.strength}</div><div className="name">Сила</div></div>
              <div className="stat"><div className="value">{character.dexterity}</div><div className="name">Ловкость</div></div>
              <div className="stat"><div className="value">{character.endurance}</div><div className="name">Выносливость</div></div>
              <div className="stat"><div className="value">{character.wisdom}</div><div className="name">Мудрость</div></div>
              <div className="stat"><div className="value">{character.intelligence}</div><div className="name">Интеллект</div></div>
              <div className="stat"><div className="value">{character.charisma}</div><div className="name">Харизма</div></div>
            </div>
            <div className="character-info">
              <p><strong>Предыстория:</strong> {character.backstory || 'Нет данных'}</p>
              <p><strong>Особенности:</strong> {character.features || 'Нет данных'}</p>
              <p><strong>Снаряжение:</strong> {character.equipment || 'Нет данных'}</p>
              <p><strong>Заклинания:</strong> {character.spells || 'Нет данных'}</p>
              <div className="character-actions">
                <button className="action-button" onClick={() => setIsEditing(true)}>Редактировать</button>
                <button className="delete-button" onClick={handleDelete}>Удалить</button>
                <button className="copy-button" onClick={handleCopyToClipboard}>Скопировать в буфер</button>
              </div>
            </div>
          </div>
        </>
      )}
      {!isEditing && (
        <div className="character-notes">
          <h3>Заметки</h3>
          <textarea
            name="notes"
            value={character.notes || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="notes-textarea"
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;