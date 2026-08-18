"use client";

import { Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useExperience } from "@/components/immersive/experience-provider";

const colors = {
  coral: "#FF6177",
  data: "#62D9FF",
  iris: "#7B66FF",
  lime: "#CFFF47",
  mineral: "#F2F0E8",
  teal: "#00C7B5",
};

type SceneGroup = THREE.Group;

function fadeMaterial(material: THREE.Material | THREE.Material[], opacity: number) {
  const materials = Array.isArray(material) ? material : [material];
  materials.forEach((item) => {
    item.transparent = true;
    item.opacity = opacity;
  });
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const { motionEnabled } = useExperience();

  useFrame(() => {
    const targetX = motionEnabled ? pointer.x * 0.4 : 0;
    const targetY = motionEnabled ? pointer.y * 0.22 : 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function StackCore() {
  const group = useRef<SceneGroup>(null);
  const layerRefs = useRef<Array<THREE.Group | null>>([]);
  const { activeChapter, motionEnabled, progress } = useExperience();
  const layerColors = [colors.mineral, colors.data, colors.teal, colors.iris, colors.lime];

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const chapterVisible = activeChapter <= 1 || activeChapter >= 6;
    const desiredScale = chapterVisible ? 1 : 0.56;
    group.current.scale.lerp(new THREE.Vector3(desiredScale, desiredScale, desiredScale), 0.045);
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      activeChapter === 1 ? 2.6 : activeChapter >= 6 ? 2.7 : 1.8,
      0.04,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      activeChapter >= 6 ? -0.8 : 0.1,
      0.04,
    );
    if (motionEnabled) {
      group.current.rotation.y += delta * (0.12 + progress.current * 0.08);
      group.current.rotation.x = Math.sin(time * 0.32) * 0.08;
    }

    layerRefs.current.forEach((layer, index) => {
      if (!layer) return;
      const exploded = activeChapter === 1 ? (index - 2) * 0.66 : 0;
      layer.position.y = THREE.MathUtils.lerp(layer.position.y, exploded, 0.055);
      layer.rotation.z = motionEnabled ? time * (0.035 + index * 0.006) * (index % 2 ? 1 : -1) : 0;
    });
  });

  return (
    <group ref={group} position={[1.8, 0.1, 0]} rotation={[0.05, -0.4, -0.08]}>
      <mesh>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshPhysicalMaterial
          color="#11131A"
          emissive={colors.iris}
          emissiveIntensity={0.28}
          metalness={0.84}
          roughness={0.23}
          clearcoat={1}
        />
      </mesh>
      <mesh scale={1.035}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color={colors.iris} wireframe transparent opacity={0.44} />
      </mesh>
      {layerColors.map((color, index) => (
        <group
          key={color}
          ref={(node) => {
            layerRefs.current[index] = node;
          }}
          rotation={[Math.PI / 2 + index * 0.18, index * 0.28, 0]}
        >
          <mesh>
            <torusGeometry args={[1.08 + index * 0.19, 0.025 + index * 0.005, 12, 96]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
          </mesh>
          <mesh position={[1.08 + index * 0.19, 0, 0]}>
            <sphereGeometry args={[0.07 + index * 0.005, 14, 14]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
          </mesh>
        </group>
      ))}
      <pointLight color={colors.iris} intensity={6} distance={7} />
    </group>
  );
}

function ByteCompanion() {
  const byte = useRef<SceneGroup>(null);
  const { activeChapter, gameActive, gameLane, gameProgress, motionEnabled } = useExperience();

  useFrame((state, delta) => {
    if (!byte.current) return;
    const time = state.clock.elapsedTime;
    const laneX = gameActive ? (gameLane - 1) * 1.25 : 0;
    const chapterPositions: Array<[number, number, number]> = [
      [-2.8, 1.45, 0],
      [-2.4, -1.4, 0],
      [2.5, 1.45, 0],
      [-2.6, 1.25, 0],
      [2.5, 1.15, 0],
      [laneX, -1.05 + gameProgress * 0.3, 1.1],
      [-2.6, -1.55, 0],
      [2.35, -1.3, 0],
    ];
    const target = chapterPositions[activeChapter] ?? chapterPositions[0];
    byte.current.position.x = THREE.MathUtils.lerp(byte.current.position.x, target[0], 0.055);
    byte.current.position.y = THREE.MathUtils.lerp(
      byte.current.position.y,
      target[1] + (motionEnabled ? Math.sin(time * 1.8) * 0.12 : 0),
      0.055,
    );
    byte.current.position.z = THREE.MathUtils.lerp(byte.current.position.z, target[2], 0.055);
    if (motionEnabled) byte.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={byte} position={[-2.8, 1.45, 0]} scale={0.42}>
      <mesh>
        <octahedronGeometry args={[0.48, 0]} />
        <meshPhysicalMaterial color="#151822" metalness={0.75} roughness={0.22} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.06, 0.43]} scale={[0.58, 0.22, 0.08]}>
        <boxGeometry />
        <meshStandardMaterial color={colors.lime} emissive={colors.lime} emissiveIntensity={3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.035, 10, 48]} />
        <meshBasicMaterial color={colors.data} transparent opacity={0.75} />
      </mesh>
      <pointLight color={colors.data} intensity={4} distance={3} />
    </group>
  );
}

function OrbitalOrganization({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const nodes = useMemo(
    () => Array.from({ length: 12 }, (_, index) => {
      const angle = (index / 12) * Math.PI * 2;
      return [Math.cos(angle) * (1.2 + (index % 3) * 0.34), Math.sin(angle) * (1.2 + (index % 3) * 0.34), (index % 2) * 0.35] as [number, number, number];
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.scale.lerp(new THREE.Vector3(visible ? 1 : 0.001, visible ? 1 : 0.001, visible ? 1 : 0.001), 0.06);
    if (visible) group.current.rotation.z -= delta * 0.08;
    group.current.children.forEach((child) => fadeMaterial((child as THREE.Mesh).material ?? [], visible ? 1 : 0));
  });

  return (
    <group ref={group} position={[1.8, 0, 0]}>
      {[1.1, 1.6, 2.1].map((radius) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0.2 * radius, 0]}>
          <torusGeometry args={[radius, 0.018, 8, 64]} />
          <meshBasicMaterial color={colors.iris} transparent opacity={0.46} />
        </mesh>
      ))}
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index % 4 === 0 ? 0.18 : 0.09, 16, 16]} />
          <meshStandardMaterial color={index % 4 === 0 ? colors.mineral : colors.iris} emissive={colors.iris} emissiveIntensity={1.4} />
        </mesh>
      ))}
    </group>
  );
}

function PulseNetwork({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const nodes = useMemo<Array<[number, number, number]>>(
    () => [
      [-1.8, 0.9, 0], [-0.9, 1.7, -0.3], [0.1, 1.1, 0.2], [1.2, 1.55, -0.2],
      [-1.45, -0.5, 0.2], [-0.3, -0.1, -0.2], [0.8, -0.65, 0.3], [1.8, 0.15, 0],
    ],
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const scale = visible ? 1 : 0.001;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
    group.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh && visible) {
        child.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 2.2 + index) * 0.18);
      }
    });
  });

  return (
    <group ref={group} position={[1.65, -0.05, 0]}>
      <Line points={nodes} color={colors.teal} lineWidth={1.2} transparent opacity={0.62} />
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <octahedronGeometry args={[index === 5 ? 0.32 : 0.13, 0]} />
          <meshStandardMaterial color={index === 5 ? colors.mineral : colors.teal} emissive={colors.teal} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

function QuestionFoundry({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const cells = useMemo(
    () => Array.from({ length: 56 }, (_, index) => ({
      position: [((index % 8) - 3.5) * 0.45, (Math.floor(index / 8) - 3) * 0.45, Math.sin(index * 1.7) * 0.14] as [number, number, number],
      scale: 0.11 + (index % 5) * 0.012,
    })),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const scale = visible ? 1 : 0.001;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
    if (visible) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.24) * 0.22;
    group.current.rotation.z += visible ? delta * 0.025 : 0;
  });

  return (
    <group ref={group} position={[1.7, 0, 0]} rotation={[0.2, -0.2, -0.15]}>
      {cells.map(({ position, scale }, index) => (
        <mesh key={index} position={position}>
          <boxGeometry args={[scale * 2.4, scale * 2.4, scale]} />
          <meshStandardMaterial
            color={index % 7 === 0 ? colors.lime : "#24282F"}
            emissive={index % 7 === 0 ? colors.lime : colors.teal}
            emissiveIntensity={index % 7 === 0 ? 1.7 : 0.12}
          />
        </mesh>
      ))}
      <Line points={[[-2.1, 0, 0.3], [0, 0, 0.6], [2.2, 0, 0.2]]} color={colors.lime} lineWidth={2} />
    </group>
  );
}

function LivingGrid({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const buildings = useMemo(
    () => Array.from({ length: 40 }, (_, index) => ({
      height: 0.24 + ((index * 7) % 11) * 0.1,
      position: [((index % 8) - 3.5) * 0.48, 0, (Math.floor(index / 8) - 2) * 0.48] as [number, number, number],
    })),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const scale = visible ? 1 : 0.001;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
    if (visible) group.current.rotation.y = -0.45 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={group} position={[1.7, -0.95, 0]} rotation={[0.12, -0.45, 0]}>
      {buildings.map(({ height, position }, index) => (
        <mesh key={index} position={[position[0], height / 2, position[2]]}>
          <boxGeometry args={[0.32, height, 0.32]} />
          <meshStandardMaterial
            color={index % 6 === 0 ? colors.coral : "#1D2028"}
            emissive={index % 6 === 0 ? colors.coral : colors.data}
            emissiveIntensity={index % 6 === 0 ? 1.8 : 0.1}
            metalness={0.55}
            roughness={0.4}
          />
        </mesh>
      ))}
      <gridHelper args={[4.5, 10, colors.coral, "#20232B"]} />
    </group>
  );
}

function CapabilityConstellation({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const points = useMemo<Array<[number, number, number]>>(
    () => [[-2, 1.3, 0], [-0.9, 0.7, 0.5], [0.2, 1.5, 0], [1.5, 0.75, -0.2], [2, -0.65, 0.2], [0.65, -1.4, 0], [-0.75, -1, 0.3], [-2, -0.45, -0.3]],
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const scale = visible ? 1 : 0.001;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
    if (visible) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group} position={[1.6, 0, 0]}>
      <Line points={[...points, points[0]]} color={colors.data} lineWidth={1} transparent opacity={0.5} />
      {points.map((position, index) => (
        <mesh key={index} position={position}>
          <icosahedronGeometry args={[index % 3 === 0 ? 0.19 : 0.11, 1]} />
          <meshStandardMaterial color={index % 2 ? colors.data : colors.iris} emissive={index % 2 ? colors.data : colors.iris} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

function AIPipeline({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const stages = [-1.8, -0.6, 0.6, 1.8];

  useFrame((state) => {
    if (!group.current) return;
    const scale = visible ? 1 : 0.001;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
    group.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh && visible) child.rotation.y = state.clock.elapsedTime * (0.15 + index * 0.03);
    });
  });

  return (
    <group ref={group} position={[1.65, 0, 0]}>
      <Line points={stages.map((x) => [x, 0, 0] as [number, number, number])} color={colors.lime} lineWidth={2} />
      {stages.map((x, index) => (
        <mesh key={x} position={[x, 0, 0]}>
          {index === 0 ? <dodecahedronGeometry args={[0.34, 0]} /> : null}
          {index === 1 ? <octahedronGeometry args={[0.42, 0]} /> : null}
          {index === 2 ? <icosahedronGeometry args={[0.42, 1]} /> : null}
          {index === 3 ? <torusKnotGeometry args={[0.26, 0.08, 64, 8]} /> : null}
          <meshStandardMaterial
            color={[colors.data, colors.teal, colors.iris, colors.lime][index]}
            emissive={[colors.data, colors.teal, colors.iris, colors.lime][index]}
            emissiveIntensity={1.7}
            metalness={0.65}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function PacketRunWorld({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const { gameActive, gameProgress } = useExperience();

  useFrame(() => {
    if (!group.current) return;
    const scale = visible ? 1 : 0.001;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
  });

  return (
    <group ref={group} position={[0, -1.05, -0.4]} rotation={[-0.72, 0, 0]}>
      {[-1.25, 0, 1.25].map((x) => (
        <mesh key={x} position={[x, 0, -1]}>
          <boxGeometry args={[0.035, 5.8, 0.025]} />
          <meshBasicMaterial color={colors.data} transparent opacity={0.35} />
        </mesh>
      ))}
      {[0.19, 0.34, 0.51, 0.69, 0.83].map((at, index) => {
        const lane = [0, 1, 2, 1, 0][index];
        return (
          <mesh key={at} position={[(lane - 1) * 1.25, 2.5 - ((at - gameProgress) * 6.5), 0.1]}>
            <boxGeometry args={[0.65, 0.18, 0.34]} />
            <meshStandardMaterial color={colors.coral} emissive={colors.coral} emissiveIntensity={2} />
          </mesh>
        );
      })}
      <mesh position={[0, -2, -0.08]}>
        <boxGeometry args={[3.9, 6, 0.06]} />
        <meshStandardMaterial color="#0D1017" emissive={gameActive ? colors.iris : "#11131A"} emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function ExperienceScene() {
  const { activeChapter, activeProject, quality } = useExperience();

  return (
    <>
      <color attach="background" args={["#06070B"]} />
      <fog attach="fog" args={["#06070B", 6, 13]} />
      <ambientLight intensity={0.48} />
      <directionalLight position={[-3, 5, 5]} intensity={2.2} color="#F2F0E8" />
      <pointLight position={[3, -2, 3]} intensity={8} distance={9} color={colors.iris} />
      <Sparkles count={quality === "high" ? 90 : 42} scale={[10, 7, 5]} size={1.1} speed={0.22} color={colors.data} opacity={0.28} />
      <StackCore />
      <ByteCompanion />
      <OrbitalOrganization visible={activeChapter === 2 && activeProject === 0} />
      <PulseNetwork visible={activeChapter === 2 && activeProject === 1} />
      <QuestionFoundry visible={activeChapter === 2 && activeProject === 2} />
      <LivingGrid visible={activeChapter === 2 && activeProject === 3} />
      <CapabilityConstellation visible={activeChapter === 3} />
      <AIPipeline visible={activeChapter === 4} />
      <PacketRunWorld visible={activeChapter === 5} />
      <CameraRig />
    </>
  );
}

export function ExperienceCanvas() {
  const { motionEnabled, quality } = useExperience();
  const dpr: [number, number] = quality === "high" ? [1, 1.5] : [1, 1.25];

  return (
    <div className="experience-canvas" aria-hidden="true">
      <Canvas
        camera={{ fov: 43, near: 0.1, far: 40, position: [0, 0, 7.1] }}
        dpr={dpr}
        fallback={<div className="webgl-fallback"><strong>3D system view unavailable</strong><span>The complete portfolio remains available below.</span></div>}
        frameloop={motionEnabled ? "always" : "demand"}
        gl={{ alpha: false, antialias: quality !== "reduced", powerPreference: "high-performance" }}
      >
        <ExperienceScene />
      </Canvas>
      <div className="canvas-vignette" />
    </div>
  );
}
