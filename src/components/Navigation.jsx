import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
        <li>
          <Link to="/">Página Inicial (Home)</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/novo-usuario">Adicionar Usuário</Link>
        </li>
        {/* Adicione outros links aqui */}
      </ul>
    </nav>
  );
}