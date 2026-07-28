import { motion, useReducedMotion } from "motion/react";

import heroDesktop from "../assets/hero/bg-hero-desktop-1.webp";
import heroMobile from "../assets/hero/bg-hero-mobile-1.webp";
import heroTablet from "../assets/hero/bg-hero-tablet-1.webp";

import logoBranco from "../assets/logo/logo-branco.svg";

import "../styles/Hero.css";

const ease = [0.22, 1, 0.36, 1];

function Hero() {
    const shouldReduceMotion = useReducedMotion();

    const contentVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: 0.35,
                staggerChildren: 0.16,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 32,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease,
            },
        },
    };

    const logoVariants = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 24,
            scale: shouldReduceMotion ? 1 : 0.94,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1.15,
                ease,
            },
        },
    };

    return (
        <section
            className="hero"
            id="inicio"
            aria-labelledby="hero-title"
        >
            <motion.picture
                className="hero__media"
                initial={{
                    opacity: 0.75,
                    scale: shouldReduceMotion ? 1 : 1.07,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: shouldReduceMotion ? 0.5 : 1.8,
                    ease,
                }}
            >
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
            </motion.picture>

            <motion.div
                className="hero__overlay"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease,
                }}
            />

            <motion.div
                className="hero__content container"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.p
                    className="hero__description"
                    variants={itemVariants}
                >
                    Joias que traduzem presença, afeto e identidade — feitas
                    para acompanhar você em todos os seus momentos.
                </motion.p>

                <motion.h1
                    className="hero__title"
                    id="hero-title"
                    aria-label="Auréa"
                    variants={logoVariants}
                >
                    <img
                        src={logoBranco}
                        alt=""
                        aria-hidden="true"
                    />
                </motion.h1>

                <motion.a
                    className="hero__cta"
                    href="#catalogo"
                    variants={itemVariants}
                    whileHover={
                        shouldReduceMotion
                            ? undefined
                            : {
                                y: -4,
                                transition: {
                                    duration: 0.25,
                                    ease,
                                },
                            }
                    }
                    whileTap={
                        shouldReduceMotion
                            ? undefined
                            : {
                                scale: 0.97,
                            }
                    }
                >
                    <span>conheça</span>
                    <span>nossas joias</span>
                </motion.a>
            </motion.div>
        </section>
    );
}

export default Hero;