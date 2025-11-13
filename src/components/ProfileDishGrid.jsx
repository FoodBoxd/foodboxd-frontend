import React from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'
import './ProfileDishGrid.css'

const DishGridCard = ({ dish, onClick }) => {
  return (
    <div className="dish-grid-card" onClick={onClick}>
      <div className="dish-card-poster">
        <img src={dish.dishPhoto} alt={dish.dishName} />
      </div>
      <div className="dish-card-meta">
        <span className="dish-card-name">{dish.dishName}</span>

        {typeof dish.userScore === 'number' && (
          <div className="dish-card-rating">
            <StarRating score={dish.userScore} />
          </div>
        )}

      </div>
    </div>
  )
}

export default function ProfileDishGrid({ dishes, emptyMessage }) {
  const navigate = useNavigate()

  if (!dishes || dishes.length === 0) {
    return (
      <p className="profile-grid-empty">
        {emptyMessage || 'Nenhum item para exibir.'}
      </p>
    )
  }

  return (
    <div className="profile-dish-grid">
      {dishes.map((dish) => (
        <DishGridCard
          key={dish.dishId}
          dish={dish}
          onClick={() => navigate(`/dish/${dish.dishId}`)}
        />
      ))}
    </div>
  )
}