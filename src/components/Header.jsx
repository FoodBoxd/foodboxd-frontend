import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import appLogo from "../assets/FoodboxdLogo.png";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="header-container">
        <div className="header-left">
          <Link to="/home">
            <img src={appLogo} className="logo" alt="Foodboxd logo" />
          </Link>
        </div>

        <nav className="header-nav" aria-label="Primary">
          <NavLink to="/home" className="nav-link">
            Início
          </NavLink>
          <NavLink to="/search" className="nav-link">
            Pratos
          </NavLink>
        </nav>

        <div className="header-right">
          <Link to="/login" className="logout-button">
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
}
