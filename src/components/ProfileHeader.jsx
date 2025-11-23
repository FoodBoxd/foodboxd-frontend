import React from 'react'
import UserAvatar from './UserAvatar'
import './ProfileHeader.css'

export default function ProfileHeader({ name, bio, isOwnProfile, onEditClick, profilePhoto }) {

  return (
    <div className="profile-header">
      <UserAvatar
         src={profilePhoto}
         name={name}
         size="128px"
         fontSize="4rem"
         className="profile-avatar-display"
      />

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