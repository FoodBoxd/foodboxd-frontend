import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import InfiniteFeed from '../components/InfiniteFeed'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  const [dishes, setDishes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const getDishes = async () => {
      try {
        const response = await api.get('dishes')
        const formattedDishes = response.data.map((dish) => ({
          id: dish.dishId,
          imageUrl: dish.photo,
          name: dish.name,
        }))
        setDishes(formattedDishes)
      } catch (error) {
        console.error('Error fetching dishes:', error)
      }
    }

    getDishes()
  }, [])

  return (
    <div>
      <Header />
      <Carousel
        title="Em destaque"
        items={dishes}
        itemWidth={170}
        onItemClick={item => navigate(`/dish/${item.id}`)}
      />
      <div className="home-page-container">
        <InfiniteFeed feedType="global" />
      </div>
    </div>
  )
}
