import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { promoMessages } from "../data/promos";
import "../styles/PromoBar.css";

function PromoBar() {
    const slides = [...promoMessages, ...promoMessages];

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            duration: 32,
            watchDrag: false,
        },
        [
            Autoplay({
                delay: 3500,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
            }),
        ],
    );

    return (
        <aside
            className="promo-bar"
            aria-label={promoMessages.join(". ")}
        >
            <div
                className="promo-bar__viewport"
                ref={emblaRef}
                aria-hidden="true"
            >
                <div className="promo-bar__container">
                    {slides.map((message, index) => (
                        <p
                            className="promo-bar__slide"
                            key={`${message}-${index}`}
                        >
                            {message}
                        </p>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default PromoBar;