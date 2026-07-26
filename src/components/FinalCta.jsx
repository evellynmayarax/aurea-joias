import ctaDesktop from "../assets/cta/cta-image-desktop.webp";
import ctaMobile from "../assets/cta/cta-image-mobile.webp";
import "../styles/FinalCta.css";

function FinalCta() {
    return (
        <section
            className="final-cta"
            id="contato"
            aria-labelledby="final-cta-title"
        >
            <picture className="final-cta__media">
                <source
                    media="(max-width: 640px)"
                    srcSet={ctaMobile}
                />

                <img
                    src={ctaDesktop}
                    alt="Artesão trabalhando cuidadosamente na fabricação de um anel"
                    loading="lazy"
                    decoding="async"
                />
            </picture>

            <div
                className="final-cta__overlay"
                aria-hidden="true"
            ></div>

            <div className="final-cta__content container">
                <div className="final-cta__copy">
                    <h2
                        className="final-cta__title"
                        id="final-cta-title"
                    >
                        Criamos pensando em você, para você
                    </h2>

                    <a
                        className="final-cta__link"
                        href="#rodape"
                    >
                        <span className="final-cta__link-strong">
                            escolha
                        </span>

                        <span className="final-cta__link-regular">
                            sua joia
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default FinalCta; 