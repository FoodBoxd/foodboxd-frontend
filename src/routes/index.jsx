import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

// 1. Importar os componentes de proteção de rota
import { ProtectedRoute, PublicRoute } from '../components/ProtectedRoute'

// Importar as páginas
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import RecipePage from '../pages/RecipePage'
import UserProfilePage from '../pages/UserProfilePage'
import SearchPage from '../pages/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <HomePage /> }, 
          { path: '/dish/:dishId', element: <RecipePage /> },
          { path: '/user/:userId', element: <UserProfilePage /> },
          { path: '/search', element: <SearchPage /> },
        ],
      },

      {
        element: <PublicRoute />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
    ],
  },
])

export default router