import heroDesktop from "../assets/hero/bg-hero-desktop-1.webp";
import heroMobile from "../assets/hero/bg-hero-mobile-1.webp";
import heroTablet from "../assets/hero/bg-hero-tablet-1.webp";

import logoBranco from "../assets/logo/logo-branco.svg";
import "../styles/Hero.css";

function Hero() {
    return (
        <section
            className="hero"
            id="inicio"
            aria-labelledby="hero-title"
        >
            <picture className="hero__media">
                <source
                    media="(max-width: 640px)"
                    srcSet={heroMobile}
                />

                <source
                    media="(max-width: 1024px)"
                    srcSet={heroTablet}
                />

                <img
                    src={heroDesktop}
                    alt="Mulher usando joias douradas da Auréa"
                    fetchPriority="high"
                    decoding="async"
                />
            </picture>

            <div className="hero__overlay" aria-hidden="true"></div>

            <div className="hero__content container">
                <p className="hero__description">
                    Joias que traduzem presença, afeto e identidade — feitas
                    para acompanhar você em todos os seus momentos.
                </p>

                <h1
                    className="hero__title"
                    id="hero-title"
                    aria-label="Auréa"
                >
                    <img src={logoBranco} alt="" aria-hidden="true" />
                </h1>

                <a className="hero__cta" href="#catalogo">
                    <span>conheça</span>
                    <span>nossas joias</span>
                </a>
            </div>
        </section>
    );
}

export default Hero;