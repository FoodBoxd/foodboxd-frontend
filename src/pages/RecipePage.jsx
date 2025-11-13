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


  const [isFavorited, setIsFavorited] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    const fetchDish = async () => {
      setLoading(true)
      try {
        const response = await api.get(`dishes/${dishId}`)

        if (!response.data.recipe) {
          console.warn('API não retornou dados completos.')
        } else {
          setDish(response.data)
          setIsFavorited(response.data.isFavoritedByCurrentUser)
          setFavoritesCount(response.data.favoritesCount)         
        }
      } catch (err) {
        console.error('Falha ao buscar detalhes do prato:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDish()
  }, [dishId])

  const handleReviewSubmitted = async () => {
    const { data } = await api.get(`dishes/${dishId}`)
    setDish(data)
  }

  const handleToggleFavorite = async () => {
    // ID do usuário (fixo por enquanto, igual ao backend)
    const currentUserId = 1 

    // Atualização otimista (muda a UI antes da resposta da API)
    const newFavoriteStatus = !isFavorited
    setIsFavorited(newFavoriteStatus)
    setFavoritesCount((currentCount) =>
      newFavoriteStatus ? currentCount + 1 : currentCount - 1
    )

    try {
      // Envia a requisição para o novo controller
      const response = await api.post('favorites/toggle', {
        userId: currentUserId,
        dishId: parseInt(dishId),
      })

      // Sincroniza o estado com a resposta final da API (garantia)
      setIsFavorited(response.data.favorited)
      setFavoritesCount(response.data.favoritesCount)
    } catch (err) {
      console.error('Falha ao atualizar favorito:', err)
      // Reverte a UI em caso de erro
      setIsFavorited(!newFavoriteStatus)
      setFavoritesCount((currentCount) =>
        !newFavoriteStatus ? currentCount + 1 : currentCount - 1
      )
    }
  }  

  if(loading) {
    return <div>Carregando...</div>
  }

// 4. Adicione uma verificação de segurança (similar à que fizemos na UserProfilePage)
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
          isFavorited={isFavorited}
          favoritesCount={favoritesCount}
          onToggleFavorite={handleToggleFavorite}
        />
        <div className="recipe-body-grid">
          <div className="recipe-main-content">
            <RecipeDetails instructions={dish.recipe?.instructions} />
            <IngredientList ingredients={dish.recipe.ingredients} />
          </div>
          <div className="recipe-sidebar"></div>
        </div>
        <ReviewSection ratings={dish.ratings} dishId={parseInt(dishId)} onReviewSubmitted={handleReviewSubmitted} />
      </div>
    </div>
  )
}

export default RecipePage
