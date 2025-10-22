import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'
import './UserForm.css'
import logo from '../assets/AppLogo.png'

function UserForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()

    const newUser = {
      email,
      password
    }

    try {
      await api.post('users/login', newUser)

      navigate('/')
    } catch (error) {
      console.log(`Erro no login de usuário: ${error}`)
      setMessage('Falha ao logar usuário. Verifique o console.')
    }
  }

  return (
    <div id="createUserCard">
      <img src={logo} alt="Logo" />
      <h2>LogIn</h2>

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
        />

        <button type="submit">Entrar</button>
        
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default UserForm
