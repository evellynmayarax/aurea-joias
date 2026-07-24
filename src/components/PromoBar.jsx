import { useEffect, useState } from "react";
import { promoMessages } from "../data/promos";
import "../styles/PromoBar.css";

function PromoBar() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const slides = [...promoMessages, promoMessages[0]];

    useEffect(() => {
        const interval = setInterval(() => {
            setTransitionEnabled(true);
            setCurrentSlide((current) => current + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    function handleTransitionEnd() {
        if (currentSlide === promoMessages.length) {
            setTransitionEnabled(false);
            setCurrentSlide(0);
        }
    }

    return (
        <aside
            className="promo-bar"
            aria-label={promoMessages.join(". ")}
        >
            <div
                className="promo-bar__track"
                data-transition={transitionEnabled}
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
                onTransitionEnd={handleTransitionEnd}
                aria-hidden="true"
            >
                {slides.map((message, index) => (
                    <p
                        className="promo-bar__message"
                        key={`${message}-${index}`}
                    >
                        {message}
                    </p>
                ))}
            </div>
        </aside>
    );
}

export default PromoBar;