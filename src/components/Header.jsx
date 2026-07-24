import { useEffect, useState } from "react";
import { navigationItems } from "../data/navigation";
import logoMarrom from "../assets/logo/logo-marrom.svg";
import "../styles/Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-header__content container">
        <a
          className="site-header__logo"
          href="#inicio"
          onClick={closeMenu}
          aria-label="Ir para o início"
        >
          <img src={logoMarrom} alt="Auréa" />
        </a>

        <nav
          className="site-header__nav"
          id="primary-navigation"
          aria-label="Navegação principal"
          data-open={isMenuOpen}
        >
          <ul className="site-header__list">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  className="site-header__link"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="site-header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          data-open={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;