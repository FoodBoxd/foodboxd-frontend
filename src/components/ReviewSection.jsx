import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import { useAuth } from '../context/AuthContext';
import './ReviewSection.css';

export default function ReviewSection({ ratings, dishId, onReviewSubmitted }) {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="review-section">
      <h2>Avaliações</h2>

      {isAuthenticated ? (
        <ReviewForm
          dishId={dishId}
          userId={user.userId}
          onSubmitSuccess={onReviewSubmitted}
        />
      ) : (
        <p className="login-prompt">
          <Link to="/login">Faça login</Link> para deixar uma avaliação.
        </p>
      )}

      <div className="review-divider"></div>

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