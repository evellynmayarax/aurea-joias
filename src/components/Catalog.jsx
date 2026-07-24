import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { products } from "../data/products";
import "../styles/Catalog.css";

function Catalog() {
    const carouselProducts = [...products, ...products];

    const [emblaRef] = useEmblaCarousel(
        {
            align: "start",
            dragFree: true,
            loop: true,
        },
        [
            AutoScroll({
                speed: 0.65,
                startDelay: 1200,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ],
    );

    return (
        <section
            className="catalog"
            id="catalogo"
            aria-labelledby="catalog-title"
        >
            <div className="catalog__header container">
                <h2 className="catalog__title" id="catalog-title">
                    Joias para combinar
                    <br />
                    com quem você é
                </h2>

                <a className="catalog__link" href="#contato">
                    ver catálogo
                </a>
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
                                <div className="product-card">
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
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Catalog;