// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchItems, addItem, deleteItem } from './services/api';
import { Item } from './types/item';
import ItemList from './components/ItemList';
// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList/CharacterList.tsx';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail.tsx';
import CharacterCreate from './pages/CharacterCreate/CharacterCreate.tsx';
import MapPage from './pages/MapPage/MapPage.tsx'; // Импортируем новый компонент
import Header from './pages/Header/Header.tsx'; // Импортируем новый компонент
import './App.css';
const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <div className="main-container"> {/* Добавляем контейнер */}
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/create" element={<CharacterCreate />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;