import React from 'react';
import './DishHeader.css';
import HeartIcon from './HeartIcon';

export default function DishHeader({
  photo,
  name,
  description,
  isFavorited,
  onToggleFavorite,
  favoritesCount,
}) {
  return (
    <div className="dish-header-container">
      <div className="dish-poster">
        <img src={photo} alt={`Foto de ${name}`} />
      </div>
      <div className="dish-info">
        <h1 className="dish-name">{name}</h1>
        <p className="dish-description">{description}</p>

        <div className="dish-actions">
          <button
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorited ? 'Desfavoritar prato' : 'Favoritar prato'}
          >
            <HeartIcon filled={isFavorited} />
            <span>{favoritesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}