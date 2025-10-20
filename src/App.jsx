import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navigation from './components/Navigation'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
