import React from 'react';
import StarRating from './StarRating';
import './ReviewSection.css';
import AddReviewForm from './ReviewForm';

export default function ReviewSection({ ratings, dishId, onReviewSubmitted }) {
  return (
    <section className="review-section">
      <h2>Avaliações</h2>
      <AddReviewForm
        dishId={dishId}
        userId={1}
        onSubmitSuccess={onReviewSubmitted}
      />
      <div className="review-list">
        {(!ratings || ratings.length === 0) ? (
          <p className="no-reviews">Este prato ainda não possui avaliações.</p>
        ) : (
          ratings.map((rating) => (
            <div key={rating.ratingId} className="review-card">
              <div className="review-header">
                <span className="review-user">{rating.user?.name || 'Anônimo'}</span>
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