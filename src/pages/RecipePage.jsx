import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import Header from '../components/Header'
import DishHeader from '../components/DishHeader'
import RecipeDetails from '../components/RecipeDetails'
import IngredientList from '../components/IngredientList'
import ReviewSection from '../components/ReviewSection'
import './RecipePage.css'
import { useAuth } from '../context/AuthContext'

function RecipePage() {
  const { dishId } = useParams()
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const fetchDish = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = user ? { userId: user.userId } : {};

      const response = await api.get(`dishes/${dishId}`, { params });

      setDish(response.data)
    } catch (err) {
      console.error('Falha ao buscar detalhes do prato:', err)
      setError('Não foi possível carregar os dados do prato.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDish()
  }, [dishId, user])

  const handleReviewSubmitted = async () => {
    await fetchDish();
  }

  if(loading) {
    return (
      <div className="recipe-page-container">
        <Header />
        <div className="page-loading">Carregando...</div>
      </div>
    )
  }

  if (error) {
     return (
      <div className="recipe-page-container">
        <Header />
        <div className="page-error">{error}</div>
      </div>
    )
  }

  if (!dish) {
    return (
      <div className="recipe-page-container">
        <Header />
        <div className="page-error">Prato não encontrado.</div>
      </div>
    )
  }

  return (
    <div className="recipe-page-container">
      <Header />
      <div className="recipe-page-content">
        <DishHeader
          photo={dish.photo}
          name={dish.name}
          description={dish.description}
        />
        <div className="recipe-body-grid">
          <div className="recipe-main-content">
            <RecipeDetails instructions={dish.recipe?.instructions} />
            <IngredientList ingredients={dish.recipe?.ingredients} />
          </div>
          <div className="recipe-sidebar"></div>
        </div>
        <ReviewSection
          ratings={dish.ratings}
          dishId={parseInt(dishId)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>
    </div>
  )
}

export default RecipePage