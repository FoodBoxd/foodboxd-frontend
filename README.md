# 💻 Foodboxd Frontend

Este é o repositório do **frontend** do projeto **Foodboxd**, construído com **React** e **Vite**.

---

## 🚀 Tecnologias Utilizadas

- **Framework:** React (com JavaScript)
- **Build Tool:** Vite
- **Comunicação API:** Axios
- **Gerenciamento de Pacotes:** npm
- **Versão do Node:** LTS

---

## 📋 Pré-requisitos

Para rodar local, você deve ter:

- **Node.js** (LTS)
- **npm** (instalado automaticamente com o Node.js)
- O **[foodboxd-backend](https://github.com/FoodBoxd/foodboxd-backend)** deve estar rodando para que as chamadas de API funcionem corretamente.

---

## ⚙️ Configuração e Inicialização

Siga os passos abaixo para configurar e rodar o frontend na sua máquina:

### 1️ Clonar o Repositório

```bash
git clone https://github.com/FoodBoxd/foodboxd-frontend.git
cd foodboxd-frontend
```

### 2 Instalar as dependências e pacotes
Instalar a pasta node_modules

```bash
npm ci
npm install axios
npm install react-icons
npm install react-router-dom
```

### 3 Configurar a URL da API
No arquivo api.js, definir a porta que o back está rodando

```javascript
const api = axios.create({
  baseURL: 'http://localhost:PORTA/api/'
})
```

### 4 Iniciar o Front
```bash
npm run dev
```
