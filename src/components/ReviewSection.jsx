import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import api from '../api';
import './ReviewSection.css';
import LikeButton from './LikeButton';
import { useAuth } from '../context/AuthContext';

export default function ReviewSection({ ratings, dishId, onReviewSubmitted }) {
  const { isAuthenticated, user } = useAuth();

  const currentUserId = user.userId;

  const handleLikeClick = async (ratingId) => {
    try {
      await api.post('ratings/toggle-like', {
        userId: currentUserId,
        ratingId: ratingId,
      });

      onReviewSubmitted();
    } catch (err) {
      console.error('Falha ao curtir o review:', err);
    }
  };

  return (
    <section className="review-section">
      <h2>Avaliações</h2>

      {isAuthenticated ? (
        <ReviewForm
          dishId={dishId}
          userId={currentUserId}
          onSubmitSuccess={onReviewSubmitted}
        />
      ) : (
        <p className="login-prompt">
          <Link to="/login">Faça login</Link> para deixar uma avaliação.
        </p>
      )}

      <div className="review-divider" />

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

              {rating.comment && (
                <p className="review-comment">{rating.comment}</p>
              )}

              <div className="review-footer">
                <LikeButton
                  isLiked={rating.isLikedByCurrentUser}
                  likeCount={rating.likeCount}
                  onClick={() => handleLikeClick(rating.ratingId)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}