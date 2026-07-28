import {
    Fragment,
    useEffect,
    useRef,
    useState,
} from "react";

import fallbackRingImage from "../assets/catalogue/anel-aura.webp";
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

function supportsWebGL2() {
    try {
        const testCanvas = document.createElement("canvas");
        const context = testCanvas.getContext("webgl2");

        if (!context) {
            return false;
        }

        context
            .getExtension("WEBGL_lose_context")
            ?.loseContext();

        return true;
    } catch {
        return false;
    }
}

function RingExperience() {
    const sectionRef = useRef(null);
    const sceneContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const copyRef = useRef(null);
    const [sceneState, setSceneState] =
        useState("loading");

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
        let loadAttempt = 0;

        const reducedMotionMediaQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            );

        function reportSceneError(error) {
            if (cancelled) {
                return;
            }

            const destroyCurrentScene =
                destroyRingScene;

            destroyRingScene = null;
            isLoading = false;
            loadAttempt += 1;

            destroyCurrentScene?.();
            setSceneState("fallback");

            console.error(
                "Não foi possível exibir a experiência 3D do anel.",
                error,
            );
        }

        async function loadRingScene() {
            if (
                cancelled ||
                isLoading ||
                destroyRingScene
            ) {
                return;
            }

            if (!supportsWebGL2()) {
                loadObserver?.disconnect();
                setSceneState("fallback");
                return;
            }

            const currentAttempt = loadAttempt + 1;

            loadAttempt = currentAttempt;
            isLoading = true;
            loadObserver?.disconnect();
            setSceneState("loading");

            try {
                const { default: createRingScene } = await import(
                    "../data/createRingScene"
                );

                if (
                    cancelled ||
                    currentAttempt !== loadAttempt
                ) {
                    isLoading = false;
                    return;
                }

                destroyRingScene = createRingScene({
                    section,
                    sceneContainer,
                    canvas,
                    copy,
                    reducedMotion:
                        reducedMotionMediaQuery.matches,
                    onReady: () => {
                        if (
                            !cancelled &&
                            currentAttempt ===
                                loadAttempt
                        ) {
                            setSceneState(
                                reducedMotionMediaQuery.matches
                                    ? "static"
                                    : "ready",
                            );
                        }
                    },
                    onError: reportSceneError,
                });

                isLoading = false;
            } catch (error) {
                if (
                    cancelled ||
                    currentAttempt !== loadAttempt
                ) {
                    return;
                }

                reportSceneError(error);
            }
        }

        function observeScene() {
            if (cancelled) {
                return;
            }

            loadObserver?.disconnect();

            if (!("IntersectionObserver" in window)) {
                loadRingScene();
                return;
            }

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
        }

        function updateMotionPreference() {
            loadObserver?.disconnect();
            loadAttempt += 1;
            isLoading = false;

            const destroyCurrentScene =
                destroyRingScene;

            destroyRingScene = null;
            destroyCurrentScene?.();
            setSceneState("loading");
            observeScene();
        }

        reducedMotionMediaQuery.addEventListener(
            "change",
            updateMotionPreference,
        );

        observeScene();

        return () => {
            cancelled = true;
            loadAttempt += 1;
            loadObserver?.disconnect();
            destroyRingScene?.();

            reducedMotionMediaQuery.removeEventListener(
                "change",
                updateMotionPreference,
            );
        };
    }, []);

    return (
        <section
            className={`ring-experience ring-experience--${sceneState}`}
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
                    className={`ring-experience__scene is-${sceneState}`}
                    ref={sceneContainerRef}
                    role="img"
                    aria-label="Anel dourado da Auréa."
                >
                    <canvas
                        className="ring-experience__canvas"
                        ref={canvasRef}
                        aria-hidden="true"
                    />

                    <div
                        className="ring-experience__fallback"
                        aria-hidden="true"
                    >
                        <img
                            className="ring-experience__fallback-image"
                            src={fallbackRingImage}
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RingExperience;
