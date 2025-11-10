import React from 'react'
import './ProfileHeader.css'

export default function ProfileHeader({ name, bio }) {
  // O @username e a foto não estão no seu modelo de dados ainda
  // O avatar 'M' está estático
  const username = name.replace(/\s+/g, '_').toLowerCase()

  return (
    <div className="profile-header">
      <div className="profile-avatar">
        <span>{name ? name[0] : 'U'}</span>
      </div>
      <div className="profile-info">
        <h1 className="profile-name">{name || 'Usuário'}</h1>
        <span className="profile-username">@{username || 'usuario'}</span>
        <p className="profile-bio">
          {bio || 'Este usuário ainda não escreveu uma biografia.'}
        </p>
      </div>
      <div className="profile-actions">
        <button className="edit-profile-btn">Editar Perfil</button>
      </div>
    </div>
  )
}