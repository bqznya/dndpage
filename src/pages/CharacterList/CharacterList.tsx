import './CharacterList.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCharacters } from '../../services/api.ts';

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    const loadCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
    };
    loadCharacters();
  }, []);

  return (
    <div className="character-list">
      <h1>Список персонажей</h1>
      <div className="characters-container">
        {characters.map((character) => (
          <Link to={`/character/${character.id}`} className="nonono">
            <div key={character.id} className="character-card">
              <img src={`http://localhost:5000${character.image}`} alt={character.name} />
              <h2>{character.name}</h2>
              <p>{character.class}</p>
              <div className="level-indicator">{character.level}</div>
              <div className="character-stats-hover">
                <div className="armor-stat">{character.armor}</div>
                <div className="health-stat">{character.health}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;