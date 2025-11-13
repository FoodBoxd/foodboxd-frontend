import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'
import './UserForm.css'
import logo from '../assets/AppLogo.png'
import { useAuth } from '../context/AuthContext'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const userLogin = {
      email,
      password
    }

    try {
      const response = await api.post('users/login', userLogin)

      login(response.data)
      navigate('/')

    } catch (error) {
      console.log(`Erro no login de usuário: ${error}`)
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Falha ao logar usuário. Tente novamente.');
      }
      setLoading(false)
    }
  }

  return (
    <div id="createUserCard">
      <img src={logo} alt="Logo" />
      <h2>Entrar</h2>

      <form id="userForm" onSubmit={onSubmit}>
        <label htmlFor="emailInput">E-mail:</label>
        <input
          id="emailInput"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="passwordInput">Senha:</label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {message && <p className="form-error">{message}</p>}

      <p className="toggle-link">
        Não tem uma conta? <Link to="/register">Crie uma</Link>
      </p>
    </div>
  )
}

export default LoginForm