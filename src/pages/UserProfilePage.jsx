import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import Header from '../components/Header'
import ProfileHeader from '../components/ProfileHeader'
import ProfileTabs from '../components/ProfileTabs'
import ProfileDishGrid from '../components/ProfileDishGrid'
import './UserProfilePage.css'

export default function UserProfilePage() {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 1. Adicione o estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('ratings')

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`users/${userId}/profile`)
        setProfile(data)
      } catch (err) {
        console.error('Falha ao buscar perfil:', err)
        setError('Não foi possível carregar o perfil.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  if (loading) {
    return (
      <>
        <Header />
        <div className="profile-page-status">Carregando...</div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="profile-page-status error">{error}</div>
      </>
    )
  }

// 2. Lógica para decidir qual lista exibir
  const dishesToShow =
    activeTab === 'ratings'
      ? profile?.ratedDishes
      : profile?.favoriteDishes

  // 3. Mensagem de "vazio" dinâmica
  const emptyMessage =
    activeTab === 'ratings'
      ? 'Este usuário ainda não avaliou nenhum prato.'
      : 'Este usuário ainda não favoritou nenhum prato.'

  return (
    <div className="profile-page-container">
      <Header />
      <div className="profile-page-content">
        <ProfileHeader
          name={profile.name}
          bio={profile.biography}
          // TODO: implementar avatar de foto
        />

        <div className="profile-stats-bar">
            <div className="stat-item">
                <span className="stat-value">{profile.stats.dishesRated}</span>
                <span className="stat-label">Pratos</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{profile.stats.reviewsCount}</span>
                <span className="stat-label">Reviews</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{profile.stats.averageScore.toFixed(1)}★</span>
                <span className="stat-label">Média</span>
            </div>
            {/* <div className="stat-item">
                <span className="stat-value">{profile.stats.followers}</span>
                <span className="stat-label">Seguidores</span>
                </div>
            // TODO: verificar feature de seguidores
            <div className="stat-item">
                <span className="stat-value">{profile.stats.following}</span>
                <span className="stat-label">Seguindo</span>
            </div> */}
        </div>
        

        {/* 4. Passe as props para ProfileTabs */}
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 5. Passe a lista correta e a mensagem de vazio para ProfileDishGrid */}
        <ProfileDishGrid 
          dishes={dishesToShow} 
          emptyMessage={emptyMessage} 
        />
      </div>
    </div>
  )
}