import React, { useState } from 'react'
import './ProfileTabs.css'

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('ratings')

  return (
    <div className="profile-tabs">
      <button
        className={`tab-btn ${activeTab === 'ratings' ? 'active' : ''}`}
        onClick={() => setActiveTab('ratings')}
      >
        Pratos Avaliados
      </button>
      <button
        className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
        onClick={() => setActiveTab('favorites')}
      >
        Favoritos
      </button>
    </div>
  )
}