import React from 'react';
import StarRating from './StarRating'; // Importa o novo componente
import './ReviewSection.css';

export default function ReviewSection({ ratings }) {
  return (
    <section className="review-section">
      <h2>Avaliações</h2>
      {/* Aqui entrará o formulário para o usuário logado
        adicionar uma nova avaliação (novo componente)
      */}
      <div className="review-list">
        {(!ratings || ratings.length === 0) ? (
          <p className="no-reviews">Este prato ainda não possui avaliações.</p>
        ) : (
          ratings.map((rating) => (
            <div key={rating.ratingId} className="review-card">
              <div className="review-header">
                <span className="review-user">{rating.user?.name || 'Anônimo'}</span>
                {/* USA O COMPONENTE DE ESTRELAS */}
                <StarRating score={rating.score} />
              </div>
              <p className="review-comment">{rating.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}