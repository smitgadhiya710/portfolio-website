"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Network,
  Play,
  Radio,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ExperienceCanvas } from "@/components/immersive/experience-canvas";
import {
  ExperienceProvider,
  useExperience,
} from "@/components/immersive/experience-provider";
import {
  capabilityChains,
  chapters,
  contact,
  education,
  experience,
  navItems,
  pipelineStages,
  projects,
  stackLayers,
} from "@/lib/content";

function ExperienceHeader() {
  const { activeChapter, motionEnabled, quality, soundEnabled, toggleMotion, toggleSound } = useExperience();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Smit Gadhiya, back to top">
          <span className="brand-mark">SG</span>
          <span className="brand-copy">
            <strong>Smit Gadhiya</strong>
            <small>{chapters[activeChapter]?.label ?? "System online"}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <span className="quality-pill" title="Automatically selected rendering quality">
            {quality}
          </span>
          <button className="icon-button" type="button" onClick={toggleMotion} aria-pressed={!motionEnabled} aria-label={motionEnabled ? "Pause motion" : "Resume motion"}>
            {motionEnabled ? <CirclePause size={17} /> : <CirclePlay size={17} />}
          </button>
          <button className="icon-button" type="button" onClick={toggleSound} aria-pressed={soundEnabled} aria-label={soundEnabled ? "Mute sound" : "Enable sound"}>
            {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <a className="availability-link" href="#contact"><span />Available</a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <span className="site-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        {navItems.map((item, index) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>{item.label}<ChevronRight size={20} />
          </a>
        ))}
      </div>
    </>
  );
}

function ChapterRail() {
  const { activeChapter } = useExperience();

  return (
    <nav className="chapter-rail" aria-label="Experience chapters">
      {chapters.map((chapter, index) => (
        <a key={chapter.href} href={chapter.href} className={activeChapter === index ? "is-active" : ""} aria-label={`Jump to ${chapter.label}`}>
          <span>{String(index).padStart(2, "0")}</span>
          <i />
          <em>{chapter.label}</em>
        </a>
      ))}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="hero chapter-section" aria-labelledby="hero-title">
      <div className="hero-grid grid-guides" />
      <div className="hero-copy">
        <p className="eyebrow"><Radio size={14} /> Full-stack developer · AI systems builder</p>
        <h1 id="hero-title"><span>Full stack.</span><span className="outline-text">Full depth.</span></h1>
        <p className="hero-lede">
          I engineer expressive product interfaces, resilient backend systems, and useful AI workflows—then connect them into products that hold up in the real world.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">Enter the work <ArrowDown size={17} /></a>
          <a className="button button-quiet" href={`mailto:${contact.email}`}>Start a conversation <ArrowUpRight size={17} /></a>
        </div>
      </div>

      <div className="hero-status" aria-label="System status">
        <span>SCENE 00 / WAKE</span>
        <span>WEBGL · LIVE</span>
        <span>SCROLL TO DEPLOY</span>
      </div>

      <a className="scroll-cue" href="#stack"><span>Explore system</span><i><ArrowDown size={14} /></i></a>
    </section>
  );
}

function StackChapter() {
  const [activeLayer, setActiveLayer] = useState(0);
  const selected = stackLayers[activeLayer];

  return (
    <section id="stack" className="stack-chapter chapter-section" aria-labelledby="stack-title">
      <div className="chapter-sticky split-layout">
        <div className="chapter-copy">
          <p className="section-index">01 / COMPLETE STACK</p>
          <h2 id="stack-title">One product.<br />Every layer intentional.</h2>
          <p className="section-lede">The glowing core stays with you because the work does too: interface decisions travel through APIs, services, data, and intelligence.</p>
          <div className="layer-selector" role="tablist" aria-label="Full-stack layers">
            {stackLayers.map((layer, index) => (
              <button key={layer.label} type="button" role="tab" aria-selected={activeLayer === index} onClick={() => setActiveLayer(index)}>
                <span>0{index + 1}</span>{layer.label}
              </button>
            ))}
          </div>
          <div className="layer-detail" role="tabpanel">
            <p>{selected.detail}</p>
            <div className="tag-row">{selected.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
        </div>
        <div className="scene-caption scene-caption-right">
          <span>STACK CORE</span>
          <strong>{selected.label}</strong>
          <small>Tap a layer to inspect</small>
        </div>
      </div>
    </section>
  );
}

function ProjectChapter({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article id={`project-${project.slug}`} className={`project-chapter project-${index + 1}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="chapter-sticky project-layout">
        <div className="project-copy">
          <p className="section-index">02.{index + 1} / {project.world}</p>
          <div className="project-title-row">
            <span>{project.number}</span>
            <h3>{project.name}</h3>
          </div>
          <p className="project-badge">{project.badge}</p>
          <p className="project-description">{project.description}</p>
          <div className="project-decision">
            <small>ENGINEERING FOCUS</small>
            <p>{project.focus}</p>
          </div>
          <ul className="outcome-list">
            {project.outcomes.map((outcome) => <li key={outcome}><Check size={14} />{outcome}</li>)}
          </ul>
          <div className="architecture-flow" aria-label={`${project.name} architecture`}>
            {project.architecture[0].map((node, nodeIndex) => (
              <span key={node}>{node}{nodeIndex < project.architecture[0].length - 1 ? <ChevronRight size={13} /> : null}</span>
            ))}
          </div>
          <Link className="text-link" href={`/work/${project.slug}`}>Open case study <ArrowUpRight size={16} /></Link>
        </div>
        <div className="world-label">
          <span>WORLD {project.number}</span>
          <strong>{project.world}</strong>
          <small>Procedural 3D system model</small>
        </div>
      </div>
    </article>
  );
}

function WorkChapter() {
  return (
    <section id="work" className="work-chapter chapter-section" aria-labelledby="work-title">
      <div className="work-intro">
        <p className="section-index">02 / PROJECT WORLDS</p>
        <h2 id="work-title">Four systems.<br />Four living models.</h2>
        <p>Each world turns a real engineering decision into space, motion, and interaction. The 3D is the explanation—not decoration.</p>
      </div>
      {projects.map((project, index) => <ProjectChapter key={project.slug} project={project} index={index} />)}
    </section>
  );
}

function CapabilityChapter() {
  const [activeChain, setActiveChain] = useState(0);

  return (
    <section id="expertise" className="capability-chapter chapter-section" aria-labelledby="capability-title">
      <div className="chapter-sticky split-layout">
        <div className="chapter-copy">
          <p className="section-index">03 / CAPABILITY CONSTELLATION</p>
          <h2 id="capability-title">Tools matter.<br />Connections matter more.</h2>
          <p className="section-lede">I work across the route a request actually travels—from the product surface to its data, automation, and deployment path.</p>
          <div className="chain-list">
            {capabilityChains.map((chain, index) => (
              <button key={chain.join("-")} type="button" className={activeChain === index ? "is-active" : ""} onClick={() => setActiveChain(index)}>
                <span>0{index + 1}</span>
                <strong>{chain.join(" → ")}</strong>
              </button>
            ))}
          </div>
        </div>
        <div className="constellation-readout">
          <small>ACTIVE CONNECTION</small>
          {capabilityChains[activeChain].map((item, index) => (
            <div key={item}><i>{String(index + 1).padStart(2, "0")}</i><span>{item}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PipelineChapter() {
  const [stage, setStage] = useState(0);

  return (
    <section id="ai-pipeline" className="pipeline-chapter chapter-section" aria-labelledby="pipeline-title">
      <div className="chapter-sticky split-layout">
        <div className="chapter-copy">
          <p className="section-index">04 / APPLIED INTELLIGENCE</p>
          <h2 id="pipeline-title">AI with a job<br />to do.</h2>
          <p className="section-lede">A useful AI feature is a grounded pipeline with clear inputs, guardrails, and an outcome the rest of the product can use.</p>
          <div className="pipeline-tabs" role="tablist" aria-label="AI pipeline stages">
            {pipelineStages.map((item, index) => (
              <button key={item.label} type="button" role="tab" aria-selected={stage === index} onClick={() => setStage(index)}>
                <span>0{index + 1}</span>{item.label}
              </button>
            ))}
          </div>
          <div className="pipeline-detail" role="tabpanel">
            <strong>{pipelineStages[stage].label}</strong>
            <p>{pipelineStages[stage].detail}</p>
          </div>
        </div>
        <div className="scene-caption scene-caption-right">
          <span>RAW → RETRIEVE → REASON → RESULT</span>
          <strong>{pipelineStages[stage].label}</strong>
          <small>Grounded context · Structured output</small>
        </div>
      </div>
    </section>
  );
}

function PacketRun() {
  const {
    gameActive,
    gameLane,
    gameProgress,
    gameResult,
    moveGameLane,
    soundEnabled,
    startGame,
    stopGame,
  } = useExperience();

  const gameStage = useMemo(() => {
    if (gameProgress < 0.2) return "Interface";
    if (gameProgress < 0.4) return "Auth / API";
    if (gameProgress < 0.68) return "Cache / Queue";
    if (gameProgress < 0.88) return "Workers";
    return "Delivery";
  }, [gameProgress]);

  useEffect(() => {
    if (!soundEnabled || gameResult === "idle") return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = gameResult === "success" ? 720 : 140;
    gain.gain.setValueAtTime(0.045, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.12);
    oscillator.addEventListener("ended", () => context.close());
  }, [gameResult, soundEnabled]);

  return (
    <section id="packet-run" className="game-chapter chapter-section" aria-labelledby="game-title">
      <div className="chapter-sticky game-layout">
        <div className="game-copy">
          <p className="section-index">05 / PACKET RUN</p>
          <h2 id="game-title">Can you ship<br />the request?</h2>
          <p>Guide Byte through the product stack. Switch lanes to dodge bugs, broken contracts, and blocked jobs on the way to production.</p>
          <div className="game-actions">
            <button className="button button-primary" type="button" onClick={startGame} disabled={gameActive}>
              {gameResult === "success" ? <RotateCcw size={17} /> : <Play size={17} />}
              {gameResult === "success" ? "Run again" : gameActive ? "Request in flight" : "Start Packet Run"}
            </button>
            {gameActive ? <button className="button button-quiet" type="button" onClick={stopGame}>Exit run</button> : <a className="button button-quiet" href="#experience">Skip game</a>}
          </div>
          <p className="game-note">Optional · 28 seconds · Arrow keys, A / D, or touch controls</p>
        </div>

        <div className={`game-console ${gameResult === "collision" ? "has-collision" : ""}`} aria-live="polite">
          <div className="console-topline"><span>REQUEST_0X7B</span><span>{gameActive ? "IN FLIGHT" : gameResult === "success" ? "SHIPPED" : "READY"}</span></div>
          <div className="console-progress"><span style={{ width: `${gameProgress * 100}%` }} /></div>
          <div className="console-stage"><small>CURRENT LAYER</small><strong>{gameStage}</strong></div>
          <div className="lane-indicator" aria-label={`Byte is in lane ${gameLane + 1}`}>
            {[0, 1, 2].map((lane) => <span key={lane} className={gameLane === lane ? "is-active" : ""}>{lane + 1}</span>)}
          </div>
          <div className="touch-controls">
            <button type="button" onClick={() => moveGameLane(-1)} disabled={!gameActive || gameLane === 0} aria-label="Move Byte left"><ArrowLeft /></button>
            <button type="button" onClick={() => moveGameLane(1)} disabled={!gameActive || gameLane === 2} aria-label="Move Byte right"><ArrowRight /></button>
          </div>
          {gameResult === "collision" ? <p className="console-alert">BUG HIT · RETRYING ROUTE</p> : null}
          {gameResult === "success" ? <div className="builder-stamp"><Check size={24} /><span>REQUEST SHIPPED</span><strong>SYSTEM BUILDER</strong><small>System healthy · Session verified</small></div> : null}
        </div>
      </div>
    </section>
  );
}

function ExperienceChapter() {
  return (
    <section id="experience" className="experience-chapter chapter-section" aria-labelledby="experience-title">
      <div className="experience-inner">
        <div className="experience-heading">
          <p className="section-index">06 / COMMIT TRAIL</p>
          <h2 id="experience-title">Built in production,<br />not just in theory.</h2>
        </div>
        <div className="timeline">
          {experience.map((item, index) => (
            <article key={item.company}>
              <div className="timeline-marker"><span>0{index + 1}</span><i /></div>
              <div className="timeline-role">
                <small>{item.period}</small>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <ul>{item.points.slice(0, 6).map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="education-card">
          <Braces size={24} />
          <div><small>EDUCATION</small><strong>{education.degree}</strong><span>{education.school} · {education.period} · {education.cgpa}</span></div>
        </div>
      </div>
    </section>
  );
}

function ContactChapter() {
  return (
    <section id="contact" className="contact-chapter chapter-section" aria-labelledby="contact-title">
      <div className="contact-portal">
        <p className="section-index">07 / CONTACT PORTAL</p>
        <span className="contact-status"><i /> OPEN TO THE RIGHT BUILD</span>
        <h2 id="contact-title">Have a system<br />worth building?</h2>
        <p>Bring me the product, workflow, or stubborn technical problem. I’ll bring full-stack thinking and a bias toward shipping something useful.</p>
        <a className="contact-email" href={`mailto:${contact.email}`}><Mail size={24} />{contact.email}<ArrowUpRight size={24} /></a>
        <div className="contact-links">
          <a href={contact.github} target="_blank" rel="noreferrer"><Github size={18} />GitHub<ArrowUpRight size={14} /></a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn<ArrowUpRight size={14} /></a>
          <span><Code2 size={18} />Resume available on request</span>
        </div>
      </div>
      <footer>
        <span>SMIT GADHIYA © 2026</span>
        <span>DESIGNED AS A LIVING SYSTEM</span>
        <a href="#home">BACK TO WAKE <ArrowUpRight size={13} /></a>
      </footer>
    </section>
  );
}

function PortfolioExperience() {
  return (
    <main>
      <a className="skip-link" href="#work">Skip immersive intro</a>
      <ExperienceCanvas />
      <ExperienceHeader />
      <ChapterRail />
      <div className="static-fallback" aria-hidden="true"><Network size={22} /><span>Full-stack systems · Product interfaces · Applied AI</span></div>
      <div className="page-content">
        <Hero />
        <StackChapter />
        <WorkChapter />
        <CapabilityChapter />
        <PipelineChapter />
        <PacketRun />
        <ExperienceChapter />
        <ContactChapter />
      </div>
    </main>
  );
}

export default function Portfolio() {
  return (
    <ExperienceProvider>
      <PortfolioExperience />
    </ExperienceProvider>
  );
}
