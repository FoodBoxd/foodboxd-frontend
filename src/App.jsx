import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rota para "Página não encontrada" */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </main>
  )
}

export default App
