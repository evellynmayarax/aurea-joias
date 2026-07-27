import { useEffect, useRef } from "react";

import createRingScene from "../data/createRingScene";

import "../styles/RingExperience.css";

function RingExperience() {
    const sectionRef = useRef(null);
    const sceneContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const copyRef = useRef(null);

    useEffect(() => {
        const destroyRingScene = createRingScene({
            section: sectionRef.current,
            sceneContainer: sceneContainerRef.current,
            canvas: canvasRef.current,
            copy: copyRef.current,
        });

        return destroyRingScene;
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
                    >
                        Design que se revela em cada movimento.
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