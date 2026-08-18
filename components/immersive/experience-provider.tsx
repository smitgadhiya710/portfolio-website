"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { chapters, projects } from "@/lib/content";

export type QualityTier = "high" | "balanced" | "reduced" | "static";
export type GameResult = "idle" | "success" | "collision" | "failed";

type ExperienceContextValue = {
  activeChapter: number;
  activeProject: number;
  gameActive: boolean;
  gameIntegrity: number;
  gameLane: number;
  gameProgress: number;
  gameProgressRef: MutableRefObject<number>;
  gameResult: GameResult;
  gameScore: number;
  motionEnabled: boolean;
  moveGameLane: (direction: number) => void;
  progress: MutableRefObject<number>;
  quality: QualityTier;
  soundEnabled: boolean;
  startGame: () => void;
  stopGame: () => void;
  toggleMotion: () => void;
  toggleSound: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

function getQualityTier(): QualityTier {
  if (typeof window === "undefined") {
    return "balanced";
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;

  if (reducedMotion) return "static";
  if (memory <= 4 || cores <= 4) return "reduced";
  if (window.innerWidth >= 1440 && memory >= 8 && cores >= 12) return "high";
  return "balanced";
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const progress = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [quality, setQuality] = useState<QualityTier>("balanced");
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [gameIntegrity, setGameIntegrity] = useState(100);
  const [gameLane, setGameLane] = useState(1);
  const [gameProgress, setGameProgress] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult>("idle");
  const [gameScore, setGameScore] = useState(0);
  const gameLaneRef = useRef(1);
  const gameProgressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const nextQuality = getQualityTier();
    setQuality(nextQuality);
    setMotionEnabled(nextQuality !== "static");

    let chapterPoints: number[] = [];
    let projectPoints: number[] = [];
    let resizeFrame = 0;
    let disposed = false;

    const measurePoints = () => {
      chapterPoints = chapters.map(({ href }) => {
        const element = document.querySelector<HTMLElement>(href);
        return element ? element.getBoundingClientRect().top + window.scrollY : 0;
      });
      projectPoints = projects.map((project) => {
        const element = document.querySelector<HTMLElement>(`#project-${project.slug}`);
        return element ? element.getBoundingClientRect().top + window.scrollY : 0;
      });
    };

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = scrollable > 0 ? window.scrollY / scrollable : 0;

      const scrollLine = window.scrollY + window.innerHeight * 0.38;
      let nextChapter = 0;
      chapterPoints.forEach((point, index) => {
        if (scrollLine >= point) nextChapter = index;
      });
      setActiveChapter((current) => (current === nextChapter ? current : nextChapter));

      if (nextChapter === 2) {
        let nextProject = 0;
        projectPoints.forEach((point, index) => {
          if (scrollLine >= point) nextProject = index;
        });
        setActiveProject((current) => (current === nextProject ? current : nextProject));
      }
    };

    const updateLayout = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        measurePoints();
        updateProgress();
      });
    };

    measurePoints();
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: updateProgress,
      onRefresh: updateLayout,
    });

    updateProgress();
    window.addEventListener("resize", updateLayout, { passive: true });
    void document.fonts.ready.then(() => {
      if (!disposed) updateLayout();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(resizeFrame);
      trigger.kill();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  useEffect(() => {
    gameLaneRef.current = gameLane;
  }, [gameLane]);

  const moveLane = useCallback((direction: number) => {
    setGameLane((lane) => Math.max(0, Math.min(2, lane + direction)));
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowLeft", "a", "A"].includes(event.key)) {
        event.preventDefault();
        moveLane(-1);
      }
      if (["ArrowRight", "d", "D"].includes(event.key)) {
        event.preventDefault();
        moveLane(1);
      }
      if (event.key === "Escape") {
        setGameActive(false);
        setGameProgress(0);
        gameProgressRef.current = 0;
        setGameIntegrity(100);
        setGameResult("idle");
        setGameScore(0);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameActive, moveLane]);

  useEffect(() => {
    if (!gameActive) return;

    const startedAt = performance.now();
    let animationFrame = 0;
    const duration = 25000;
    const obstacles = [
      { at: 0.12, lane: 0 },
      { at: 0.23, lane: 2 },
      { at: 0.35, lane: 1 },
      { at: 0.47, lane: 0 },
      { at: 0.58, lane: 2 },
      { at: 0.7, lane: 1 },
      { at: 0.82, lane: 0 },
      { at: 0.91, lane: 2 },
    ];
    const passed = new Set<number>();
    let bonus = 0;
    let integrity = 100;
    let collisionTimeout = 0;
    let pausedAt: number | null = null;
    let pausedDuration = 0;
    let lastUiUpdate = 0;

    const onVisibilityChange = () => {
      if (document.hidden) {
        pausedAt = performance.now();
      } else if (pausedAt !== null) {
        pausedDuration += performance.now() - pausedAt;
        pausedAt = null;
      }
    };

    const tick = (now: number) => {
      if (document.hidden) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      const nextProgress = Math.min(1, (now - startedAt - pausedDuration) / duration);
      gameProgressRef.current = nextProgress;

      obstacles.forEach((obstacle, index) => {
        if (!passed.has(index) && nextProgress >= obstacle.at) {
          passed.add(index);
          if (gameLaneRef.current === obstacle.lane) {
            integrity = Math.max(0, integrity - 25);
            setGameIntegrity(integrity);
            setGameResult("collision");
            window.clearTimeout(collisionTimeout);
            collisionTimeout = window.setTimeout(
              () => setGameResult((result) => (result === "collision" ? "idle" : result)),
              620,
            );
          } else {
            bonus += 275;
          }
        }
      });

      if (nextProgress >= 1 || now - lastUiUpdate >= 100) {
        lastUiUpdate = now;
        setGameProgress(nextProgress);
        setGameScore(Math.round(nextProgress * 3200) + bonus);
      }

      if (integrity <= 0) {
        setGameResult("failed");
        setGameActive(false);
        return;
      }

      if (nextProgress >= 1) {
        setGameResult("success");
        setGameActive(false);
        return;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    animationFrame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(collisionTimeout);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [gameActive]);

  const startGame = useCallback(() => {
    setGameProgress(0);
    gameProgressRef.current = 0;
    setGameIntegrity(100);
    setGameLane(1);
    setGameResult("idle");
    setGameScore(0);
    setGameActive(true);
  }, []);

  const stopGame = useCallback(() => {
    setGameActive(false);
    setGameProgress(0);
    gameProgressRef.current = 0;
    setGameIntegrity(100);
    setGameResult("idle");
    setGameScore(0);
  }, []);

  const value = useMemo(
    () => ({
      activeChapter,
      activeProject,
      gameActive,
      gameIntegrity,
      gameLane,
      gameProgress,
      gameProgressRef,
      gameResult,
      gameScore,
      motionEnabled,
      moveGameLane: moveLane,
      progress,
      quality,
      soundEnabled,
      startGame,
      stopGame,
      toggleMotion: () => setMotionEnabled((enabled) => !enabled),
      toggleSound: () => setSoundEnabled((enabled) => !enabled),
    }),
    [
      activeChapter,
      activeProject,
      gameActive,
      gameIntegrity,
      gameLane,
      gameProgress,
      gameResult,
      gameScore,
      motionEnabled,
      moveLane,
      quality,
      soundEnabled,
      startGame,
      stopGame,
    ],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }
  return context;
}
