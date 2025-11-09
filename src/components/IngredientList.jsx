import React from 'react';
import { Link } from 'react-router-dom';
import './IngredientList.css';

export default function IngredientList({ ingredients }) {
  if (!ingredients || ingredients.length === 0) {
    return (
      <section className="ingredient-list-section">
        <h2>Ingredientes</h2>
        <p>Lista de ingredientes não disponível.</p>
      </section>
    );
  }

  return (
    <section className="ingredient-list-section">
      <h2>Ingredientes</h2>
      <div className="ingredient-tags">
        {ingredients.map((item, index) => (
          <Link
            key={index}
            // Navega para uma futura página de busca
            to={`/search?q=${encodeURIComponent(item.name)}`}
            className="ingredient-tag"
          >
            {item.name}
            <span className="ingredient-quantity">
              ({item.quantity} {item.measurementUnit})
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}