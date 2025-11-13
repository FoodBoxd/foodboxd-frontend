import React from 'react'
import './ProfileTabs.css'

export default function ProfileTabs({ activeTab, onTabChange }) {

  return (
    <div className="profile-tabs">
      <button
        className={`tab-btn ${activeTab === 'ratings' ? 'active' : ''}`}
        onClick={() => onTabChange('ratings')}
      >
        Pratos Avaliados
      </button>
      <button
        className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
        onClick={() => onTabChange('favorites')}
      >
        Favoritos
      </button>
    </div>
  )
}