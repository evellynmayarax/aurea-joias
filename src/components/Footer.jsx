import logoWhite from "../assets/logo/logo-branco.svg";
import { navigationItems } from "../data/navigation";

import "../styles/Footer.css";

function InstagramIcon() {
    return (
        <svg
            className="footer__social-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <circle
                cx="17.4"
                cy="6.7"
                r="1"
                fill="currentColor"
            />
        </svg>
    );
}

function PinterestIcon() {
    return (
        <svg
            className="footer__social-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M12.02 0C5.4 0 .03 5.37.03 11.99c0 5.08 3.16 9.42 7.62 11.17-.11-.95-.2-2.4.04-3.44.22-.94 1.41-5.97 1.41-5.97s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.88-2.06-4.88-5.01-4.88-3.42 0-5.42 2.56-5.42 5.2 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34l-.33 1.37c-.05.22-.17.27-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.79 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.13-2.61 7.46-6.21 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15 1.12.35 2.31.53 3.54.53 6.62 0 11.99-5.37 11.99-11.99C24.01 5.37 18.64 0 12.02 0Z" />
        </svg>
    );
}

function TikTokIcon() {
    return (
        <svg
            className="footer__social-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a11.5 11.5 0 0 1-4.2-.97c-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75a7.44 7.44 0 0 1-1.35 3.94A7.25 7.25 0 0 1 9.33 24a7.22 7.22 0 0 1-4.08-1.03 7.55 7.55 0 0 1-3.65-5.71c-.02-.5-.03-1-.01-1.49a7.46 7.46 0 0 1 2.58-4.96 7.32 7.32 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.28 3.28 0 0 0-3.02.37 3.28 3.28 0 0 0-1.36 1.75c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.46 3.46 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.08Z" />
        </svg>
    );
}

const footerNavigationItems = navigationItems.filter(
    ({ href }) => href !== "#contato",
);

const socialLinks = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/",
        Icon: InstagramIcon,
    },
    {
        label: "Pinterest",
        href: "https://www.pinterest.com/",
        Icon: PinterestIcon,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/",
        Icon: TikTokIcon,
    },
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="footer"
            id="rodape"
        >
            <div className="footer__main">
                <div className="footer__grid container">
                    <div className="footer__brand">
                        <img
                            className="footer__logo"
                            src={logoWhite}
                            alt="Auréa"
                        />

                        <p className="footer__tagline">
                            Criamos pensando em você,
                            <br />
                            para você
                        </p>
                    </div>

                    <div
                        className="footer__column"
                        id="contato-rodape"
                    >
                        <h2 className="footer__title">
                            Contato
                        </h2>

                        <address className="footer__list">
                            <a
                                className="footer__link"
                                href="tel:+5581995922940"
                            >
                                (81) 99592-2940
                            </a>

                            <a
                                className="footer__link"
                                href="mailto:contato@gmail.com"
                            >
                                contato@gmail.com
                            </a>
                        </address>
                    </div>

                    <nav
                        className="footer__column"
                        aria-label="Navegação do rodapé"
                    >
                        <h2 className="footer__title">
                            Navegação
                        </h2>

                        <ul className="footer__list">
                            {footerNavigationItems.map(
                                ({ label, href }) => (
                                    <li key={href}>
                                        <a
                                            className="footer__link"
                                            href={href}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>

                    <div className="footer__column">
                        <h2 className="footer__title">
                            Siga-nos
                        </h2>

                        <ul className="footer__list">
                            {socialLinks.map(
                                ({ label, href, Icon }) => (
                                    <li key={label}>
                                        <a
                                            className="footer__link footer__social-link"
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Auréa no ${label}`}
                                        >
                                            <Icon />

                                            <span>{label}</span>
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>
                </div>

                <img
                    className="footer__mobile-logo"
                    src={logoWhite}
                    alt=""
                    aria-hidden="true"
                />
            </div>

            <div className="footer__bottom">
                <div className="footer__bottom-inner container">
                    <p className="footer__project-note">
                        Projeto conceitual. Imagens meramente ilustrativas.
                        <br className="footer__mobile-break" />{" "}
                        Desenvolvido por{" "}
                        <a
                            href="https://evellynsilva.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            evellyn silva.
                        </a>
                    </p>

                    <hr className="footer__mobile-divider" />

                    <p className="footer__copyright">
                        &copy; {currentYear} Auréa. Todos os direitos
                        reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;