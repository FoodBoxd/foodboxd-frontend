import React from 'react';
import './StarRating.css';

// Componente para Estrela Cheia
const FullStar = () => (
  <svg className="star-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
  </svg>
);

// Componente para Meia Estrela
const HalfStar = () => (
  <svg className="star-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Fundo da estrela (vazia) */}
    <path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z" opacity="0.3" />
    {/* Metade esquerda preenchida */}
    <path d="M12 15.4V6.1l-1.71 4.03-4.38.38 3.32 2.88-1 4.28L12 15.4z" />
  </svg>
);

// Componente para Estrela Vazia
const EmptyStar = () => (
  <svg className="star-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" opacity="0.3">
    {/* Caminho completo da estrela com opacidade */}
    <path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/>
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
    } else if (i - 0.5 <= score) {
      // Se a nota for maior ou igual ao índice - 0.5, meia estrela
      stars.push(<HalfStar key={i} />);
    } else {
      // Senão, estrela vazia
      stars.push(<EmptyStar key={i} />);
    }
  }
  return <div className="star-rating">{stars}</div>;
};