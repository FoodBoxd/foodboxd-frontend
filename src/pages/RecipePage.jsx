import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import Header from '../components/Header'
import DishHeader from '../components/DishHeader'
import RecipeDetails from '../components/RecipeDetails'
import IngredientList from '../components/IngredientList'
import ReviewSection from '../components/ReviewSection'
import './RecipePage.css'

function RecipePage() {
  const { dishId } = useParams()
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDish = async () => {
      setLoading(true)
      try {
        const response = await api.get(`dishes/${dishId}`)

        if (!response.data.recipe) {
          console.warn('API não retornou dados completos.')
        } else {
          setDish(response.data)
        }
      } catch (err) {
        console.error('Falha ao buscar detalhes do prato:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDish()
  }, [dishId])

  if(loading) {
    return <div>Carregando...</div>
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
            <IngredientList ingredients={dish.recipe.ingredients} />
          </div>
          <div className="recipe-sidebar"></div>
        </div>
        <ReviewSection ratings={dish.ratings} />
      </div>
    </div>
  )
}

export default RecipePage
