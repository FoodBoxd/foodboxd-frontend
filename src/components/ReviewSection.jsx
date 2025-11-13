import React from 'react';
import StarRating from './StarRating';
import './ReviewSection.css';
import ReviewForm from './ReviewForm';
import LikeButton from './LikeButton';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function ReviewSection({ ratings, dishId, onReviewSubmitted }) {

  const { user } = useAuth();

  const handleLikeClick = async (ratingId) => {
    if (!user) {
      console.log("Utilizador não logado, a redirecionar para login...");

      return;
    }

    try {
      await api.post('ratings/toggle-like', {
        userId: user.userId,
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
      <ReviewForm
        dishId={dishId}
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