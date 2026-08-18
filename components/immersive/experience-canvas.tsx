"use client";

import {
  ContactShadows,
  Environment,
  Grid,
  Lightformer,
  Line,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { type ReactNode, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { useExperience } from "@/components/immersive/experience-provider";

const colors = {
  carbon: "#11131A",
  coral: "#FF6177",
  data: "#62D9FF",
  iris: "#7B66FF",
  lime: "#CFFF47",
  mineral: "#F2F0E8",
  teal: "#00C7B5",
  void: "#06070B",
};

const chapterAtmospheres = [
  colors.void,
  "#070916",
  colors.void,
  "#071218",
  "#101307",
  "#061018",
  "#0D0914",
  "#080A0E",
] as const;

const projectAtmospheres = ["#0A0816", "#061412", "#101307", "#15080D"] as const;

type SceneGroup = THREE.Group;
type Vector3Tuple = [number, number, number];

const gameObstacles = [
  { at: 0.12, lane: 0 },
  { at: 0.23, lane: 2 },
  { at: 0.35, lane: 1 },
  { at: 0.47, lane: 0 },
  { at: 0.58, lane: 2 },
  { at: 0.7, lane: 1 },
  { at: 0.82, lane: 0 },
  { at: 0.91, lane: 2 },
] as const;

function reveal(group: THREE.Group | null, visible: boolean, speed = 0.07, scale = 1) {
  if (!group) return;
  const target = visible ? scale : 0.001;
  const next = THREE.MathUtils.lerp(group.scale.x, target, speed);
  group.scale.setScalar(next);
  group.visible = next > 0.008;
}

function GlowNode({ color, position, scale = 1 }: { color: string; position: Vector3Tuple; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[0.11, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.8} metalness={0.55} roughness={0.18} />
      </mesh>
      <mesh scale={1.75}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  const { activeChapter, motionEnabled } = useExperience();
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );
    };
    const onPointerLeave = () => pointer.current.set(0, 0);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useFrame(() => {
    const mobile = size.width < 760;
    const targetZ = mobile ? 8.8 : activeChapter === 5 ? 8.6 : 8.05;
    const targetX = motionEnabled && !mobile ? pointer.current.x * 0.26 : 0;
    const targetY = motionEnabled ? pointer.current.y * 0.15 : 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.035);
    camera.lookAt(mobile ? 0.15 : 0.4, activeChapter === 5 ? -0.2 : 0, 0);
  });

  return null;
}

function AtmosphereController() {
  const { gl, scene } = useThree();
  const { activeChapter, activeProject } = useExperience();
  const palette = activeChapter === 2
    ? projectAtmospheres[activeProject] ?? colors.void
    : chapterAtmospheres[activeChapter] ?? colors.void;
  const target = useMemo(() => new THREE.Color(palette), [palette]);

  useFrame(() => {
    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(target, 0.025);
    }
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(target, 0.025);
    }
    const targetExposure = activeChapter === 2 || activeChapter === 5 ? 1.14 : 1.06;
    gl.toneMappingExposure = THREE.MathUtils.lerp(gl.toneMappingExposure, targetExposure, 0.025);
  });

  return null;
}

function SceneStage({ children }: { children: ReactNode }) {
  const stage = useRef<SceneGroup>(null);
  const { size } = useThree();
  const { activeChapter } = useExperience();

  useFrame(() => {
    if (!stage.current) return;
    const mobile = size.width < 760;
    const targetX = mobile ? 0.28 : activeChapter === 5 ? 1.55 : 1.78;
    const targetY = mobile ? (activeChapter === 0 ? -0.45 : -0.1) : 0;
    const targetScale = mobile ? 0.76 : 1;
    stage.current.position.x = THREE.MathUtils.lerp(stage.current.position.x, targetX, 0.045);
    stage.current.position.y = THREE.MathUtils.lerp(stage.current.position.y, targetY, 0.045);
    const nextScale = THREE.MathUtils.lerp(stage.current.scale.x, targetScale, 0.045);
    stage.current.scale.setScalar(nextScale);
  });

  return <group ref={stage}>{children}</group>;
}

function DeveloperReactor() {
  const group = useRef<SceneGroup>(null);
  const shell = useRef<THREE.Mesh>(null);
  const inner = useRef<SceneGroup>(null);
  const orbitRefs = useRef<Array<THREE.Group | null>>([]);
  const { activeChapter, motionEnabled, progress } = useExperience();
  const ribbon = useMemo<Vector3Tuple[]>(
    () => Array.from({ length: 90 }, (_, index) => {
      const t = (index / 89) * Math.PI * 4.2;
      const radius = 1.38 + Math.sin(t * 0.5) * 0.1;
      return [Math.cos(t) * radius, (index / 89 - 0.5) * 2.15, Math.sin(t) * radius];
    }),
    [],
  );
  const orbitColors = [colors.data, colors.iris, colors.teal, colors.lime];
  const processorPlates = useMemo(
    () => [
      { position: [0, 0, 1.03] as Vector3Tuple, rotation: [0, 0, 0] as Vector3Tuple },
      { position: [0, 0, -1.03] as Vector3Tuple, rotation: [0, Math.PI, 0] as Vector3Tuple },
      { position: [1.03, 0, 0] as Vector3Tuple, rotation: [0, Math.PI / 2, 0] as Vector3Tuple },
      { position: [-1.03, 0, 0] as Vector3Tuple, rotation: [0, -Math.PI / 2, 0] as Vector3Tuple },
      { position: [0, 1.03, 0] as Vector3Tuple, rotation: [-Math.PI / 2, 0, 0] as Vector3Tuple },
      { position: [0, -1.03, 0] as Vector3Tuple, rotation: [Math.PI / 2, 0, 0] as Vector3Tuple },
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const dominant = activeChapter <= 1 || activeChapter === 7;
    const targetScale = activeChapter === 1 ? 1.32 : dominant ? 1.12 : activeChapter === 6 ? 0.5 : 0.3;
    const targetX = dominant ? 0 : 2.35;
    const targetY = activeChapter === 7 ? -0.25 : dominant ? 0 : -1.48;
    const targetZ = dominant ? 0 : -1.9;
    const scale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.05);
    group.current.scale.setScalar(scale);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.045);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.045);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.045);

    if (motionEnabled) {
      group.current.rotation.y += delta * (0.1 + progress.current * 0.06);
      group.current.rotation.x = Math.sin(time * 0.31) * 0.07;
      if (shell.current) shell.current.rotation.z -= delta * 0.055;
      if (inner.current) inner.current.rotation.y -= delta * 0.22;
    }

    orbitRefs.current.forEach((orbit, index) => {
      if (!orbit) return;
      const exploded = activeChapter === 1 ? (index - 1.5) * 0.34 : 0;
      orbit.position.y = THREE.MathUtils.lerp(orbit.position.y, exploded, 0.06);
      if (motionEnabled) orbit.rotation.z += delta * (0.1 + index * 0.035) * (index % 2 ? -1 : 1);
    });
  });

  return (
    <group ref={group} rotation={[0.12, -0.38, -0.08]}>
      <group ref={inner}>
        <RoundedBox args={[1.18, 1.18, 1.18]} radius={0.16} smoothness={5} rotation={[0.62, 0.72, 0.18]}>
          <meshPhysicalMaterial color="#0C0E14" emissive={colors.iris} emissiveIntensity={0.26} metalness={0.92} roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} />
        </RoundedBox>
        <mesh rotation={[0.25, 0.45, 0]}>
          <octahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial color={colors.iris} emissive={colors.iris} emissiveIntensity={1.15} metalness={0.75} roughness={0.16} />
        </mesh>
        <mesh scale={0.56}>
          <icosahedronGeometry args={[0.7, 2]} />
          <meshBasicMaterial color={colors.mineral} wireframe transparent opacity={0.38} />
        </mesh>
      </group>

      <mesh ref={shell} scale={1.58} rotation={[0.2, 0.5, 0]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color={colors.data}
          emissive={colors.iris}
          emissiveIntensity={0.2}
          metalness={0.35}
          roughness={0.08}
          transmission={0.18}
          thickness={0.8}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Line points={ribbon} color={colors.data} lineWidth={1.25} transparent opacity={0.34} />

      {processorPlates.map(({ position, rotation }, index) => (
        <group key={index} position={position} rotation={rotation}>
          <RoundedBox args={[0.48, 0.22, 0.07]} radius={0.045} smoothness={3}>
            <meshStandardMaterial color="#171A22" metalness={0.88} roughness={0.2} />
          </RoundedBox>
          {[0, 1, 2].map((bar) => (
            <mesh key={bar} position={[-0.12 + bar * 0.12, 0, 0.042]}>
              <boxGeometry args={[0.07, 0.028, 0.012]} />
              <meshBasicMaterial color={index % 2 ? colors.lime : colors.data} />
            </mesh>
          ))}
        </group>
      ))}

      {orbitColors.map((color, index) => (
        <group
          key={color}
          ref={(node) => {
            orbitRefs.current[index] = node;
          }}
          rotation={[Math.PI / 2 + index * 0.22, 0.2 + index * 0.3, index * 0.2]}
        >
          <mesh>
            <torusGeometry args={[1.62 + index * 0.19, 0.018 + index * 0.004, 12, 128]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.6} metalness={0.4} roughness={0.2} />
          </mesh>
          <GlowNode color={color} position={[1.62 + index * 0.19, 0, 0]} scale={0.78 + index * 0.06} />
        </group>
      ))}

      <pointLight color={colors.iris} intensity={10} distance={7} decay={2} />
      <pointLight position={[0, 0, 1.4]} color={colors.data} intensity={5} distance={4} decay={2} />
    </group>
  );
}

function ByteCompanion() {
  const byte = useRef<SceneGroup>(null);
  const halo = useRef<THREE.Mesh>(null);
  const { activeChapter, gameActive, gameLane, gameResult, motionEnabled } = useExperience();

  useFrame((state, delta) => {
    if (!byte.current) return;
    const time = state.clock.elapsedTime;
    const laneX = gameActive || activeChapter === 5 ? (gameLane - 1) * 1.34 : 0;
    const chapterPositions: Vector3Tuple[] = [
      [-2.6, 1.5, 0.5],
      [-2.35, -1.5, 0.2],
      [2.55, 1.5, 0.4],
      [-2.45, 1.45, 0.35],
      [2.5, 1.35, 0.35],
      [laneX, -0.78, 1.82],
      [-2.45, -1.5, 0.4],
      [2.35, -1.4, 0.4],
    ];
    const target = chapterPositions[activeChapter] ?? chapterPositions[0];
    const shake = gameResult === "collision" ? Math.sin(time * 54) * 0.1 : 0;
    byte.current.position.x = THREE.MathUtils.lerp(byte.current.position.x, target[0] + shake, 0.08);
    byte.current.position.y = THREE.MathUtils.lerp(
      byte.current.position.y,
      target[1] + (motionEnabled && activeChapter !== 5 ? Math.sin(time * 1.9) * 0.1 : 0),
      0.08,
    );
    byte.current.position.z = THREE.MathUtils.lerp(byte.current.position.z, target[2], 0.08);
    const targetScale = activeChapter === 5 ? 0.72 : 0.52;
    const scale = THREE.MathUtils.lerp(byte.current.scale.x, targetScale, 0.08);
    byte.current.scale.setScalar(scale);
    if (motionEnabled) byte.current.rotation.y += delta * (activeChapter === 5 ? 0.12 : 0.55);
    if (halo.current && motionEnabled) halo.current.rotation.z += delta * 0.8;
  });

  return (
    <group ref={byte} position={[-2.6, 1.5, 0.5]} scale={0.52}>
      <RoundedBox args={[1.05, 0.72, 0.74]} radius={0.24} smoothness={6}>
        <meshPhysicalMaterial color="#11151D" metalness={0.86} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} />
      </RoundedBox>
      <mesh position={[0, 0.02, 0.38]} scale={[0.58, 0.24, 0.08]}>
        <capsuleGeometry args={[0.26, 0.42, 8, 18]} />
        <meshStandardMaterial color={colors.data} emissive={colors.data} emissiveIntensity={3.6} metalness={0.28} roughness={0.12} />
      </mesh>
      <mesh ref={halo} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.032, 10, 64]} />
        <meshStandardMaterial color={colors.lime} emissive={colors.lime} emissiveIntensity={3} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.72, 0, 0]} rotation={[0, 0, side * -0.2]}>
          <RoundedBox args={[0.55, 0.12, 0.34]} radius={0.05} smoothness={3}>
            <meshStandardMaterial color="#1A1E27" metalness={0.9} roughness={0.16} />
          </RoundedBox>
          <mesh position={[side * 0.21, 0, -0.18]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color={colors.iris} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.5, 20, 1, true]} />
        <meshBasicMaterial color={colors.teal} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color={colors.data} intensity={5} distance={3.5} />
    </group>
  );
}

function OrbitalOrganization({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const rings = useRef<Array<THREE.Group | null>>([]);
  const nodes = useMemo(
    () => Array.from({ length: 18 }, (_, index) => {
      const ring = index % 3;
      const angle = (index / 6) * Math.PI * 2 + ring * 0.38;
      const radius = 1.15 + ring * 0.63;
      return {
        color: ring === 0 ? colors.mineral : ring === 1 ? colors.data : colors.iris,
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, (ring - 1) * 0.38] as Vector3Tuple,
        ring,
      };
    }),
    [],
  );

  useFrame((state, delta) => {
    reveal(group.current, visible, 0.07, 1.12);
    if (!visible || !group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.16;
    rings.current.forEach((ring, index) => {
      if (ring) ring.rotation.z += delta * (0.08 + index * 0.04) * (index === 1 ? -1 : 1);
    });
  });

  return (
    <group ref={group} rotation={[0.1, -0.22, -0.08]}>
      <mesh>
        <sphereGeometry args={[0.78, 36, 36]} />
        <meshPhysicalMaterial color="#151722" emissive={colors.iris} emissiveIntensity={0.42} metalness={0.88} roughness={0.16} clearcoat={1} />
      </mesh>
      <mesh scale={1.04}>
        <icosahedronGeometry args={[0.78, 2]} />
        <meshBasicMaterial color={colors.iris} wireframe transparent opacity={0.25} />
      </mesh>
      <RoundedBox args={[0.86, 0.32, 0.16]} radius={0.07} smoothness={4} position={[0, 0, 0.76]}>
        <meshStandardMaterial color="#202431" emissive={colors.data} emissiveIntensity={0.3} metalness={0.7} roughness={0.2} />
      </RoundedBox>
      {[1.2, 1.82, 2.44].map((radius, index) => (
        <group
          key={radius}
          ref={(node) => {
            rings.current[index] = node;
          }}
          rotation={[Math.PI / 2 + index * 0.32, index * 0.38, 0]}
        >
          <mesh>
            <torusGeometry args={[radius, 0.025, 12, 128]} />
            <meshStandardMaterial color={[colors.mineral, colors.data, colors.iris][index]} emissive={[colors.mineral, colors.data, colors.iris][index]} emissiveIntensity={1.7} />
          </mesh>
        </group>
      ))}
      {nodes.map((node, index) => (
        <group key={index} position={node.position}>
          <GlowNode color={node.color} position={[0, 0, 0]} scale={node.ring === 0 ? 1.15 : 0.82} />
          {index % 3 === 0 ? (
            <RoundedBox args={[0.42, 0.16, 0.08]} radius={0.035} smoothness={3} position={[0, -0.2, 0]}>
              <meshStandardMaterial color="#171A22" emissive={node.color} emissiveIntensity={0.26} metalness={0.75} roughness={0.18} />
            </RoundedBox>
          ) : null}
        </group>
      ))}
      <pointLight color={colors.iris} intensity={9} distance={7} />
    </group>
  );
}

function PulseNetwork({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const core = useRef<THREE.Mesh>(null);
  const packetRefs = useRef<Array<THREE.Mesh | null>>([]);
  const nodes = useMemo<Vector3Tuple[]>(
    () => [
      [-2.1, 1.1, -0.2], [-1.25, 1.75, 0.28], [-0.2, 1.25, -0.35], [1.05, 1.75, 0.12],
      [2.15, 0.75, -0.12], [1.8, -0.75, 0.3], [0.65, -1.6, -0.25], [-0.7, -1.35, 0.24],
      [-1.9, -0.45, -0.2], [0, 0, 0.35],
    ],
    [],
  );
  const ecg = useMemo<Vector3Tuple[]>(
    () => Array.from({ length: 80 }, (_, index) => {
      const x = -2.5 + (index / 79) * 5;
      const pulse = index % 20;
      const y = pulse === 8 ? 0.55 : pulse === 9 ? -0.42 : pulse === 10 ? 0.22 : 0;
      return [x, y, 0.9];
    }),
    [],
  );

  useFrame((state) => {
    reveal(group.current, visible, 0.07, 1.1);
    if (!visible || !group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.18) * 0.15;
    if (core.current) core.current.scale.setScalar(1 + Math.sin(time * 2.4) * 0.075);
    packetRefs.current.forEach((packet, index) => {
      if (!packet) return;
      const from = nodes[index % (nodes.length - 1)];
      const to = nodes[(index + 3) % (nodes.length - 1)];
      const t = (time * (0.2 + index * 0.025) + index * 0.19) % 1;
      packet.position.set(
        THREE.MathUtils.lerp(from[0], to[0], t),
        THREE.MathUtils.lerp(from[1], to[1], t),
        THREE.MathUtils.lerp(from[2], to[2], t),
      );
    });
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <torusKnotGeometry args={[0.62, 0.22, 110, 16, 2, 3]} />
        <meshPhysicalMaterial color={colors.teal} emissive={colors.teal} emissiveIntensity={1.25} metalness={0.6} roughness={0.16} clearcoat={1} />
      </mesh>
      <mesh scale={1.3} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.025, 10, 80]} />
        <meshBasicMaterial color={colors.data} transparent opacity={0.65} />
      </mesh>
      <Line points={nodes} color={colors.teal} lineWidth={1.5} transparent opacity={0.52} />
      <Line points={ecg} color={colors.lime} lineWidth={1.8} transparent opacity={0.72} />
      {nodes.slice(0, -1).map((position, index) => (
        <group key={index} position={position}>
          <GlowNode color={index % 3 === 0 ? colors.lime : colors.teal} position={[0, 0, 0]} scale={index % 3 === 0 ? 1.18 : 0.86} />
          <mesh rotation={[Math.PI / 2, 0, 0]} scale={1 + (index % 2) * 0.35}>
            <torusGeometry args={[0.21, 0.012, 8, 40]} />
            <meshBasicMaterial color={colors.data} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 6 }, (_, index) => (
        <mesh key={index} ref={(node) => { packetRefs.current[index] = node; }}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshBasicMaterial color={colors.lime} />
        </mesh>
      ))}
      <pointLight color={colors.teal} intensity={10} distance={7} />
    </group>
  );
}

function QuestionFoundry({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const crystal = useRef<THREE.Mesh>(null);
  const scanRing = useRef<THREE.Mesh>(null);
  const cells = useMemo(
    () => Array.from({ length: 48 }, (_, index) => ({
      active: index % 7 === 0 || index % 11 === 0,
      position: [((index % 8) - 3.5) * 0.46, (Math.floor(index / 8) - 2.5) * 0.46, Math.sin(index * 1.6) * 0.12] as Vector3Tuple,
      scale: 0.12 + (index % 4) * 0.01,
    })),
    [],
  );

  useFrame((state, delta) => {
    reveal(group.current, visible, 0.07, 1.12);
    if (!visible || !group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = -0.18 + Math.sin(time * 0.2) * 0.14;
    if (crystal.current) {
      crystal.current.rotation.x += delta * 0.28;
      crystal.current.rotation.y -= delta * 0.36;
      crystal.current.position.y = 0.15 + Math.sin(time * 1.4) * 0.12;
    }
    if (scanRing.current) scanRing.current.position.y = Math.sin(time * 0.8) * 1.35;
  });

  return (
    <group ref={group} rotation={[0.12, -0.18, -0.08]}>
      <RoundedBox args={[4.15, 3.15, 0.16]} radius={0.16} smoothness={5} position={[0, 0, -0.48]}>
        <meshStandardMaterial color="#10131A" metalness={0.72} roughness={0.24} />
      </RoundedBox>
      {cells.map((cell, index) => (
        <RoundedBox key={index} args={[cell.scale * 2.35, cell.scale * 2.35, 0.18]} radius={0.035} smoothness={3} position={cell.position}>
          <meshStandardMaterial
            color={cell.active ? colors.lime : "#242A32"}
            emissive={cell.active ? colors.lime : colors.teal}
            emissiveIntensity={cell.active ? 2.2 : 0.08}
            metalness={0.68}
            roughness={0.25}
          />
        </RoundedBox>
      ))}
      <mesh ref={crystal} position={[0, 0.15, 0.82]}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshPhysicalMaterial color={colors.iris} emissive={colors.iris} emissiveIntensity={1.4} metalness={0.6} roughness={0.12} clearcoat={1} />
      </mesh>
      <mesh ref={scanRing} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.48]}>
        <torusGeometry args={[2.35, 0.025, 10, 100]} />
        <meshStandardMaterial color={colors.lime} emissive={colors.lime} emissiveIntensity={3} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.42, 1.55, 3.1, 32, 1, true]} />
        <meshBasicMaterial color={colors.iris} transparent opacity={0.055} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {[0, 1, 2].map((index) => (
        <RoundedBox key={index} args={[0.75, 0.42, 0.08]} radius={0.07} smoothness={4} position={[2.45 + index * 0.28, 0.65 - index * 0.58, 0.3 + index * 0.12]} rotation={[0, -0.15, -0.08]}>
          <meshStandardMaterial color="#1B2028" emissive={colors.data} emissiveIntensity={0.22} metalness={0.7} roughness={0.2} />
        </RoundedBox>
      ))}
      <pointLight position={[0, 0, 1.1]} color={colors.iris} intensity={9} distance={6} />
    </group>
  );
}

function LivingGrid({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const scanner = useRef<THREE.Mesh>(null);
  const buildings = useMemo(
    () => Array.from({ length: 40 }, (_, index) => ({
      accent: index % 7 === 0 || index % 11 === 0,
      height: 0.35 + ((index * 7) % 12) * 0.11,
      position: [((index % 8) - 3.5) * 0.48, 0, (Math.floor(index / 8) - 2) * 0.52] as Vector3Tuple,
    })),
    [],
  );

  useFrame((state) => {
    reveal(group.current, visible, 0.07, 1.08);
    if (!visible || !group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = -0.52 + Math.sin(time * 0.16) * 0.08;
    if (scanner.current) scanner.current.position.z = -1.6 + ((time * 0.55) % 3.2);
  });

  return (
    <group ref={group} position={[0, -1.08, 0]} rotation={[0.16, -0.52, 0]}>
      <RoundedBox args={[4.55, 0.18, 3.45]} radius={0.14} smoothness={4} position={[0, -0.12, 0]}>
        <meshPhysicalMaterial color="#10131A" metalness={0.88} roughness={0.2} clearcoat={1} />
      </RoundedBox>
      {buildings.map((building, index) => (
        <group key={index} position={[building.position[0], building.height / 2, building.position[2]]}>
          <RoundedBox args={[0.34, building.height, 0.36]} radius={0.045} smoothness={3}>
            <meshStandardMaterial
              color={building.accent ? colors.coral : "#1A1F28"}
              emissive={building.accent ? colors.coral : colors.data}
              emissiveIntensity={building.accent ? 1.35 : 0.08}
              metalness={0.72}
              roughness={0.28}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.185]}>
            <boxGeometry args={[0.18, Math.max(0.08, building.height * 0.58), 0.012]} />
            <meshBasicMaterial color={building.accent ? colors.lime : colors.data} transparent opacity={building.accent ? 0.72 : 0.24} />
          </mesh>
        </group>
      ))}
      <mesh ref={scanner} position={[0, 0.88, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.35, 0.025]} />
        <meshBasicMaterial color={colors.coral} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <Line points={[[-2.1, 0.02, -1.55], [-2.1, 0.02, 1.55], [2.1, 0.02, 1.55], [2.1, 0.02, -1.55], [-2.1, 0.02, -1.55]]} color={colors.coral} lineWidth={1.2} transparent opacity={0.45} />
      <pointLight position={[0, 2, 0]} color={colors.coral} intensity={8} distance={7} />
    </group>
  );
}

function CapabilityConstellation({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const hub = useRef<THREE.Mesh>(null);
  const nodes = useMemo<Vector3Tuple[]>(
    () => [
      [-2.35, 1.25, 0], [-1.1, 1.82, -0.35], [0.28, 1.72, 0.35], [1.65, 1.25, -0.2],
      [2.35, 0.1, 0.28], [1.7, -1.22, -0.25], [0.45, -1.68, 0.32], [-0.95, -1.48, -0.2],
      [-2.2, -0.62, 0.25], [0, 0, 0.65],
    ],
    [],
  );

  useFrame((state, delta) => {
    reveal(group.current, visible, 0.07, 1.1);
    if (!visible || !group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    if (hub.current) {
      hub.current.rotation.x += delta * 0.18;
      hub.current.rotation.y -= delta * 0.22;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={hub}>
        <dodecahedronGeometry args={[0.72, 1]} />
        <meshPhysicalMaterial color="#151924" emissive={colors.data} emissiveIntensity={0.7} metalness={0.82} roughness={0.18} clearcoat={1} />
      </mesh>
      <mesh scale={1.06}>
        <dodecahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial color={colors.data} wireframe transparent opacity={0.5} />
      </mesh>
      {nodes.slice(0, -1).map((position, index) => (
        <group key={index}>
          <Line points={[[0, 0, 0], position]} color={index % 2 ? colors.data : colors.iris} lineWidth={1.15} transparent opacity={0.4} />
          <group position={position}>
            <RoundedBox args={[0.58, 0.24, 0.16]} radius={0.06} smoothness={4}>
              <meshStandardMaterial color="#171B24" emissive={index % 2 ? colors.data : colors.iris} emissiveIntensity={0.36} metalness={0.75} roughness={0.18} />
            </RoundedBox>
            <GlowNode color={index % 3 === 0 ? colors.lime : index % 2 ? colors.data : colors.iris} position={[0, 0, 0.12]} scale={0.6} />
          </group>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.58, 0.018, 8, 110]} />
        <meshBasicMaterial color={colors.data} transparent opacity={0.25} />
      </mesh>
      <pointLight color={colors.data} intensity={9} distance={7} />
    </group>
  );
}

function AIPipeline({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const packet = useRef<THREE.Mesh>(null);
  const stageRefs = useRef<Array<THREE.Group | null>>([]);
  const positions = [-2.25, -0.75, 0.75, 2.25];
  const stageColors = [colors.data, colors.teal, colors.iris, colors.lime];

  useFrame((state, delta) => {
    reveal(group.current, visible, 0.07, 1.05);
    if (!visible || !group.current) return;
    const time = state.clock.elapsedTime;
    if (packet.current) {
      packet.current.position.x = -2.4 + ((time * 0.55) % 1) * 4.8;
      packet.current.position.y = Math.sin(time * 3) * 0.06;
    }
    stageRefs.current.forEach((stage, index) => {
      if (!stage) return;
      stage.rotation.y += delta * (0.08 + index * 0.035) * (index % 2 ? -1 : 1);
    });
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <RoundedBox args={[5.6, 0.2, 1.15]} radius={0.1} smoothness={4} position={[0, -0.82, 0]}>
        <meshStandardMaterial color="#10131A" metalness={0.86} roughness={0.2} />
      </RoundedBox>
      <Line points={positions.map((x) => [x, -0.18, 0.42] as Vector3Tuple)} color={colors.lime} lineWidth={2.2} transparent opacity={0.68} />
      {positions.map((x, index) => (
        <group key={x} position={[x, 0, 0]}>
          <group ref={(node) => { stageRefs.current[index] = node; }}>
            {index === 0 ? (
              <mesh><dodecahedronGeometry args={[0.48, 0]} /><meshPhysicalMaterial color={stageColors[index]} emissive={stageColors[index]} emissiveIntensity={1.25} metalness={0.65} roughness={0.18} /></mesh>
            ) : null}
            {index === 1 ? (
              <mesh><octahedronGeometry args={[0.58, 1]} /><meshPhysicalMaterial color={stageColors[index]} emissive={stageColors[index]} emissiveIntensity={1.2} metalness={0.65} roughness={0.18} /></mesh>
            ) : null}
            {index === 2 ? (
              <mesh><icosahedronGeometry args={[0.56, 2]} /><meshPhysicalMaterial color={stageColors[index]} emissive={stageColors[index]} emissiveIntensity={1.2} metalness={0.65} roughness={0.18} /></mesh>
            ) : null}
            {index === 3 ? (
              <mesh><torusKnotGeometry args={[0.4, 0.13, 90, 12]} /><meshPhysicalMaterial color={stageColors[index]} emissive={stageColors[index]} emissiveIntensity={1.35} metalness={0.65} roughness={0.16} /></mesh>
            ) : null}
          </group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.72, 0.022, 10, 64]} />
            <meshBasicMaterial color={stageColors[index]} transparent opacity={0.56} />
          </mesh>
          <RoundedBox args={[1.05, 0.25, 0.65]} radius={0.08} smoothness={4} position={[0, -0.82, 0]}>
            <meshStandardMaterial color="#171B24" emissive={stageColors[index]} emissiveIntensity={0.18} metalness={0.74} roughness={0.22} />
          </RoundedBox>
        </group>
      ))}
      <mesh ref={packet} position={[-2.4, -0.18, 0.42]}>
        <sphereGeometry args={[0.085, 14, 14]} />
        <meshStandardMaterial color={colors.mineral} emissive={colors.lime} emissiveIntensity={4} />
      </mesh>
      <pointLight position={[0, 0.2, 1]} color={colors.iris} intensity={8} distance={7} />
    </group>
  );
}

function PacketRunWorld({ visible }: { visible: boolean }) {
  const group = useRef<SceneGroup>(null);
  const tileRefs = useRef<Array<THREE.Mesh | null>>([]);
  const obstacleRefs = useRef<Array<THREE.Group | null>>([]);
  const { gameActive, gameIntegrity, gameProgress, gameResult, motionEnabled } = useExperience();

  useFrame((state) => {
    reveal(group.current, visible, 0.07, 1);
    if (!visible || !group.current) return;
    const time = state.clock.elapsedTime;
    const travel = gameActive ? gameProgress * 56 : time * 0.5;
    tileRefs.current.forEach((tile, index) => {
      if (!tile) return;
      tile.position.z = 2.2 - ((index * 0.78 + travel) % 13.5);
    });
    obstacleRefs.current.forEach((obstacle, index) => {
      if (!obstacle) return;
      const data = gameObstacles[index];
      obstacle.position.z = 1.45 - (data.at - gameProgress) * 15.5;
      obstacle.rotation.y = time * (0.45 + index * 0.025);
      const gone = obstacle.position.z > 2.6 || obstacle.position.z < -13.2;
      obstacle.visible = gameActive && !gone;
    });
    if (gameResult === "collision") {
      group.current.position.x = Math.sin(time * 55) * 0.1;
    } else {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 0, 0.2);
    }
  });

  const integrityColor = gameIntegrity > 50 ? colors.lime : gameIntegrity > 25 ? colors.coral : "#FF314F";

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <mesh position={[0, -1.42, -4.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.35, 14]} />
        <meshPhysicalMaterial color="#0B0E14" emissive={colors.iris} emissiveIntensity={0.08} metalness={0.78} roughness={0.24} />
      </mesh>
      {[-1.34, 0, 1.34].map((x) => (
        <group key={x}>
          <mesh position={[x, -1.34, -4.6]}>
            <boxGeometry args={[0.035, 0.035, 14]} />
            <meshStandardMaterial color={colors.data} emissive={colors.data} emissiveIntensity={2.4} transparent opacity={0.66} />
          </mesh>
          <mesh position={[x, 1.05, -5]}>
            <boxGeometry args={[0.016, 4.8, 0.016]} />
            <meshBasicMaterial color={colors.data} transparent opacity={0.12} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 18 }, (_, index) => (
        <mesh key={index} ref={(node) => { tileRefs.current[index] = node; }} position={[0, -1.37, 2.2 - index * 0.78]}>
          <boxGeometry args={[3.88, 0.025, 0.44]} />
          <meshBasicMaterial color={index % 3 === 0 ? colors.iris : colors.data} transparent opacity={index % 3 === 0 ? 0.14 : 0.055} />
        </mesh>
      ))}
      {[-1.5, -4.5, -7.5, -10.5].map((z, index) => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[2.62, 0.024, 10, 80]} />
          <meshStandardMaterial color={index % 2 ? colors.iris : colors.data} emissive={index % 2 ? colors.iris : colors.data} emissiveIntensity={1.8} transparent opacity={0.45} />
        </mesh>
      ))}
      {gameObstacles.map((obstacle, index) => (
        <group
          key={obstacle.at}
          ref={(node) => { obstacleRefs.current[index] = node; }}
          position={[(obstacle.lane - 1) * 1.34, -0.72, 1.45 - obstacle.at * 15.5]}
        >
          <mesh>
            <dodecahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color={colors.coral} emissive={colors.coral} emissiveIntensity={2.3} metalness={0.62} roughness={0.2} />
          </mesh>
          <mesh scale={1.28}>
            <icosahedronGeometry args={[0.34, 0]} />
            <meshBasicMaterial color="#FF314F" wireframe transparent opacity={0.72} />
          </mesh>
          {[0, 1, 2].map((spike) => (
            <mesh key={spike} rotation={[spike * 1.1, spike * 0.7, 0]}>
              <torusGeometry args={[0.52, 0.018, 8, 36]} />
              <meshBasicMaterial color={colors.coral} transparent opacity={0.55} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 1.72, -7]}>
        <boxGeometry args={[gameIntegrity / 24, 0.035, 0.035]} />
        <meshStandardMaterial color={integrityColor} emissive={integrityColor} emissiveIntensity={3} />
      </mesh>
      <Sparkles count={motionEnabled ? 55 : 22} scale={[5.2, 4, 14]} position={[0, 0, -5]} size={1.1} speed={gameActive ? 1.8 : 0.2} color={colors.data} opacity={0.55} />
      <pointLight position={[0, 0, 1]} color={integrityColor} intensity={gameActive ? 8 : 3} distance={6} />
    </group>
  );
}

function ExperienceScene() {
  const { activeChapter, activeProject, quality } = useExperience();
  const effectsEnabled = quality === "high" || quality === "balanced";

  return (
    <>
      <color attach="background" args={[colors.void]} />
      <fog attach="fog" args={[colors.void, 7.5, 17]} />
      <AtmosphereController />
      <hemisphereLight args={["#9CB4FF", "#090B10", 0.55]} />
      <directionalLight position={[-4, 6, 5]} intensity={2.4} color={colors.mineral} />
      <spotLight position={[4, 5, 5]} intensity={7} angle={0.42} penumbra={0.8} color={colors.iris} distance={14} />
      <pointLight position={[3, -1, 3]} intensity={6} distance={10} color={colors.data} />

      <Environment resolution={quality === "high" ? 192 : 96}>
        <Lightformer form="rect" intensity={3.5} color="#DDE7FF" position={[0, 5, -3]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={4} color={colors.iris} position={[5, 1, 2]} rotation={[0, -Math.PI / 2, 0]} scale={3} />
        <Lightformer form="rect" intensity={2.8} color={colors.teal} position={[-4, -1, 3]} rotation={[0, Math.PI / 2, 0]} scale={[4, 1, 1]} />
      </Environment>

      <Grid
        position={[0, -2.35, -2.5]}
        args={[22, 22]}
        cellColor="#1B2530"
        cellSize={0.48}
        cellThickness={0.35}
        fadeDistance={15}
        fadeStrength={2.8}
        infiniteGrid
        sectionColor="#38475B"
        sectionSize={2.4}
        sectionThickness={0.65}
      />
      <Sparkles count={quality === "high" ? 115 : 58} scale={[11, 7, 8]} size={1.1} speed={0.16} color={colors.data} opacity={0.3} />

      <SceneStage>
        <DeveloperReactor />
        <ByteCompanion />
        <OrbitalOrganization visible={activeChapter === 2 && activeProject === 0} />
        <PulseNetwork visible={activeChapter === 2 && activeProject === 1} />
        <QuestionFoundry visible={activeChapter === 2 && activeProject === 2} />
        <LivingGrid visible={activeChapter === 2 && activeProject === 3} />
        <CapabilityConstellation visible={activeChapter === 3} />
        <AIPipeline visible={activeChapter === 4} />
        <PacketRunWorld visible={activeChapter === 5} />
      </SceneStage>

      {quality !== "static" ? (
        <ContactShadows position={[1.6, -2.28, 0]} opacity={0.42} scale={8} blur={2.8} far={6} color="#000000" />
      ) : null}
      <CameraRig />

      {effectsEnabled ? (
        <EffectComposer multisampling={quality === "high" ? 2 : 0}>
          <Bloom intensity={0.7} luminanceThreshold={0.72} luminanceSmoothing={0.36} mipmapBlur />
          <Vignette eskil={false} offset={0.08} darkness={0.62} />
        </EffectComposer>
      ) : null}
    </>
  );
}

export function ExperienceCanvas() {
  const { motionEnabled, quality } = useExperience();
  const dpr: [number, number] = quality === "high" ? [1, 1.5] : [1, 1.25];

  return (
    <div className="experience-canvas" aria-hidden="true">
      <Canvas
        camera={{ fov: 42, near: 0.1, far: 45, position: [0, 0, 8.05] }}
        dpr={dpr}
        fallback={<div className="webgl-fallback"><strong>3D system view unavailable</strong><span>The complete portfolio remains available below.</span></div>}
        frameloop={motionEnabled ? "always" : "demand"}
        gl={{ alpha: false, antialias: quality !== "reduced", powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
        }}
      >
        <ExperienceScene />
      </Canvas>
      <div className="canvas-vignette" />
      <div className="canvas-chromatic-edge" />
    </div>
  );
}
