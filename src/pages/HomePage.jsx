import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import InfiniteFeed from '../components/InfiniteFeed'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  const [topRatedDishes, setTopRatedDishes] = useState([])
  const [topFavoritedDishes, setTopFavoritedDishes] = useState([])
  const navigate = useNavigate()

  const formatDishForCarousel = (data) => {
    return data.map((dish) => ({
      id: dish.dishId,
      imageUrl: dish.photo,
      name: dish.name,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ratedRes = await api.get('dishes/top-rated')
        setTopRatedDishes(formatDishForCarousel(ratedRes.data))

        const favRes = await api.get('dishes/top-favorited')
        setTopFavoritedDishes(formatDishForCarousel(favRes.data))

      } catch (error) {
        console.error('Erro ao carregar carrosseis:', error)
      }
    }

    fetchData()
  }, [])

  const handleItemClick = (item) => {
    navigate(`/dish/${item.id}`)
  }

  return (
    <div>
      <Header />

      <div style={{ marginTop: '1.5rem' }}>
        <Carousel
          title="Mais Avaliados"
          items={topRatedDishes}
          itemWidth={170}
          onItemClick={handleItemClick}
        />
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <Carousel
          title="Favoritos da Comunidade"
          items={topFavoritedDishes}
          itemWidth={170}
          onItemClick={handleItemClick}
        />
      </div>

      <div className="home-page-container">
        <h3 className="feed-title" style={{ color: '#e3e3e3', marginLeft: '1rem', marginBottom: '1rem' }}>
          Atividade Recente
        </h3>
        <InfiniteFeed feedType="global" />
      </div>
    </div>
  )
}