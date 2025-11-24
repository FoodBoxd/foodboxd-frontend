import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
import UserAvatar from "./UserAvatar";
import appLogo from "../assets/FoodboxdLogo.png";

export default function Header() {
  const { user, isAuthenticated } = useAuth();

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
              className={({ isActive }) => isActive ? "nav-link-home active" : "nav-link-home"}
            >
              Início
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) => isActive ? "nav-link-dish active" : "nav-link-dish"}
            >
              Pratos
            </NavLink>
          </nav>
        )}

        <div className="header-right">
          {isAuthenticated ? (
            <>
              <Link to={`/user/${user.userId}`} className="header-user-link">
                <UserAvatar
                  src={user.profilePhoto}
                  name={user.name}
                  size="32px"
                  fontSize="0.9rem"
                />
              </Link>
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