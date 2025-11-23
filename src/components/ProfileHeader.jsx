import React from 'react'
import './ProfileHeader.css'

export default function ProfileHeader({ 
  name, 
  bio, 
  isOwnProfile, 
  onEditClick 
}) {

  return (
    <div className="profile-header">
      <div className="profile-avatar">
        <span>{name ? name[0] : 'U'}</span>
      </div>
      <div className="profile-info">
        <h1 className="profile-name">{name || 'Usuário'}</h1>
        <p className="profile-bio">
          {bio || 'Você ainda não escreveu uma biografia.'}
        </p>
      </div>
      <div className="profile-actions">
        {isOwnProfile && (
          <button className="edit-profile-btn" onClick={onEditClick}>
            Editar Perfil
          </button>
        )}
      </div>
    </div>
  )
}