import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
import appLogo from "../assets/FoodboxdLogo.png";

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header" role="banner">
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <img src={appLogo} className="logo" alt="Foodboxd logo" />
          </Link>
        </div>

        {isAuthenticated && (
          <nav className="header-nav" aria-label="Primary">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              end
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