import * as THREE from "three";

import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import ringModel from "../assets/3d/aurea-ring.glb?url";

function createRingScene({
    section,
    sceneContainer,
    canvas,
    copy,
}) {
    if (!section || !sceneContainer || !canvas || !copy) {
        return () => {};
    }

    const mobileMediaQuery = window.matchMedia(
        "(max-width: 640px)",
    );

    const desktopInteractionMediaQuery = window.matchMedia(
        "(min-width: 1025px) and (hover: hover) and (pointer: fine)",
    );

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

    /*
     * O TrackballControls permite girar o anel livremente,
     * sem os limites verticais presentes no OrbitControls.
     */
    const controls = new TrackballControls(
        camera,
        canvas,
    );

    controls.noPan = true;
    controls.noZoom = true;
    controls.rotateSpeed = mobileMediaQuery.matches
        ? 1
        : 1.15;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.12;
    controls.target.set(0, 0, 0);
    controls.update();

    function updateInteractionMode() {
        const canInteract =
            desktopInteractionMediaQuery.matches;

        controls.enabled = canInteract;

        canvas.style.cursor = canInteract
            ? "grab"
            : "default";

        canvas.style.touchAction = canInteract
            ? "none"
            : "auto";

        canvas.style.pointerEvents = canInteract
            ? "auto"
            : "none";

        canvas.style.userSelect = canInteract
            ? "none"
            : "";

        sceneContainer.classList.toggle(
            "is-interactive",
            canInteract,
        );

        if (canInteract) {
            sceneContainer.title =
                "Arraste para girar o anel";
        } else {
            sceneContainer.removeAttribute("title");

            sceneContainer.classList.remove(
                "is-interacting",
            );
        }
    }

    function handleControlsStart() {
        if (!controls.enabled) {
            return;
        }

        sceneContainer.classList.add(
            "is-interacting",
        );

        canvas.style.cursor = "grabbing";
    }

    function handleControlsEnd() {
        if (!controls.enabled) {
            return;
        }

        sceneContainer.classList.remove(
            "is-interacting",
        );

        canvas.style.cursor = "grab";
    }

    controls.addEventListener(
        "start",
        handleControlsStart,
    );

    controls.addEventListener(
        "end",
        handleControlsEnd,
    );

    updateInteractionMode();

    desktopInteractionMediaQuery.addEventListener(
        "change",
        updateInteractionMode,
    );

    /*
     * Ambiente e iluminação.
     */
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

    /*
     * Este grupo recebe exclusivamente as transformações
     * relacionadas à rolagem da página.
     */
    const scrollGroup = new THREE.Group();

    scrollGroup.rotation.set(
        -0.55,
        0.25,
        -0.18,
    );

    scrollGroup.position.y = -0.65;

    scene.add(scrollGroup);

    const loader = new GLTFLoader();

    let ring = null;
    let frameId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let isVisible = false;
    let destroyed = false;
    let framingRadius = 0;

    const copyWords = Array.from(
        copy.querySelectorAll(".ring-experience__word"),
    );

    const scrollTravel = mobileMediaQuery.matches
        ? 0.4
        : 0.55;

    copy.style.opacity = "1";
    copy.style.transform = "none";

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

    function fitCameraToModel() {
        if (!framingRadius || camera.aspect <= 0) {
            return;
        }

        const verticalHalfFov =
            THREE.MathUtils.degToRad(
                camera.fov / 2,
            );

        const horizontalHalfFov = Math.atan(
            Math.tan(verticalHalfFov) *
            camera.aspect,
        );

        const limitingHalfFov = Math.max(
            0.01,
            Math.min(
                verticalHalfFov,
                horizontalHalfFov,
            ),
        );

        const distance =
            framingRadius /
            Math.sin(limitingHalfFov);

        const viewDirection = camera.position
            .clone()
            .sub(controls.target);

        if (viewDirection.lengthSq() < 0.0001) {
            viewDirection.set(0, 0, 1);
        }

        camera.position
            .copy(controls.target)
            .addScaledVector(
                viewDirection.normalize(),
                distance,
            );

        camera.near = Math.max(
            0.01,
            distance - framingRadius * 2,
        );

        camera.far =
            distance + framingRadius * 4;

        camera.updateProjectionMatrix();
        controls.update();
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
        ring.updateMatrixWorld(true);

        const fittedBounds =
            new THREE.Box3().setFromObject(ring);

        const fittedSphere =
            fittedBounds.getBoundingSphere(
                new THREE.Sphere(),
            );

        /*
         * A esfera delimitadora mantém o anel enquadrado
         * durante qualquer rotação.
         */
        framingRadius =
            fittedSphere.radius *
            (mobileMediaQuery.matches
                ? 1.24
                : 1.18) +
            scrollTravel;

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
                if (!material) {
                    return;
                }

                material.metalness = 1;
                material.roughness = 0.18;
                material.color.set("#d39a32");
                material.needsUpdate = true;
            });
        });

        scrollGroup.add(ring);
        fitCameraToModel();

        sceneContainer.classList.add(
            "is-loaded",
        );
    });

    function updateScrollProgress() {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const animationStart =
            viewportHeight *
            (mobileMediaQuery.matches ? 1.05 : 0.85);

        const animationEnd =
            -(rect.height - viewportHeight);

        const animationDistance =
            animationStart - animationEnd;

        if (animationDistance <= 0) {
            targetProgress = 0;
            return;
        }

        targetProgress = THREE.MathUtils.clamp(
            (animationStart - rect.top) /
            animationDistance,
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

        controls.handleResize();
        fitCameraToModel();
    }

    const resizeObserver =
        new ResizeObserver(resizeRenderer);

    const visibilityObserver =
        new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
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

    window.addEventListener(
        "resize",
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
            (targetProgress - currentProgress) *
            0.075;

        scrollGroup.rotation.y =
            0.25 +
            currentProgress *
            Math.PI *
            2;

        scrollGroup.rotation.x =
            -0.55 +
            Math.sin(
                currentProgress * Math.PI,
            ) *
            0.25;

        scrollGroup.rotation.z =
            -0.18 +
            currentProgress * 0.35;

        scrollGroup.position.y =
            -scrollTravel +
            currentProgress *
            scrollTravel *
            2;

        const copyStart = mobileMediaQuery.matches
            ? 0.03
            : 0.08;

        const copyEnd = mobileMediaQuery.matches
            ? 0.22
            : 0.34;

        const copyProgress = THREE.MathUtils.clamp(
            (currentProgress - copyStart) /
            (copyEnd - copyStart),
            0,
            1,
        );

        copyWords.forEach((word, index) => {
            const wordPosition =
                copyWords.length > 1
                    ? index /
                    (copyWords.length - 1)
                    : 0;

            const wordStart =
                wordPosition * 0.42;

            const wordProgress =
                THREE.MathUtils.clamp(
                    (copyProgress - wordStart) /
                    0.58,
                    0,
                    1,
                );

            const easedProgress =
                1 -
                Math.pow(
                    1 - wordProgress,
                    3,
                );

            const movement =
                (1 - easedProgress) *
                (mobileMediaQuery.matches
                    ? 0.75
                    : 1.05);

            const blur =
                (1 - easedProgress) * 6;

            word.style.opacity =
                String(easedProgress);

            word.style.transform =
                `translate3d(0, ${movement}em, 0)`;

            word.style.filter =
                `blur(${blur}px)`;
        });

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    /*
     * O retorno da função faz todo o cleanup quando
     * o componente React for desmontado.
     */
    return function destroyRingScene() {
        destroyed = true;

        window.cancelAnimationFrame(frameId);

        window.removeEventListener(
            "scroll",
            updateScrollProgress,
        );

        window.removeEventListener(
            "resize",
            updateScrollProgress,
        );

        controls.removeEventListener(
            "start",
            handleControlsStart,
        );

        controls.removeEventListener(
            "end",
            handleControlsEnd,
        );

        desktopInteractionMediaQuery.removeEventListener(
            "change",
            updateInteractionMode,
        );

        controls.dispose();

        canvas.style.cursor = "";
        canvas.style.touchAction = "";
        canvas.style.pointerEvents = "";
        canvas.style.userSelect = "";

        copy.style.opacity = "";
        copy.style.transform = "";

        copyWords.forEach((word) => {
            word.style.opacity = "";
            word.style.transform = "";
            word.style.filter = "";
        });

        sceneContainer.classList.remove(
            "is-loaded",
            "is-interactive",
            "is-interacting",
        );

        sceneContainer.removeAttribute("title");

        resizeObserver.disconnect();
        visibilityObserver.disconnect();

        if (ring) {
            scrollGroup.remove(ring);
            disposeModel(ring);
        }

        scene.remove(scrollGroup);
        scene.remove(
            ambientLight,
            keyLight,
            fillLight,
        );

        environment.texture.dispose();
        pmremGenerator.dispose();

        renderer.renderLists.dispose();
        renderer.dispose();
    };
}

export default createRingScene;
