import { motion } from "motion/react";

import ctaDesktop from "../assets/cta/cta-image-desktop.webp";
import ctaMobile from "../assets/cta/cta-image-mobile.webp";

import "../styles/FinalCta.css";

const copyAnimation = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

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
            />

            <div className="final-cta__content container">
                <motion.div
                    className="final-cta__copy"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.35,
                    }}
                    transition={{
                        staggerChildren: 0.14,
                    }}
                >
                    <motion.h2
                        className="final-cta__title"
                        id="final-cta-title"
                        variants={copyAnimation}
                    >
                        Criamos pensando em você, para você
                    </motion.h2>

                    <motion.a
                        className="final-cta__link"
                        href="#rodape"
                        variants={copyAnimation}
                    >
                        <span className="final-cta__link-strong">
                            escolha
                        </span>

                        <span className="final-cta__link-regular">
                            sua joia
                        </span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

export default FinalCta;