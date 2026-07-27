import { Fragment, useEffect, useRef } from "react";

import "../styles/RingExperience.css";

const titleWords = [
    "Design",
    "que",
    "se",
    "revela",
    "em",
    "cada",
    "movimento.",
];

function RingExperience() {
    const sectionRef = useRef(null);
    const sceneContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const copyRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const sceneContainer = sceneContainerRef.current;
        const canvas = canvasRef.current;
        const copy = copyRef.current;

        if (!section || !sceneContainer || !canvas || !copy) {
            return undefined;
        }

        let destroyRingScene = null;
        let loadObserver = null;
        let cancelled = false;
        let isLoading = false;

        async function loadRingScene() {
            if (cancelled || isLoading || destroyRingScene) {
                return;
            }

            isLoading = true;
            loadObserver?.disconnect();

            try {
                const { default: createRingScene } = await import(
                    "../data/createRingScene"
                );

                if (cancelled) {
                    return;
                }

                destroyRingScene = createRingScene({
                    section,
                    sceneContainer,
                    canvas,
                    copy,
                });
            } catch (error) {
                if (cancelled) {
                    return;
                }

                isLoading = false;
                sceneContainer.classList.add("has-error");

                console.error(
                    "Não foi possível carregar a experiência 3D do anel.",
                    error,
                );
            }
        }

        if ("IntersectionObserver" in window) {
            loadObserver = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        loadRingScene();
                    }
                },
                {
                    threshold: 0,
                    rootMargin: "400px 0px",
                },
            );

            loadObserver.observe(section);
        } else {
            loadRingScene();
        }

        return () => {
            cancelled = true;
            loadObserver?.disconnect();
            destroyRingScene?.();

            sceneContainer.classList.remove("has-error");
        };
    }, []);

    return (
        <section
            className="ring-experience"
            ref={sectionRef}
            aria-labelledby="ring-experience-title"
        >
            <div className="ring-experience__inner container">
                <div
                    className="ring-experience__copy"
                    ref={copyRef}
                >
                    <h2
                        className="ring-experience__title"
                        id="ring-experience-title"
                        aria-label="Design que se revela em cada movimento."
                    >
                        {titleWords.map((word, index) => (
                            <Fragment key={`${word}-${index}`}>
                                <span
                                    className="ring-experience__word"
                                    aria-hidden="true"
                                >
                                    {word}
                                </span>

                                {index < titleWords.length - 1 &&
                                    " "}
                            </Fragment>
                        ))}
                    </h2>
                </div>

                <div
                    className="ring-experience__scene"
                    ref={sceneContainerRef}
                    role="img"
                    aria-label="Modelo 3D de um anel dourado que gira conforme a rolagem da página."
                >
                    <canvas
                        className="ring-experience__canvas"
                        ref={canvasRef}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </section>
    );
}

export default RingExperience;