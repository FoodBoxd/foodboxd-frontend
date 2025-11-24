import React from 'react';
import './StarRating.css';

// Componente para Estrela Cheia
const FullStar = () => (
  <svg className="star-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
  </svg>
);

const EmptyStar = () => (
  <svg
    className="star-svg"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill="none"
      stroke="#66410c"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Componente principal que renderiza as estrelas com base na nota
export default function StarRating({ score }) {
  const stars = [];
  // Loop de 1 a 5 para criar as estrelas
  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      // Se a nota for maior ou igual ao índice, estrela cheia
      stars.push(<FullStar key={i} />);
    } else {
      // Senão, estrela vazia
      stars.push(<EmptyStar key={i} />);
    }
  }
  return <div className="star-rating">{stars}</div>;
};