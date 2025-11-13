import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Importar useAuth
import "./Header.css";
import appLogo from "../assets/FoodboxdLogo.png";

export default function Header() {
  const navigate = useNavigate();
  // 2. Pegar dados do usuário, status de autenticação e função logout
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para login após sair
  };

  return (
    <header className="site-header" role="banner">
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <img src={appLogo} className="logo" alt="Foodboxd logo" />
          </Link>
        </div>

        {/* 3. Só mostra a navegação se o usuário estiver autenticado */}
        {isAuthenticated && (
          <nav className="header-nav" aria-label="Primary">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              end // Garante que "Início" só fica ativo na raiz
            >
              Início
            </NavLink>
            <NavLink 
              to="/search" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Pratos
            </NavLink>
          </nav>
        )}

        <div className="header-right">
          {/* 4. Muda os botões com base no status de autenticação */}
          {isAuthenticated ? (
            <>
              <Link to={`/user/${user.userId}`} className="header-user-name">
                {user.name}
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Sair
              </button>
            </>
          ) : (
            <>
              {/* Mostra botões de Login/Registro se não estiver logado */}
              <NavLink to="/login" className="nav-link-button">
                Entrar
              </NavLink>
              <NavLink to="/register" className="nav-link-button register">
                Criar Conta
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}