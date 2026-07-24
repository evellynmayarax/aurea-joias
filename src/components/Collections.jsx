import { collections } from "../data/collections";
import "../styles/Collections.css";

function Collections() {
    return (
        <section
            className="collections"
            id="colecoes"
            aria-labelledby="collections-title"
        >
            <div className="collections__inner container">
                <h2
                    className="collections__title"
                    id="collections-title"
                >
                    Coleções
                </h2>

                <div className="collections__grid">
                    {collections.map((collection) => (
                        <a
                            className="collection-card"
                            href="#catalogo"
                            key={collection.id}
                            aria-label={`Conhecer a coleção ${collection.name}`}
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

                            <div className="collection-card__content">
                                <span className="collection-card__label">
                                    coleção
                                </span>

                                <span className="collection-card__name">
                                    {collection.name}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Collections;