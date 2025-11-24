import React, { useState } from 'react'
import api from '../api'
import './ReviewForm.css'
import { useAuth } from '../context/AuthContext'

const StarInput = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <button
    type="button"
    className={`star-input-button ${filled ? 'filled' : ''}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    aria-label={`Dar ${filled ? 'ou remover' : ''} nota`}
  >
    <svg
      className="star-svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
    </svg>
  </button>
)

export default function ReviewForm({ dishId, onSubmitSuccess }) {
  const [score, setScore] = useState(0)
  const [hoverScore, setHoverScore] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (score === 0) {
      setError('Você precisa selecionar uma nota (de 1 a 5 estrelas).')
      return
    }

    if (!user) {
      setError('Você precisa estar logado para avaliar.')
      // TODO: Redirecionar para o login
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const { data } = await api.post('ratings/create', {
        userId: user.userId,
        dishId,
        score,
        comment: comment || null,
      })

      onSubmitSuccess(data)

      setScore(0)
      setHoverScore(0)
      setComment('')
    } catch (err) {
      console.error('Falha ao enviar avaliação:', err)
      setError('Não foi possível enviar sua avaliação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scoreLabel =
    ['Sua nota...', 'Ruim', 'Ok', 'Bom', 'Muito Bom', 'Excelente!'][
      hoverScore || score
    ] || 'Sua nota...'

  return (
    <form className="add-review-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Deixe sua avaliação</h3>
        <span className="score-label">{scoreLabel}</span>
      </div>

      <div className="star-input-container">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <StarInput
            key={starValue}
            filled={starValue <= (hoverScore || score)}
            onClick={() => setScore(starValue)}
            onMouseEnter={() => setHoverScore(starValue)}
            onMouseLeave={() => setHoverScore(0)}
          />
        ))}
      </div>
      <textarea
        type="text"
        className="comment-textarea"
        placeholder="Escreva um comentário (opcional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={200}
      />
      <div className="form-footer">
        <span className="char-counter">{200 - comment.length}</span>
        <button
          type="submit"
          className="submit-review-btn"
          disabled={isSubmitting || score === 0 || !user}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  )
}
