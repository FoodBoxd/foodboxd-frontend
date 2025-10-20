import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'
import './UserForm.css'
import logo from '../assets/AppLogo.png'

function UserForm() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()

    const newUser = {
      name,
      birthDate,
      email,
      password,
    }

    try {
      await api.post('users/create', newUser)

      navigate('/')
    } catch (error) {
      console.log(`Erro na criação de usuário: ${error}`)
      setMessage('Falha ao criar usuário. Verifique o console.')
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
        />

        <label htmlFor="ageInput">Data de Nascimento:</label>
        <input
          id="ageInput"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
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
        />

        <button type="submit">Concluir</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default UserForm
