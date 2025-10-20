import React from 'react';
import building from '../assets/building_page.png'

function HomePage() {
  return (
    <div>
      <h1>Bem-vindo(a) ao Foodboxd!</h1>
      <img src={building} alt="build_meme" />
      <p>Esta página ainda está sendo construída, volte mais tarde.</p>
    </div>
  )
}

export default HomePage;