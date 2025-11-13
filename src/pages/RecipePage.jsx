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

const fetchDishData = async () => {
    setError(null);
    try {
      const params = user ? { userId: user.userId } : {};
      const response = await api.get(`dishes/${dishId}`, { params });
      
      if (!response.data) {
        setError('Prato não encontrado.');
      } else {
        setDish(response.data); // 'dish' é nossa única fonte da verdade
      }
    } catch (err) {
      console.error('Falha ao buscar detalhes do prato:', err);
      setError('Não foi possível carregar os dados do prato.');
    }
  }

useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchDishData();
      setLoading(false);
    }
    loadData();
  }, [dishId, user]);

  const handleReviewSubmitted = async () => {
    await fetchDishData();
  }

  const handleToggleFavorite = async () => {
    if (!user) {
      alert('Você precisa estar logado para favoritar pratos.');
      return;
    }
    const currentUserId = user.userId;
    const originalDish = dish; // Salva para reverter em caso de erro

    // 5. Atualização Otimista: atualiza o 'dish' localmente
    setDish((currentDish) => {
      const newFavoriteStatus = !currentDish.isFavoritedByCurrentUser;
      const newFavoritesCount = newFavoriteStatus
        ? currentDish.favoritesCount + 1
        : currentDish.favoritesCount - 1;

      return {
        ...currentDish,
        isFavoritedByCurrentUser: newFavoriteStatus,
        favoritesCount: newFavoritesCount,
      };
    });

    try {
      // Envia a requisição
      const response = await api.post('favorites/toggle', {
        userId: currentUserId,
        dishId: parseInt(dishId),
      });

      // 6. Sincroniza com a resposta da API (atualiza 'dish' de novo)
      setDish((currentDish) => ({
        ...currentDish,
        isFavoritedByCurrentUser: response.data.favorited,
        favoritesCount: response.data.favoritesCount,
      }));
    } catch (err) {
      console.error('Falha ao atualizar favorito:', err);
      // 7. Reverte o estado em caso de erro
      setDish(originalDish);
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
          isFavorited={dish.isFavoritedByCurrentUser} // Lendo do 'dish'
          favoritesCount={dish.favoritesCount}         // Lendo do 'dish'
          onToggleFavorite={handleToggleFavorite}
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