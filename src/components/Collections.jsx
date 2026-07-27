import { motion } from "motion/react";

import { collections } from "../data/collections";

import "../styles/Collections.css";

const ease = [0.22, 1, 0.36, 1];

function Collections() {
    return (
        <section
            className="collections"
            id="colecoes"
            aria-labelledby="collections-title"
        >
            <div className="collections__inner container">
                <motion.h2
                    className="collections__title"
                    id="collections-title"
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.6,
                    }}
                    transition={{
                        duration: 0.85,
                        ease,
                    }}
                >
                    Coleções
                </motion.h2>

                <div className="collections__grid">
                    {collections.map((collection, index) => (
                        <motion.a
                            className="collection-card"
                            href="#catalogo"
                            key={collection.id}
                            aria-label={`Conhecer a coleção ${collection.name}`}
                            initial={{
                                opacity: 0,
                                y: 48,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.18,
                            }}
                            transition={{
                                duration: 0.85,
                                delay: index * 0.12,
                                ease,
                            }}
                            whileTap={{
                                scale: 0.985,
                            }}
                        >
                            <img
                                className="collection-card__image"
                                src={collection.image}
                                alt={collection.alt}
                                loading="lazy"
                                decoding="async"
                            />

                            <span
                                className="collection-card__overlay"
                                aria-hidden="true"
                            />

                            <motion.div
                                className="collection-card__content"
                                initial={{
                                    opacity: 0,
                                    y: 18,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.4,
                                }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.25 + index * 0.12,
                                    ease,
                                }}
                            >
                                <span className="collection-card__label">
                                    coleção
                                </span>

                                <span className="collection-card__name">
                                    {collection.name}
                                </span>
                            </motion.div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Collections;