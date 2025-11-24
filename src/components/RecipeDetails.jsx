import React from 'react';
import './RecipeDetails.css';

export default function RecipeDetails({ instructions }) {
  if (!instructions) {
    return (
      <section className="recipe-details-section">
        <h2>Modo de Preparo</h2>
        <p>Instruções de preparo não disponíveis.</p>
      </section>
    );
  }

  const instructionSteps = instructions.split('\n').filter(step => step.trim() !== '');

  return (
    <section className="recipe-details-section">
      <h2>Modo de Preparo</h2>
      <div className="recipe-instructions">
        {instructionSteps.length > 1 ? (
          <ol>
            {instructionSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>{instructions}</p>
        )}
      </div>
    </section>
  );
}