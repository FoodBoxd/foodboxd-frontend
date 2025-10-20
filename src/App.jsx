import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rota para "Página não encontrada" */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </main>
  )
}

export default App
