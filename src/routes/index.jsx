import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import RecipePage from '../pages/RecipePage'
import UserProfilePage from '../pages/UserProfilePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/dish/:dishId',
        element: <RecipePage />,
      },
      {
        path: '/user/:userId',
        element: <UserProfilePage />,
      }
    ],
  },
])

export default router