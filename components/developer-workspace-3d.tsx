"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function box(width: number, height: number, depth: number, material: THREE.Material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

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

export default function DeveloperWorkspace3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(6.4, 4.5, 10.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const charcoal = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.72, roughness: 0.28 });
    const darkGlass = new THREE.MeshPhysicalMaterial({
      color: 0x070b18,
      emissive: 0x111a3a,
      emissiveIntensity: 0.5,
      metalness: 0.35,
      roughness: 0.12
    });
    const cyan = new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 1.15 });
    const violet = new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0x7c3aed, emissiveIntensity: 0.95 });
    const pink = new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xdb2777, emissiveIntensity: 0.9 });
    const amber = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706, emissiveIntensity: 0.85 });
    const white = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.18, roughness: 0.35 });
    const screenLineMaterials = [cyan, violet, pink, amber];

    const workspace = new THREE.Group();
    workspace.position.set(0.75, -0.45, 0);
    scene.add(workspace);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 11),
      new THREE.MeshStandardMaterial({ color: 0x07101d, transparent: true, opacity: 0.74, metalness: 0.35, roughness: 0.62 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    workspace.add(floor);

    const laptop = new THREE.Group();
    laptop.position.set(-0.35, 0.44, 0.15);
    workspace.add(laptop);

    const laptopBase = box(3.35, 0.18, 2.15, charcoal);
    laptopBase.position.y = 0.08;
    laptop.add(laptopBase);

    const keyboardMaterial = new THREE.MeshStandardMaterial({ color: 0x273449, metalness: 0.45, roughness: 0.5 });
    for (let row = 0; row < 4; row += 1) {
      for (let column = 0; column < 9; column += 1) {
        const key = box(0.25, 0.035, 0.22, keyboardMaterial);
        key.position.set(-1.12 + column * 0.28, 0.2, -0.1 + row * 0.27);
        laptop.add(key);
      }
    }
    const trackpad = box(1.12, 0.025, 0.55, new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.35 }));
    trackpad.position.set(0, 0.2, 0.72);
    laptop.add(trackpad);

    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.7, 18), charcoal);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.3, -1);
    laptop.add(hinge);

    const screen = new THREE.Group();
    screen.position.set(0, 1.35, -1.05);
    screen.rotation.x = -0.08;
    laptop.add(screen);

    const screenFrame = box(3.32, 2.08, 0.12, charcoal);
    screen.add(screenFrame);
    const screenPanel = box(3.02, 1.77, 0.035, darkGlass);
    screenPanel.position.z = 0.075;
    screen.add(screenPanel);

    const codeLines: THREE.Mesh[] = [];
    const lineWidths = [1.8, 1.18, 2.05, 1.48, 1.92, 0.9, 1.55];
    lineWidths.forEach((width, index) => {
      const line = box(width, 0.065, 0.018, screenLineMaterials[index % screenLineMaterials.length]);
      line.position.set(-1.22 + width / 2 + (index % 2) * 0.24, 0.58 - index * 0.2, 0.105);
      screen.add(line);
      codeLines.push(line);
    });
    const sidebar = box(0.42, 1.52, 0.02, new THREE.MeshBasicMaterial({ color: 0x111936 }));
    sidebar.position.set(-1.26, 0, 0.1);
    screen.add(sidebar);

    const server = new THREE.Group();
    server.position.set(3.35, 1.42, 0.3);
    workspace.add(server);
    const rack = box(1.55, 2.85, 1.4, new THREE.MeshStandardMaterial({ color: 0x141b2d, metalness: 0.76, roughness: 0.3 }));
    server.add(rack);
    const serverLights: THREE.Mesh[] = [];
    for (let index = 0; index < 6; index += 1) {
      const unit = box(1.32, 0.31, 0.12, index % 2 ? darkGlass : charcoal);
      unit.position.set(0, 0.98 - index * 0.4, 0.72);
      server.add(unit);
      const indicator = box(0.09, 0.06, 0.025, index % 3 === 0 ? pink : cyan);
      indicator.position.set(0.5, 0.98 - index * 0.4, 0.795);
      server.add(indicator);
      serverLights.push(indicator);
    }
    const serverAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.78, 10), white);
    serverAntenna.position.set(0.44, 1.75, 0);
    server.add(serverAntenna);
    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 14), pink);
    antennaTip.position.set(0.44, 2.17, 0);
    server.add(antennaTip);

    const robot = new THREE.Group();
    robot.position.set(-3.25, 1.05, 0.35);
    workspace.add(robot);
    const robotBody = box(1.2, 1.42, 0.88, white);
    robot.add(robotBody);
    const robotChest = box(0.76, 0.42, 0.06, darkGlass);
    robotChest.position.set(0, 0.18, 0.47);
    robot.add(robotChest);
    const robotHead = new THREE.Group();
    robotHead.position.y = 1.17;
    robot.add(robotHead);
    robotHead.add(box(1.34, 0.84, 0.9, charcoal));
    const face = box(1.05, 0.54, 0.04, darkGlass);
    face.position.z = 0.47;
    robotHead.add(face);
    const leftEye = box(0.22, 0.08, 0.025, cyan);
    leftEye.position.set(-0.27, 0.04, 0.505);
    robotHead.add(leftEye);
    const rightEye = leftEye.clone();
    rightEye.position.x = 0.27;
    robotHead.add(rightEye);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.48, 10), white);
    antenna.position.y = 0.65;
    robotHead.add(antenna);
    const antennaOrb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), violet);
    antennaOrb.position.y = 0.93;
    robotHead.add(antennaOrb);
    const leftArm = box(0.25, 1.08, 0.3, white);
    leftArm.position.set(-0.78, -0.02, 0);
    leftArm.rotation.z = -0.14;
    robot.add(leftArm);
    const rightArm = leftArm.clone();
    rightArm.position.x = 0.78;
    rightArm.rotation.z = 0.14;
    robot.add(rightArm);

    const mug = new THREE.Group();
    mug.position.set(-2.05, 0.54, -1.45);
    workspace.add(mug);
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.23, 0.62, 24), violet);
    mug.add(cup);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 10, 24, Math.PI * 1.65), violet);
    handle.rotation.y = Math.PI / 2;
    handle.position.set(0.27, 0.02, 0);
    mug.add(handle);

    const cloud = new THREE.Group();
    cloud.position.set(2.2, 3.85, -0.8);
    workspace.add(cloud);
    const cloudMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9be7f2,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.86,
      roughness: 0.18,
      transmission: 0.1
    });
    [
      [-0.44, 0, 0, 0.42],
      [0, 0.15, 0, 0.55],
      [0.5, 0, 0, 0.38],
      [0.12, -0.14, 0, 0.5]
    ].forEach(([x, y, z, radius]) => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(radius, 22, 22), cloudMaterial);
      puff.position.set(x, y, z);
      cloud.add(puff);
    });

    const cableMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
      new THREE.MeshBasicMaterial({ color: 0xf472b6 })
    ];
    [0, 1].forEach((index) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.2, 0.45 - index * 0.08, 0.1),
        new THREE.Vector3(2, 0.18, 0.8 + index * 0.18),
        new THREE.Vector3(2.7, 0.65, 0.7),
        new THREE.Vector3(3.35, 1.05 - index * 0.26, 0.92)
      ]);
      const cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.022, 8, false), cableMaterials[index]);
      workspace.add(cable);
    });

    const floatingPanels: THREE.Group[] = [];
    const panelDefinitions = [
      { position: [-2.35, 3.2, -0.8], color: violet },
      { position: [4.4, 3.35, -0.3], color: pink },
      { position: [4.55, 0.3, -0.65], color: amber }
    ];
    panelDefinitions.forEach(({ position, color }, panelIndex) => {
      const panel = new THREE.Group();
      panel.position.set(position[0], position[1], position[2]);
      panel.rotation.y = panelIndex === 0 ? 0.28 : -0.32;
      panel.add(box(1.6, 0.94, 0.055, new THREE.MeshPhysicalMaterial({ color: 0x101827, transparent: true, opacity: 0.82, roughness: 0.2 })));
      for (let index = 0; index < 3; index += 1) {
        const line = box(0.9 - index * 0.16, 0.055, 0.02, index === 0 ? color : cyan);
        line.position.set(-0.22, 0.24 - index * 0.22, 0.05);
        panel.add(line);
      }
      workspace.add(panel);
      floatingPanels.push(panel);
    });

    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(360 * 3);
    for (let index = 0; index < 360; index += 1) {
      dustPositions[index * 3] = (Math.random() - 0.5) * 12;
      dustPositions[index * 3 + 1] = Math.random() * 6;
      dustPositions[index * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.025, transparent: true, opacity: 0.48, depthWrite: false })
    );
    workspace.add(dust);

    scene.add(new THREE.HemisphereLight(0xbdeafe, 0x0f1028, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(3, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x22d3ee, 22, 14);
    cyanLight.position.set(-2, 3, 3);
    scene.add(cyanLight);
    const pinkLight = new THREE.PointLight(0xf472b6, 18, 13);
    pinkLight.position.set(4, 2, 2);
    scene.add(pinkLight);

    const mouse = new THREE.Vector2();
    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion.matches) {
        workspace.rotation.y += (mouse.x * 0.075 - workspace.rotation.y) * 0.025;
        workspace.rotation.x += (mouse.y * 0.035 - workspace.rotation.x) * 0.025;
        robotHead.rotation.y = Math.sin(elapsed * 0.7) * 0.13;
        antennaOrb.position.y = 0.93 + Math.sin(elapsed * 2.2) * 0.035;
        cloud.position.x = 2.2 + Math.sin(elapsed * 0.38) * 0.22;
        cloud.position.y = 3.85 + Math.sin(elapsed * 0.7) * 0.09;
        floatingPanels.forEach((panel, index) => {
          panel.position.y = panelDefinitions[index].position[1] + Math.sin(elapsed * 0.9 + index) * 0.11;
        });
        serverLights.forEach((light, index) => {
          light.visible = Math.sin(elapsed * (2.2 + index * 0.18) + index) > -0.35;
        });
        codeLines.forEach((line, index) => {
          line.scale.x = 0.94 + Math.sin(elapsed * 1.6 + index * 0.55) * 0.06;
        });
        dust.rotation.y = elapsed * 0.012;
        camera.position.x += (6.4 + mouse.x * 0.42 - camera.position.x) * 0.018;
        camera.position.y += (4.5 + mouse.y * 0.24 - camera.position.y) * 0.018;
      }

      camera.lookAt(0.55, 1.35, 0);
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    mount.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      mount.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
