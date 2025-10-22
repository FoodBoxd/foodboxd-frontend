import React from 'react';
import building from '../assets/building_page.png'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/login')}>Sair</button>
      <h1>Bem-vindo(a) ao Foodboxd!</h1>
      <img src={building} alt="build_meme" />
      <p>Esta página ainda está sendo construída, volte mais tarde.</p>
    </div>
  )
}

export default HomePage;