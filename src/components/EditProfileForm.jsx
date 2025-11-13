import React, { useState } from 'react'
import './EditProfileForm.css' // Criaremos este CSS a seguir

export default function EditProfileForm({ currentUser, onClose, onSave }) {
  const [name, setName] = useState(currentUser.name || '')
  const [bio, setBio] = useState(currentUser.biography || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Chama a função onSave passada pela UserProfilePage
      await onSave({ name, bio })
      onClose() // Fecha o modal em caso de sucesso
    } catch (err) {
      console.error('Erro ao salvar perfil:', err)
      setError(
        err.response?.data?.message || 'Não foi possível salvar. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="editName">Nome</label>
          <input
            id="editName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="editBio">Biografia</label>
          <textarea
            id="editBio"
            placeholder="Escreva algo sobre você..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={300} // Limite de exemplo
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
      </div>
    </div>
  )
}