import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import './EditProfileForm.css'

const AVAILABLE_AVATARS = [
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar1.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar2.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar3.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar4.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar5.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar6.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar7.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar8.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar9.png",
  "https://res.cloudinary.com/dslsxyvkp/image/upload/v1763933815/Avatar10.png"
]

export default function EditProfileForm({ currentUser, onClose, onSave }) {
  const [name, setName] = useState(currentUser.name || '')
  const [bio, setBio] = useState(currentUser.biography || '')
  const initialDate = currentUser.birthdate ? currentUser.birthdate.split('T')[0] : ''
  const [birthdate, setBirthdate] = useState(initialDate)
  const [profilePhoto, setProfilePhoto] = useState(currentUser.profilePhoto || '')

  const [showPhotoPicker, setShowPhotoPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await onSave({ name, bio, profilePhoto, birthdate })
      onClose()
    } catch (err) {
      console.error('Erro ao salvar perfil:', err)
      setError(
        err.response?.data?.message || 'Não foi possível salvar. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoSelect = (url) => {
    setProfilePhoto(url)
    setShowPhotoPicker(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {showPhotoPicker ? (
          <div className="photo-picker-container">
            <h3>Escolha um Avatar</h3>
            <div className="photo-grid">
              {AVAILABLE_AVATARS.map((url, index) => (
                <button
                  key={index}
                  type="button"
                  className="photo-option-btn"
                  onClick={() => handlePhotoSelect(url)}
                >
                  <img src={url} alt={`Opção ${index + 1}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn-cancel-picker"
              onClick={() => setShowPhotoPicker(false)}
            >
              Voltar
            </button>
          </div>
        ) : (
          <>
            <h2>Editar Perfil</h2>

            <div className="profile-photo-edit-wrapper">
              <div
                className="avatar-container"
                onClick={() => setShowPhotoPicker(true)}
                title="Alterar foto de perfil"
              >
                <UserAvatar src={profilePhoto} name={name} size="100px" fontSize="2.5rem" />
                <div className="avatar-overlay">
                  <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="editName">Nome</label>
              <input
                id="editName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="editBirth">Data de Nascimento</label>
              <input
                id="editBirth"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />

              <label htmlFor="editBio">Biografia</label>
              <textarea
                id="editBio"
                placeholder="Escreva algo sobre você..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
              />

              {error && <p className="form-error">{error}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}