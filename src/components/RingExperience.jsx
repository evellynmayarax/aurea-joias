import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import ringModel from "../assets/3d/aurea-ring.glb?url";
import "../styles/RingExperience.css";

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
        const mobileMediaQuery = window.matchMedia(
            "(max-width: 640px)",
        );

        if (!section || !sceneContainer || !canvas || !copy) {
            return undefined;
        }

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            32,
            1,
            0.1,
            100,
        );

        camera.position.set(0, 0, 7);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 1.5),
        );

        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        const pmremGenerator =
            new THREE.PMREMGenerator(renderer);

        const environment = pmremGenerator.fromScene(
            new RoomEnvironment(),
            0.04,
        );

        scene.environment = environment.texture;

        const ambientLight = new THREE.HemisphereLight(
            0xffffff,
            0x552d15,
            1.8,
        );

        const keyLight = new THREE.DirectionalLight(
            0xfff4dc,
            3.5,
        );

        keyLight.position.set(4, 5, 6);

        const fillLight = new THREE.DirectionalLight(
            0xd6a85f,
            2,
        );

        fillLight.position.set(-4, -1, 4);

        scene.add(
            ambientLight,
            keyLight,
            fillLight,
        );

        const loader = new GLTFLoader();

        let ring = null;
        let frameId = 0;
        let targetProgress = 0;
        let currentProgress = 0;
        let isVisible = false;
        let destroyed = false;

        function disposeModel(model) {
            model.traverse((child) => {
                if (!child.isMesh) {
                    return;
                }

                child.geometry?.dispose();

                const materials = Array.isArray(
                    child.material,
                )
                    ? child.material
                    : [child.material];

                materials.forEach((material) => {
                    material?.dispose();
                });
            });
        }

        loader.load(ringModel, (gltf) => {
            if (destroyed) {
                disposeModel(gltf.scene);
                return;
            }

            ring = gltf.scene;

            const bounds =
                new THREE.Box3().setFromObject(ring);

            const center = bounds.getCenter(
                new THREE.Vector3(),
            );

            const size = bounds.getSize(
                new THREE.Vector3(),
            );

            ring.position.sub(center);

            const largestDimension = Math.max(
                size.x,
                size.y,
                size.z,
            );

            const desiredSize = mobileMediaQuery.matches
                ? 2.4
                : 3.2;

            const scale =
                desiredSize / largestDimension;
            ring.scale.setScalar(scale);

            ring.rotation.set(
                -0.55,
                0.25,
                -0.18,
            );

            ring.traverse((child) => {
                if (!child.isMesh) {
                    return;
                }

                const materials = Array.isArray(
                    child.material,
                )
                    ? child.material
                    : [child.material];

                materials.forEach((material) => {
                    material.metalness = 1;
                    material.roughness = 0.18;
                    material.color.set("#d39a32");
                    material.needsUpdate = true;
                });
            });

            scene.add(ring);

            sceneContainer.classList.add(
                "is-loaded",
            );
        });

        function updateScrollProgress() {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const animationStart =
                viewportHeight * 0.85;

            const animationEnd =
                -(rect.height - viewportHeight);

            const animationDistance =
                animationStart - animationEnd;

            if (animationDistance <= 0) {
                targetProgress = 0;
                return;
            }

            targetProgress = THREE.MathUtils.clamp(
                (
                    animationStart -
                    rect.top
                ) / animationDistance,
                0,
                1,
            );

            isVisible =
                rect.bottom > -viewportHeight * 0.2 &&
                rect.top < viewportHeight * 1.2;
        }

        function resizeRenderer() {
            const width =
                sceneContainer.clientWidth;

            const height =
                sceneContainer.clientHeight;

            if (!width || !height) {
                return;
            }

            renderer.setSize(
                width,
                height,
                false,
            );

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        const resizeObserver =
            new ResizeObserver(resizeRenderer);

        const visibilityObserver =
            new IntersectionObserver(
                ([entry]) => {
                    isVisible =
                        entry.isIntersecting;
                },
                {
                    threshold: 0,
                    rootMargin: "20% 0px",
                },
            );

        resizeObserver.observe(sceneContainer);
        visibilityObserver.observe(section);

        window.addEventListener(
            "scroll",
            updateScrollProgress,
            { passive: true },
        );

        updateScrollProgress();
        resizeRenderer();

        function animate() {
            frameId =
                window.requestAnimationFrame(animate);

            if (!isVisible) {
                return;
            }

            currentProgress +=
                (targetProgress -
                    currentProgress) *
                0.075;

            if (ring) {
                ring.rotation.y =
                    0.25 +
                    currentProgress *
                    Math.PI *
                    2;

                ring.rotation.x =
                    -0.55 +
                    Math.sin(
                        currentProgress *
                        Math.PI,
                    ) *
                    0.25;

                ring.rotation.z =
                    -0.18 +
                    currentProgress * 0.35;

                ring.position.y =
                    -0.65 +
                    currentProgress * 1.3;
            }

            const copyStart = mobileMediaQuery.matches
                ? 0.38
                : 0.08;

            const copyEnd = mobileMediaQuery.matches
                ? 0.62
                : 0.36;

            const copyProgress = THREE.MathUtils.clamp(
                (
                    currentProgress -
                    copyStart
                ) / (
                    copyEnd -
                    copyStart
                ),
                0,
                1,
            );

            const copyMovementDistance =
                mobileMediaQuery.matches
                    ? 1.25
                    : 2.5;

            const copyMovement =
                (1 - copyProgress) *
                copyMovementDistance;

            copy.style.opacity =
                String(copyProgress);

            copy.style.transform =
                `translate3d(0, ${copyMovement}rem, 0)`;

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            destroyed = true;

            window.cancelAnimationFrame(frameId);

            window.removeEventListener(
                "scroll",
                updateScrollProgress,
            );

            resizeObserver.disconnect();
            visibilityObserver.disconnect();

            if (ring) {
                scene.remove(ring);
                disposeModel(ring);
            }

            environment.texture.dispose();
            pmremGenerator.dispose();
            renderer.dispose();
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
                    >
                        Design que se revela em cada movimento.
                    </h2>
                </div>

                <div
                    className="ring-experience__scene"
                    ref={sceneContainerRef}
                    role="img"
                    aria-label="Anel dourado girando em três dimensões"
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