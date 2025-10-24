import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import foodLogo from "../assets/Foodboxd_logo.png";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="header-container">
        <div className="header-left">
          <img src={foodLogo} className="logo" alt="Foodboxd logo" />
        </div>

        <nav className="header-nav" aria-label="Primary">
          <NavLink to="/" className="nav-link">
            Pratos
          </NavLink>
          <NavLink to="/" className="nav-link">
            Listas
          </NavLink>
        </nav>

        <div className="header-right">
          {/* botão de pesquisar depois */}
          <Link to="/login" className="logout-button">
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
}
