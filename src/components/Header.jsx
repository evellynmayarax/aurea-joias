import { useEffect, useState } from "react";

import { navigationItems } from "../data/navigation";
import logoMarrom from "../assets/logo/logo-marrom.svg";

import "../styles/Header.css";

function WhatsAppIcon() {
  return (
    <svg
      className="site-header__whatsapp-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.46 14.87L2 22l5.27-1.54A9.93 9.93 0 1 0 12.04 2Zm0 17.87a8.02 8.02 0 0 1-4.1-1.12l-.3-.18-3.13.92.94-3.05-.2-.31A8.02 8.02 0 1 1 12.04 19.87Zm4.4-6c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.27 7.27 0 0 1-1.34-1.67c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46a.88.88 0 0 0-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

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

          <a
            className="site-header__whatsapp"
            href="https://wa.me/5581995922940"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            aria-label="Falar com a Auréa pelo WhatsApp"
          >
            <WhatsAppIcon />
            <span>Falar pelo WhatsApp</span>
          </a>

          <p className="site-header__copyright">
            &copy; 2026. Todos os direitos reservados. Auréa.
          </p>
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
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Header;