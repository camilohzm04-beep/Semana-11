import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import CartDrawer from "./CartDrawer";
import "../styles/main.css";

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header__container">
          <Link to="/home" className="header__logo">
            Relatos de Papel
          </Link>
          <nav className="header__nav">
            <CartWidget onClick={toggleCart} />
          </nav>
        </div>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__container">
          <p>&copy; {new Date().getFullYear()} Relatos de Papel</p>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
};

export default Layout;
