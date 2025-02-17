// src/components/ItemList.tsx
import React from 'react';
import { Item } from '../types/item';

interface ItemListProps {
  items: Item[];
  onEdit: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onEdit(item.id, 'New Name')}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;