import { useState } from "react"
import api from "../api"

function UserForm() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const [message, setMessage] = useState('')

  const onSubmit = async(event) => {
    event.preventDefault()

    const newUser = {
      name: name,
      age: parseInt(age)
    }

    try{

      await api.post('users', newUser)

      setMessage('Usuário criado com sucesso!')
      setName('')
      setAge('')

    } catch (error){
      console.log(`Erro na criação de usuário: ${error}`)
      setMessage("Falha ao criar usuário. Verifique o console.");
    }
  }

  return(
    <div>
      <h2>Adicionar Usuário</h2>

      <form onSubmit={onSubmit}>
        <label htmlFor="nameInput">Nome:</label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="ageInput">Idade:</label>
        <input
          id="ageInput"
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">
          Criar usuário
        </button>
      </form>

      {message && <p>{message}</p>}

    </div>
  )
}

export default UserForm