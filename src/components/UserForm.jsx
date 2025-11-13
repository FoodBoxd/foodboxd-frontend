import { useNavigate, Link } from 'react-router-dom' // 1. Importar Link
import { useState } from 'react'
import api from '../api'
import './UserForm.css'
import logo from '../assets/AppLogo.png'
import { useAuth } from '../context/AuthContext' // 2. Importar useAuth

function UserForm() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false) // Estado de carregamento

  const navigate = useNavigate()
  const { login } = useAuth() // 3. Pegar a função de login

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true) // Ativa o loading
    setMessage('')

    const newUser = {
      name,
      birthDate,
      email,
      password,
    }

    try {
      // 4. O backend agora usa a rota 'register' e retorna dados
      const response = await api.post('users/register', newUser) 

      // 5. Sucesso!
      login(response.data) // Salva o novo usuário no contexto e localStorage
      navigate('/') // Navega para a home (raiz)

    } catch (error) {
      console.log(`Erro na criação de usuário: ${error}`)
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Exibe erro da API
      } else {
        setMessage('Falha ao criar usuário. Tente novamente.');
      }
      setLoading(false) // Desativa o loading em caso de erro
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

      {message && <p className="form-error">{message}</p>} {/* 6. Classe de erro */}

      {/* 7. Link para a página de login */}
      <p className="toggle-link">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  )
}

export default UserForm