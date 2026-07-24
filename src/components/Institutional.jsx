import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import institutionalDesktop from "../assets/institutional/institutional-image-desktop.webp";
import institutionalMobile from "../assets/institutional/institutional-image-mobile.webp";
import "../styles/Institutional.css";

const galleryPositions = [
    "center 20%",
    "center center",
    "center 80%",
];

const gallerySlides = [
    ...galleryPositions,
    ...galleryPositions,
];

function Institutional() {
    const [mobileGalleryRef] = useEmblaCarousel(
        {
            axis: "x",
            align: "start",
            dragFree: true,
            loop: true,
        },
        [
            AutoScroll({
                playOnInit: true,
                speed: 0.45,
                startDelay: 800,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
            }),
        ],
    );

    return (
        <section
            className="institutional"
            id="sobre"
            aria-labelledby="institutional-title"
        >
            <picture className="institutional__main-image">
                <source
                    media="(max-width: 640px)"
                    srcSet={institutionalMobile}
                />

                <img
                    src={institutionalDesktop}
                    alt="Mãos usando anéis e pulseiras douradas"
                    loading="lazy"
                    decoding="async"
                />
            </picture>

            <div
                className="
                    institutional__gallery
                    institutional__gallery--desktop
                "
                aria-hidden="true"
            >
                <div className="institutional__desktop-track">
                    {[0, 1].map((groupIndex) => (
                        <div
                            className="institutional__desktop-group"
                            key={groupIndex}
                        >
                            {gallerySlides.map((position, index) => (
                                <div
                                    className="institutional__gallery-slide"
                                    key={`${groupIndex}-${position}-${index}`}
                                >
                                    <img
                                        src={institutionalDesktop}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        style={{
                                            objectPosition: position,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="
                    institutional__gallery
                    institutional__gallery--mobile
                "
                ref={mobileGalleryRef}
                aria-hidden="true"
            >
                <div className="institutional__mobile-track">
                    {gallerySlides.map((position, index) => (
                        <div
                            className="institutional__gallery-slide"
                            key={`${position}-${index}`}
                        >
                            <img
                                src={institutionalDesktop}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                style={{ objectPosition: position }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="institutional__content">
                <h2
                    className="institutional__title"
                    id="institutional-title"
                >
                    Criamos pensando
                    <br />
                    em você, para você
                </h2>

                <p className="institutional__description">
                    Cada peça nasce do encontro entre formas essenciais,
                    acabamento cuidadoso e conforto. Joias pensadas para
                    acompanhar a sua rotina e guardar as histórias que só
                    você pode viver.
                </p>
            </div>
        </section>
    );
}

export default Institutional;