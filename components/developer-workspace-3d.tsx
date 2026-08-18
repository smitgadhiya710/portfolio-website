"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function disposeScene(scene: THREE.Scene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();

  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line)) return;
    geometries.add(object.geometry);
    const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
    objectMaterials.forEach((material) => materials.add(material));
  });

  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
}

function createRoundedPanel(material: THREE.Material, width: number, height: number) {
  const panel = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.055, 4, 4, 1), material);
  panel.castShadow = true;
  return panel;
}

export default function DeveloperWorkspace3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.2, 10.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.55));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const violetGlass = new THREE.MeshPhysicalMaterial({
      color: 0x8c9dff,
      metalness: 0.18,
      roughness: 0.12,
      transmission: 0.22,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      emissive: 0x38468f,
      emissiveIntensity: 0.55,
    });
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x090b13,
      metalness: 0.88,
      roughness: 0.2,
    });
    const silver = new THREE.MeshStandardMaterial({
      color: 0xd9dbe3,
      metalness: 0.84,
      roughness: 0.15,
    });
    const lime = new THREE.MeshStandardMaterial({
      color: 0xd9ff5b,
      emissive: 0xa7d320,
      emissiveIntensity: 1.4,
      metalness: 0.15,
      roughness: 0.26,
    });
    const coral = new THREE.MeshStandardMaterial({
      color: 0xff6b82,
      emissive: 0xaf203c,
      emissiveIntensity: 1.2,
      metalness: 0.2,
      roughness: 0.22,
    });
    const glassPanel = new THREE.MeshPhysicalMaterial({
      color: 0xaeb9ff,
      transparent: true,
      opacity: 0.18,
      transmission: 0.55,
      roughness: 0.1,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    const system = new THREE.Group();
    system.rotation.set(0.08, -0.18, -0.06);
    scene.add(system);

    const outerShell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 3), violetGlass);
    system.add(outerShell);

    const wireShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.42, 2),
      new THREE.MeshBasicMaterial({
        color: 0xc6ccff,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    );
    system.add(wireShell);

    const core = new THREE.Mesh(new THREE.SphereGeometry(0.78, 48, 48), darkMetal);
    core.scale.set(1, 0.88, 1.08);
    system.add(core);

    const coreLight = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 2), lime);
    system.add(coreLight);

    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(3.02, 0.035, 12, 180), silver);
    ringOne.rotation.set(1.08, 0.2, 0.28);
    system.add(ringOne);

    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(2.68, 0.022, 10, 160), coral);
    ringTwo.rotation.set(0.35, 1.25, -0.25);
    system.add(ringTwo);

    const ringThree = new THREE.Mesh(
      new THREE.TorusGeometry(3.45, 0.012, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0x8c9dff, transparent: true, opacity: 0.55 }),
    );
    ringThree.rotation.set(-0.38, 0.78, 1.05);
    system.add(ringThree);

    const satellites: THREE.Mesh[] = [];
    const satelliteData = [
      { radius: 0.22, position: [2.5, 1.2, 0.6], material: lime },
      { radius: 0.34, position: [-2.7, -0.35, 0.4], material: silver },
      { radius: 0.18, position: [1.45, -2.4, 0.8], material: coral },
      { radius: 0.12, position: [-1.25, 2.7, -0.3], material: lime },
    ] as const;

    satelliteData.forEach(({ radius, position, material }) => {
      const satellite = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 24), material);
      satellite.position.set(position[0], position[1], position[2]);
      satellite.castShadow = true;
      satellites.push(satellite);
      system.add(satellite);
    });

    const panels: THREE.Mesh[] = [];
    const panelData = [
      { position: [-2.72, 1.25, 0.3], rotation: [0.1, 0.65, -0.18], scale: [1.18, 0.72] },
      { position: [2.55, -1.05, 0.1], rotation: [-0.12, -0.72, 0.14], scale: [1.05, 0.66] },
      { position: [1.65, 2.48, -0.75], rotation: [0.25, -0.25, 0.16], scale: [0.82, 0.48] },
    ] as const;

    panelData.forEach(({ position, rotation, scale }, index) => {
      const panel = createRoundedPanel(glassPanel, scale[0], scale[1]);
      panel.position.set(position[0], position[1], position[2]);
      panel.rotation.set(rotation[0], rotation[1], rotation[2]);
      system.add(panel);
      panels.push(panel);

      const lineMaterial = index === 1 ? coral : lime;
      for (let lineIndex = 0; lineIndex < 3; lineIndex += 1) {
        const line = new THREE.Mesh(
          new THREE.BoxGeometry(scale[0] * (0.48 - lineIndex * 0.08), 0.018, 0.016),
          lineMaterial,
        );
        line.position.set(-scale[0] * 0.12, scale[1] * 0.22 - lineIndex * 0.11, 0.045);
        panel.add(line);
      }
    });

    const particleCount = 520;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 3.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[index * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xc7cdff,
        size: 0.025,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    system.add(particles);

    scene.add(new THREE.HemisphereLight(0xcbd4ff, 0x070810, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 5.8);
    keyLight.position.set(4, 5, 7);
    scene.add(keyLight);
    const violetLight = new THREE.PointLight(0x7c8fff, 35, 13);
    violetLight.position.set(-3, 1, 4);
    scene.add(violetLight);
    const coralLight = new THREE.PointLight(0xff526d, 22, 10);
    coralLight.position.set(3, -2, 3);
    scene.add(coralLight);

    const pointer = new THREE.Vector2();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = true;

    const resize = () => {
      const bounds = mount.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      renderer.setSize(bounds.width, bounds.height, false);
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(mount);

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      if (!visible) return;
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion.matches) {
        system.rotation.y += (pointer.x * 0.24 - system.rotation.y) * 0.025;
        system.rotation.x += (-pointer.y * 0.13 + 0.08 - system.rotation.x) * 0.025;
        outerShell.rotation.y = elapsed * 0.08;
        outerShell.rotation.x = Math.sin(elapsed * 0.25) * 0.1;
        wireShell.rotation.y = -elapsed * 0.045;
        wireShell.rotation.z = elapsed * 0.025;
        ringOne.rotation.z = elapsed * 0.13;
        ringTwo.rotation.y = 1.25 + elapsed * 0.1;
        ringThree.rotation.x = -0.38 + Math.sin(elapsed * 0.3) * 0.12;
        coreLight.scale.setScalar(0.9 + Math.sin(elapsed * 2.2) * 0.1);
        particles.rotation.y = elapsed * 0.018;
        satellites.forEach((satellite, index) => {
          satellite.position.y = satelliteData[index].position[1] + Math.sin(elapsed * 0.75 + index) * 0.13;
        });
        panels.forEach((panel, index) => {
          panel.position.y = panelData[index].position[1] + Math.sin(elapsed * 0.65 + index * 0.7) * 0.12;
        });
        camera.position.x += (pointer.x * 0.42 - camera.position.x) * 0.018;
        camera.position.y += (pointer.y * 0.28 + 0.2 - camera.position.y) * 0.018;
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    mount.addEventListener("pointermove", handlePointerMove, { passive: true });
    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      mount.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
