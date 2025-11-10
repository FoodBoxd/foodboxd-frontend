import React from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating' // Reutilizando seu componente
import './ProfileDishGrid.css'

// Card similar ao CarouselCard, mas adaptado para o grid
const DishGridCard = ({ dish, onClick }) => {
  return (
    <div className="dish-grid-card" onClick={onClick}>
      <div className="dish-card-poster">
        <img src={dish.dishPhoto} alt={dish.dishName} />
      </div>
      <div className="dish-card-meta">
        <span className="dish-card-name">{dish.dishName}</span>
        <div className="dish-card-rating">
          <StarRating score={dish.userScore} />
        </div>
        {/* A info "Restaurante" não existe no modelo do backend */}
      </div>
    </div>
  )
}

export default function ProfileDishGrid({ dishes }) {
  const navigate = useNavigate()

  if (!dishes || dishes.length === 0) {
    return (
      <p className="profile-grid-empty">
        Este usuário ainda não avaliou nenhum prato.
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