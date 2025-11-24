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
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  const refreshDishData = async () => {
    setError(null);
    try {
      const params = user ? { userId: user.userId } : {};
      const response = await api.get(`dishes/${dishId}`, { params });
      setDish(response.data);

      setIsFavorited(response.data.isFavoritedByCurrentUser)
      setFavoritesCount(response.data.favoritesCount)
    } catch (err) {
      console.error('Falha ao atualizar dados do prato:', err);
      setError('Não foi possível atualizar os dados.');
    }
  }

  const fetchDishWithLoading = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = user ? { userId: user.userId } : {};

      const response = await api.get(`dishes/${dishId}`, { params });
      setDish(response.data);

      setIsFavorited(response.data.isFavoritedByCurrentUser)
      setFavoritesCount(response.data.favoritesCount)

    } catch (err) {
      console.error('Falha ao buscar detalhes do prato:', err);
      setError('Não foi possível carregar os dados do prato.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDishWithLoading();
  }, [dishId, user]);

  const handleReviewSubmitted = async () => {
    await refreshDishData();
  }

  const handleToggleFavorite = async () => {
    if (!user) {
        alert("Você precisa estar logado para favoritar.");
        return;
    }

    const currentUserId = user.userId

    const previousFavorited = isFavorited;
    const previousCount = favoritesCount;

    const newFavoriteStatus = !isFavorited
    setIsFavorited(newFavoriteStatus)
    setFavoritesCount((currentCount) =>
      newFavoriteStatus ? currentCount + 1 : currentCount - 1
    )

    try {
      const response = await api.post('favorites/toggle', {
        userId: currentUserId,
        dishId: parseInt(dishId),
      })

      setIsFavorited(response.data.favorited)
      setFavoritesCount(response.data.favoritesCount)
    } catch (err) {
      console.error('Falha ao atualizar favorito:', err)
      setIsFavorited(previousFavorited)
      setFavoritesCount(previousCount)
    }
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
          isFavorited={isFavorited}
          favoritesCount={favoritesCount}
          onToggleFavorite={handleToggleFavorite}
        />
        <div className="recipe-body-grid">
          <div className="recipe-main-content">
            <RecipeDetails instructions={dish.recipe?.instructions} />
            <IngredientList ingredients={dish.recipe?.ingredients} />
          </div>
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