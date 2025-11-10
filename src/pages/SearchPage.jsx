import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api'
import Header from '../components/Header'
import SearchResultCard from '../components/SearchResultCard'
import './SearchPage.css'

// Ícone de Lupa para a barra de busca
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1.2em"
    height="1.2em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

export default function SearchPage() {
  const navigate = useNavigate()
  // Sincroniza o estado da busca com os parâmetros da URL (ex: /search?q=pizza)
  const [searchParams, setSearchParams] = useSearchParams()

  // 'query' é o valor do input (controlado)
  const [query, setQuery] = useState(searchParams.get('q') || '')
  // 'searchTerm' é o valor "atrasado" (debounced) que usamos para chamar a API
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // Controla se uma busca já foi feita para diferenciar "comece a buscar" de "nenhum resultado"
  const [hasSearched, setHasSearched] = useState(!!searchParams.get('q'))

  // Lógica de Debounce:
  // Só atualiza o 'searchTerm' (que dispara a API) 500ms após o usuário parar de digitar
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(query)
      // Atualiza o parâmetro da URL sem recarregar a página
      if (query) {
        setSearchParams({ q: query }, { replace: true })
      } else {
        setSearchParams({}, { replace: true })
      }
    }, 500)

    return () => clearTimeout(timerId)
  }, [query, setSearchParams])

  // Lógica da API:
  // Dispara a busca sempre que o 'searchTerm' (debounced) mudar
  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true)
      setHasSearched(true)
      setError(null)
      try {
        const response = await api.get(
          `/dishes/search?q=${encodeURIComponent(searchTerm)}`
        )
        setResults(response.data)
      } catch (err) {
        console.error('Erro ao buscar:', err)
        setError('Não foi possível realizar a busca. Tente novamente.')
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearch()
  }, [searchTerm])

  // Navega para a página de receita ao clicar em um card
  const handleCardClick = (item) => {
    navigate(`/dish/${item.id}`)
  }

  const title = searchTerm ? `Resultados para "${searchTerm}"` : "Todos os Pratos";

  return (
    <div className="search-page-container">
      <Header />
      <div className="search-content">
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por prato, ingrediente, receita..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="search-input-icon">
            <SearchIcon />
          </div>
        </div>

        {loading && <div text="Buscando..." />}

        {!loading && (
          <div className="search-results-container">
            {results.length > 0 && (
              <>
                <h2 className="results-title">
                  {title}
                </h2>
                <div className="results-grid">
                  {results.map((item) => (
                    <SearchResultCard
                      key={item.id}
                      item={item}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </>
            )}

            {hasSearched && results.length === 0 && (
              <div className="no-results-message">
                Nenhum prato encontrado para "{searchTerm}".
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
