"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Braces,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";
import DeveloperWorkspace3D from "@/components/developer-workspace-3d";
import { contact, experience, projects, stackGroups } from "@/lib/content";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    number: "01",
    title: "Product engineering",
    description: "Interfaces with sharp interaction, resilient state, and product logic that holds together.",
  },
  {
    number: "02",
    title: "Backend systems",
    description: "APIs, queues, caching, permissions, and service boundaries made for real-world load.",
  },
  {
    number: "03",
    title: "Applied AI",
    description: "Search, extraction, generation, and assistants designed around a useful product outcome.",
  },
  {
    number: "04",
    title: "Automation",
    description: "Connected workflows that replace repetitive work with observable, reliable systems.",
  },
];

const projectLooks = [
  { accent: "#8c9dff", ink: "#0a0b12", className: "case-violet" },
  { accent: "#ff6b82", ink: "#0a0b12", className: "case-coral" },
  { accent: "#d9ff5b", ink: "#0a0b12", className: "case-lime" },
  { accent: "#73e6ff", ink: "#0a0b12", className: "case-cyan" },
];

const technologyLoop = Array.from(new Set(stackGroups.flatMap(([, items]) => items))).slice(0, 24);

function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.18 });

  return <motion.div aria-hidden="true" className="progress-rail" style={{ scaleX }} />;
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Primary navigation">
        <a className="wordmark focus-ring" href="#top" aria-label="Smit Gadhiya — home">
          <span>SG</span>
          <span className="wordmark-dot" />
          <span>26</span>
        </a>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <a className="nav-item focus-ring" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="nav-availability focus-ring" href={`mailto:${contact.email}`}>
          <span className="availability-pulse" /> Available for work
        </a>

        <button
          type="button"
          className="menu-button focus-ring"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-nav shell"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navItems.map((item, index) => (
              <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <a className="mobile-email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero shell" id="top">
      <div className="hero-topline">
        <p>Full-stack developer</p>
        <p>Surat, India · 21.1702° N</p>
        <p className="hero-topline-last">Scroll to explore</p>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Sparkles size={14} /> Product · Backend · AI
          </motion.p>

          <h1 aria-label="Building digital systems">
            {["Building", "digital", "systems"].map((line, index) => (
              <span className={index === 1 ? "outline-word" : ""} key={line}>
                <motion.span
                  initial={{ y: reduceMotion ? 0 : "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="hero-intro">
            <p>
              I engineer product interfaces, backend systems, and AI workflows that stay fast when the real world gets messy.
            </p>
            <a className="round-link focus-ring" href="#work" aria-label="Explore selected work">
              <ArrowDown size={22} />
            </a>
          </div>
        </div>

        <motion.div
          className="hero-scene"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <DeveloperWorkspace3D />
          <span className="scene-label scene-label-top">Live system / 001</span>
          <span className="scene-label scene-label-bottom">Move to inspect</span>
          <span className="scene-cross scene-cross-a">+</span>
          <span className="scene-cross scene-cross-b">+</span>
        </motion.div>
      </div>

      <div className="hero-footer">
        <p>Designing the surface.</p>
        <Asterisk size={18} />
        <p>Engineering what runs beneath it.</p>
      </div>
    </section>
  );
}

function SectionIntro({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <motion.div
      className="section-intro"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
    >
      <div>
        <span>{index}</span>
        <p>{label}</p>
      </div>
      <h2>{title}</h2>
    </motion.div>
  );
}

function CaseArtifact({ index }: { index: number }) {
  return (
    <div className={`case-artifact artifact-${index + 1}`} aria-hidden="true">
      <span className="artifact-orbit orbit-one" />
      <span className="artifact-orbit orbit-two" />
      <span className="artifact-core">
        <span className="artifact-core-inner" />
      </span>
      <span className="artifact-satellite satellite-one" />
      <span className="artifact-satellite satellite-two" />
      <span className="artifact-plane plane-one" />
      <span className="artifact-plane plane-two" />
    </div>
  );
}

function ProjectCase({ index }: { index: number }) {
  const project = projects[index];
  const look = projectLooks[index];
  const cardRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 22 });
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    cursorX.set(x);
    cursorY.set(y);
    if (!reduceMotion) {
      pointerX.set(x / bounds.width - 0.5);
      pointerY.set(y / bounds.height - 0.5);
    }
  }

  function resetPointer() {
    setHovered(false);
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      className={`project-case ${look.className}`}
      style={{ "--case-accent": look.accent, "--case-ink": look.ink } as React.CSSProperties}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
    >
      <div className="case-head">
        <span>Case / 0{index + 1}</span>
        <span>{project.badge}</span>
        <span>2025—26</span>
      </div>

      <div className="case-canvas">
        <span className="case-index" aria-hidden="true">0{index + 1}</span>
        <motion.div className="artifact-stage" style={{ rotateX, rotateY }}>
          <CaseArtifact index={index} />
        </motion.div>
        <motion.span
          className="case-cursor"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          style={{ x: cursorX, y: cursorY }}
        >
          View
          <ArrowUpRight size={13} />
        </motion.span>
      </div>

      <div className="case-info">
        <div>
          <p className="case-role">{project.focus}</p>
          <h3>{project.name}</h3>
        </div>
        <p className="case-description">{project.description}</p>
        <div className="case-tags">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Work() {
  return (
    <section className="work-section" id="work">
      <div className="shell">
        <SectionIntro index="01" label="Selected work" title="Systems made tangible." />
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCase index={index} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="technology-marquee" aria-label="Technology stack">
      <motion.div
        className="technology-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <div className="technology-set" aria-hidden={copy === 1} key={copy}>
            {technologyLoop.map((technology) => (
              <span key={`${copy}-${technology}`}>
                {technology}<Asterisk size={14} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Capabilities() {
  return (
    <section className="capabilities-section" id="capabilities">
      <div className="shell">
        <SectionIntro index="02" label="Capabilities" title="From first pixel to final process." />
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.article
              className="service-card"
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <div className="service-number">{service.number}</div>
              <Braces size={22} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-line" />
            </motion.article>
          ))}
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-section shell" id="experience">
      <SectionIntro index="03" label="Experience" title="Built through shipping." />
      <div className="experience-list">
        {experience.map((item, index) => (
          <motion.article
            className="experience-row"
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <span className="experience-index">0{index + 1}</span>
            <div>
              <p>{item.period}</p>
              <h3>{item.role}</h3>
            </div>
            <div>
              <p>At</p>
              <h4>{item.company}</h4>
            </div>
            <div className="experience-skills">
              {item.points.slice(0, 4).map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
            <MoveUpRight size={22} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-shell">
        <div className="contact-meta">
          <span>04 / Contact</span>
          <p>Have a product to launch, a system to untangle, or a workflow begging to disappear?</p>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          Let&apos;s make
          <span>it real.</span>
        </motion.h2>

        <div className="contact-actions">
          <a className="email-link focus-ring" href={`mailto:${contact.email}`}>
            <span>Start a conversation</span>
            <strong>{contact.email}</strong>
            <span className="email-arrow"><ArrowRight size={24} /></span>
          </a>
          <div className="social-links">
            <a className="focus-ring" href={contact.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub <ArrowUpRight size={15} />
            </a>
            <a className="focus-ring" href={contact.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} />
            </a>
            <a className="focus-ring" href={`mailto:${contact.email}`}>
              <Mail size={18} /> Email <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <p>© 2026 Smit Gadhiya</p>
        <p>Designed and engineered with intent.</p>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <ProgressRail />
      <Header />
      <main>
        <Hero />
        <Work />
        <Capabilities />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
