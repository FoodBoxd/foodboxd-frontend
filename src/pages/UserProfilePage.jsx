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

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        // Usamos o novo endpoint
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

        <ProfileTabs />

        <ProfileDishGrid dishes={profile.ratedDishes} />
      </div>
    </div>
  )
}