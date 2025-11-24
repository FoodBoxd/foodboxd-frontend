import React from 'react'
import UserAvatar from './UserAvatar'
import './ProfileHeader.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileHeader({
  name,
  bio,
  isOwnProfile,
  onEditClick,
  profilePhoto
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          <div>
            <button className="edit-profile-btn" onClick={onEditClick}>
              Editar Perfil
            </button>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  )
}