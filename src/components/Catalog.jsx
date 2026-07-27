import { useEffect, useMemo } from "react";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";

import { products } from "../data/products";

import "../styles/Catalog.css";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
    hidden: {
        opacity: 0,
        y: 48,
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

function Catalog() {
    const carouselProducts = [...products, ...products];

    const autoScrollPlugin = useMemo(
        () =>
            AutoScroll({
                speed: 0.65,
                startDelay: 1200,
                playOnInit: true,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
            }),
        [],
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            dragFree: true,
            loop: true,
        },
        [autoScrollPlugin],
    );

    useEffect(() => {
        if (!emblaApi) return undefined;

        function startAutoScroll() {
            emblaApi.plugins().autoScroll?.play();
        }

        startAutoScroll();
        emblaApi.on("reInit", startAutoScroll);

        return () => {
            emblaApi.off("reInit", startAutoScroll);
        };
    }, [emblaApi]);

    return (
        <section
            className="catalog"
            id="catalogo"
            aria-labelledby="catalog-title"
        >
            <div className="catalog__header container">
                <motion.h2
                    className="catalog__title"
                    id="catalog-title"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.35,
                    }}
                >
                    Joias para combinar
                    <br />
                    com quem você é
                </motion.h2>

                <motion.a
                    className="catalog__link"
                    href="#contato"
                    initial={{
                        opacity: 0,
                        x: -20,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.5,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.15,
                        ease,
                    }}
                    whileHover={{
                        x: 6,
                        transition: {
                            duration: 0.25,
                            ease,
                        },
                    }}
                    whileTap={{
                        scale: 0.96,
                    }}
                >
                    ver catálogo
                </motion.a>
            </div>

            <div className="catalog__carousel">
                <div
                    className="catalog__viewport"
                    ref={emblaRef}
                    role="region"
                    aria-label="Produtos em destaque"
                >
                    <div className="catalog__container">
                        {carouselProducts.map((product, index) => (
                            <article
                                className="catalog__slide"
                                key={`${product.id}-${index}`}
                                aria-hidden={index >= products.length}
                            >
                                <motion.div
                                    className="product-card"
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
                                        amount: 0.15,
                                    }}
                                    transition={{
                                        duration: 0.75,
                                        delay:
                                            (index %
                                                products.length) *
                                            0.07,
                                        ease,
                                    }}
                                    whileHover={{
                                        y: -6,
                                        transition: {
                                            duration: 0.3,
                                            ease,
                                        },
                                    }}
                                >
                                    <div className="product-card__image">
                                        <img
                                            src={product.image}
                                            alt={product.alt}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>

                                    <div className="product-card__content">
                                        <strong className="product-card__price">
                                            {product.price}
                                        </strong>

                                        <h3 className="product-card__name">
                                            {product.name}
                                        </h3>
                                    </div>
                                </motion.div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Catalog;