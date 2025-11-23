import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import './FeedPost.css';

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "a";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m";

  interval = seconds / 604800;
  if (interval > 1) return Math.floor(interval) + " sem";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "min";

  return "agora";
}


export default function FeedPost({ post }) {
  const { score, comment, createdAt, user, dish } = post;

  const timeAgo = formatTimeAgo(createdAt);

  return (
    <div className="feed-post-card">
      <div className="feed-post-sidebar">
        <Link to={`/dish/${dish.dishId}`} className="feed-dish-poster-link">
          <img
            src={dish.photo}
            alt={dish.name}
            className="feed-dish-poster"
          />
        </Link>
      </div>

      <div className="feed-post-main">
        <div className="feed-post-header">
          <Link to={`/user/${user.userId}`} className="feed-user-avatar">
            {user.name ? user.name[0] : '?'}
          </Link>
          <div className="feed-header-info">
            <span className="feed-text-line">
              <Link to={`/user/${user.userId}`} className="feed-user-name">
                {user.name}
              </Link>
              {' avaliou '}
              <Link to={`/dish/${dish.dishId}`} className="feed-dish-name">
                {dish.name}
              </Link>
            </span>
            <span className="feed-metadata">
              <StarRating score={score} />
              <span className="feed-time">{timeAgo}</span>
            </span>
          </div>
        </div>

        {comment && (
          <div className="feed-post-comment">
            <p>{comment}</p>
          </div>
        )}
      </div>
    </div>
  );
}