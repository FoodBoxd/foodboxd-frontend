import React from 'react'
import './ProfileTabs.css'

// 1. Remova useState
// 2. Receba { activeTab, onTabChange } como props
export default function ProfileTabs({ activeTab, onTabChange }) {
  // O estado interno foi removido
  // const [activeTab, setActiveTab] = useState('ratings') 

  return (
    <div className="profile-tabs">
      <button
        // 3. Use a prop 'activeTab' para a classe
        className={`tab-btn ${activeTab === 'ratings' ? 'active' : ''}`}
        // 4. Chame a prop 'onTabChange' no clique
        onClick={() => onTabChange('ratings')}
      >
        Pratos Avaliados
      </button>
      <button
        // 5. Use a prop 'activeTab' para a classe
        className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
        // 6. Chame a prop 'onTabChange' no clique
        onClick={() => onTabChange('favorites')}
      >
        Favoritos
      </button>
    </div>
  )
}