import React from 'react';
import './MapPage.css';

// Определяем интерфейс для типа данных региона
interface Region {
  name: string;
  description: string;
  image: string;
}

// Массив регионов с явным типом
const regions: Region[] = [
  {
    name: "Трештатье",
    description: "Страна, где происходит основной сюжет",
    image: "/reg/Tri.png",
  },
  {
    name: "Дора",
    description: "Город, полный самых разных культур",
    image: "/reg/DORA.jpg",
  },
  {
    name: "Треград",
    description: "Столица Трештатья\nВеликий магический город",
    image: "/reg/TREGRAD.jpg",
  },
];

const MapPage: React.FC = () => {
  return (
    <div className="map-page">
      <h1>Карта Мира</h1>
      <div className="map-container">
        <div className="map-grid">
          {/* Карта мира */}
          <div className="WorldMap">
            <img src="/reg/Duck.png" alt="World Map" className="map-region" />
          </div>
          <br />

          {/* Список регионов */}
          {regions.map((region, index) => (
            <div className="city" key={index}>
              <p className="p">
                <strong>{region.name}: </strong>
                {region.description.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <img src={region.image} alt={`Region ${index + 2}`} className="map-region" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;