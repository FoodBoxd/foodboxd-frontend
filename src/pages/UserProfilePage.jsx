import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import Header from '../components/Header'
import ProfileHeader from '../components/ProfileHeader'
import ProfileTabs from '../components/ProfileTabs'
import ProfileDishGrid from '../components/ProfileDishGrid'
import EditProfileForm from '../components/EditProfileForm'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import './UserProfilePage.css'

export default function UserProfilePage() {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
   const { user } = useAuth();

  const isMyProfile = user && user.userId === parseInt(userId);

  const [activeTab, setActiveTab] = useState('ratings')

  const [isEditing, setIsEditing] = useState(false)
  const { user, login } = useAuth()

  const isOwnProfile = user && user.userId == userId

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError(null);
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

  const handleSaveProfile = async (formData) => {
    if (!isOwnProfile) {
      throw new Error('Não autorizado')
    }

    const payload = {
      authUserId: user.userId,
      name: formData.name,
      biography: formData.bio,
    }

    const { data } = await api.put(`users/${user.userId}/profile`, payload)

    setProfile((prev) => ({
      ...prev,
      name: data.name,
      biography: data.biography,
    }))

    if (user.name !== data.name) {
      login({ ...user, name: data.name })
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <LoadingSpinner />
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

  const dishesToShow =
    activeTab === 'ratings'
      ? profile?.ratedDishes
      : profile?.favoriteDishes

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
          isMyProfile={isMyProfile}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setIsEditing(true)}
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
            <span className="stat-value">
              {profile.stats.averageScore.toFixed(1)}★
            </span>
            <span className="stat-label">Média</span>
          </div>
        </div>

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ProfileDishGrid dishes={dishesToShow} emptyMessage={emptyMessage} />
      </div>
      {isEditing && (
        <EditProfileForm
          currentUser={profile}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}