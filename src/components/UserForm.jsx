import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'
import './UserForm.css'
import logo from '../assets/AppLogo.png'
import { useAuth } from '../context/AuthContext'

function UserForm() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
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

    const newUser = {
      name,
      birthDate,
      email,
      password,
    }

    try {
      const response = await api.post('users/register', newUser)

      login(response.data)
      navigate('/')

    } catch (error) {
      console.log(`Erro na criação de usuário: ${error}`)
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Falha ao criar usuário. Tente novamente.');
      }
      setLoading(false)
    }
  }

  return (
    <div id="createUserCard">
      <img src={logo} alt="Logo" />
      <h2>Criar nova conta</h2>

      <form id="userForm" onSubmit={onSubmit}>
        <label htmlFor="nameInput">Nome:</label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="ageInput">Data de Nascimento:</label>
        <input
          id="ageInput"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />

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
          {loading ? 'Criando...' : 'Concluir'}
        </button>
      </form>

      {message && <p className="form-error">{message}</p>}

      <p className="toggle-link">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  )
}

export default UserForm