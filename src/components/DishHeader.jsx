import React from 'react';
import './DishHeader.css';

export default function DishHeader({ photo, name, description }) {
  return (
    <div className="dish-header-container">
      <div className="dish-poster">
        <img src={photo} alt={`Foto de ${name}`} />
      </div>
      <div className="dish-info">
        <h1 className="dish-name">{name}</h1>
        <p className="dish-description">{description}</p>
      </div>
    </div>
  );
}