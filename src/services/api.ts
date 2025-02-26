import axios from 'axios';

const API_URL = 'http://localhost:5000/api/characters';
/*const API_URL1 = 'http://dnd.knowingfire.ru/api/characters';*/

export const fetchCharacters = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchCharacterById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCharacterr = async (formData: FormData) => {
  try {
    const response = await fetch('${API_URL}/$', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка при создании персонажа: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    return null;
  }
};
export const createCharacter = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании персонажа:", error);
    throw error;
  }
};




export const updateCharacter = async (id: number, formData: FormData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
    throw error;
  }
};


export const deleteCharacter = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Удалено:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Ошибка при удалении персонажа:', error);
    throw error; 
  }
};
