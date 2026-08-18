"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  ServerCog,
  Sparkles,
  Sun,
  Workflow,
  X
} from "lucide-react";
import DeveloperWorkspace3D from "@/components/developer-workspace-3d";
import { contact, experience, projects, stackGroups } from "@/lib/content";

type Theme = "light" | "dark";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" }
];

const capabilityItems = [
  { title: "Product", detail: "Interfaces people enjoy using.", icon: Code2, color: "brutal-cyan" },
  { title: "Backend", detail: "APIs and systems built to scale.", icon: ServerCog, color: "brutal-purple" },
  { title: "AI", detail: "Useful intelligence inside products.", icon: Bot, color: "brutal-pink" },
  { title: "Automation", detail: "Workflows that remove busywork.", icon: Workflow, color: "brutal-yellow" }
];

const projectThemes = ["project-cyan", "project-purple", "project-pink", "project-yellow"];
const journeyThemes = ["brutal-yellow", "brutal-cyan"];
const stackItems = Array.from(new Set(stackGroups.flatMap(([, items]) => items))).slice(0, 22);

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 25, mass: 0.2 });

  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[#ff4fa3]" style={{ scaleX }} />;
}

function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-50);
  const cursorY = useMotionValue(-50);
  const smoothX = useSpring(cursorX, { stiffness: 720, damping: 42, mass: 0.22 });
  const smoothY = useSpring(cursorY, { stiffness: 720, damping: 42, mass: 0.22 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);
    };
    const hover = (event: PointerEvent) => {
      setInteractive(event.target instanceof Element && Boolean(event.target.closest("a, button")));
    };
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", hover);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, [cursorX, cursorY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-follower pointer-events-none fixed left-0 top-0 z-[80] grid h-5 w-5 place-items-center"
      style={{ x: smoothX, y: smoothY, marginLeft: -10, marginTop: -10 }}
      animate={{ opacity: visible ? 1 : 0, rotate: interactive ? 45 : 0, scale: interactive ? 1.35 : 1 }}
      transition={{ opacity: { duration: 0.12 }, rotate: { duration: 0.16 }, scale: { duration: 0.16 } }}
    >
      <span className="h-1.5 w-1.5 bg-[#ff4fa3]" />
    </motion.div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: Theme | null; onToggle: () => void }) {
  const nextTheme = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} theme`}
      className="brutal-icon focus-ring grid h-9 w-9 place-items-center rounded-md"
    >
      <Icon size={16} />
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
    setTheme(next);
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav className="brutal-nav container-shell pointer-events-auto mt-3 flex h-14 items-center justify-between rounded-lg px-2.5">
        <a href="#home" className="focus-ring flex items-center gap-2 rounded-md pr-2 text-sm font-black uppercase tracking-tight">
          <span className="brand-orb grid h-9 w-9 place-items-center rounded-md text-[10px] font-black text-[#111]">SG</span>
          <span>SMIT.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link focus-ring rounded px-3 py-2 text-xs font-bold uppercase tracking-wider">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a href={`mailto:${contact.email}`} className="brutal-button-primary focus-ring inline-flex h-9 items-center gap-2 rounded-md px-3 text-xs font-black uppercase">
            Contact <Mail size={14} />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          className="brutal-icon focus-ring grid h-9 w-9 place-items-center rounded-md md:hidden"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="brutal-card container-shell pointer-events-auto mt-2 rounded-lg p-2 md:hidden"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="nav-link block rounded px-3 py-2.5 text-sm font-bold uppercase">
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 border-t-2 border-current pt-2">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <a href={`mailto:${contact.email}`} className="brutal-button-primary flex min-h-9 flex-1 items-center justify-center gap-2 rounded-md px-3 text-xs font-black">
                {contact.email} <Mail size={14} />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function SectionHeading({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="mb-4 flex items-end gap-3"
    >
      <span className="section-number rounded-md px-2 py-1 font-mono text-xs font-black">{index}</span>
      <div>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
        <h2 className="mt-1 text-3xl font-black uppercase leading-none tracking-[-0.055em] text-foreground sm:text-4xl">{title}</h2>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="container-shell pb-4 pt-24 sm:pb-6 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="brutal-hero grid overflow-hidden rounded-xl lg:grid-cols-[0.86fr_1.14fr]"
      >
        <div className="order-2 flex flex-col justify-center p-5 sm:p-7 lg:order-1 lg:p-9">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="brutal-label inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.18em]">
              <Sparkles size={12} /> Full-stack developer
            </span>
            <span className="status-chip rounded-md px-2.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.16em]">Available</span>
          </div>
          <h1 className="max-w-2xl text-[3.25rem] font-black uppercase leading-[0.84] tracking-[-0.075em] text-[#111] sm:text-6xl lg:text-7xl">
            Build. Ship. <span className="color-text">Automate.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-[#111]/70 sm:text-base">
            I turn product ideas into fast interfaces, scalable systems, and useful AI workflows.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#work" className="hero-button-dark focus-ring inline-flex min-h-11 items-center gap-2 rounded-md px-4 text-xs font-black uppercase">
              See my work <ArrowRight size={15} />
            </a>
            <a href={`mailto:${contact.email}`} className="hero-button-light focus-ring inline-flex min-h-11 items-center gap-2 rounded-md px-4 text-xs font-black">
              <Mail size={15} /> {contact.email}
            </a>
          </div>
        </div>

        <div className="brutal-stage relative order-1 h-[255px] overflow-hidden border-b-[3px] border-[#111] sm:h-[330px] lg:order-2 lg:h-[445px] lg:border-b-0 lg:border-l-[3px]">
          <DeveloperWorkspace3D />
          <span className="absolute left-3 top-3 rounded border-2 border-[#111] bg-[#62e8f4] px-2 py-1 font-mono text-[9px] font-black uppercase text-[#111] shadow-[3px_3px_0_#111]">
            Interactive 3D
          </span>
          <div className="absolute bottom-3 right-3 flex gap-2">
            <span className="h-3 w-3 border-2 border-[#111] bg-[#ff4fa3]" />
            <span className="h-3 w-3 border-2 border-[#111] bg-[#b8a2ff]" />
            <span className="h-3 w-3 border-2 border-[#111] bg-[#ffdf4d]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="container-shell py-4 sm:py-6">
      <SectionHeading index="01" eyebrow="Selected work" title="Shipped products" />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.slice(0, 4).map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: -4, y: -4 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className={`brutal-color-card project-card ${projectThemes[index]} rounded-xl p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-[#111]/65">0{index + 1} / {project.badge}</p>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.045em] text-[#111]">{project.name}</h3>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-[#111] bg-white text-[#111] shadow-[3px_3px_0_#111]">
                <ArrowUpRight size={17} strokeWidth={3} />
              </span>
            </div>
            <p className="project-description mt-2 max-w-xl text-sm font-medium leading-5 text-[#111]/70">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded border-2 border-[#111] bg-white/75 px-2 py-1 font-mono text-[8px] font-black uppercase tracking-[0.1em] text-[#111]">{tech}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="overflow-hidden py-4 sm:py-6">
      <div className="container-shell">
        <SectionHeading index="02" eyebrow="What I do" title="Full system thinking" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ x: -4, y: -4, rotate: index % 2 ? -0.5 : 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`brutal-color-card capability-card ${item.color} rounded-xl p-4`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-[#111] bg-white text-[#111] shadow-[3px_3px_0_#111]">
                  <Icon size={19} strokeWidth={2.6} />
                </span>
                <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.035em] text-[#111]">{item.title}</h3>
                <p className="mt-1 text-sm font-medium leading-5 text-[#111]/65">{item.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="marquee-strip mt-5 py-2.5">
        <motion.div className="flex w-max items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}>
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-6 px-3">
              {stackItems.map((item) => (
                <span key={`${copy}-${item}`} className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[9px] font-black uppercase tracking-[0.14em] text-[#111]">
                  <span className="h-2 w-2 border border-[#111] bg-[#ff4fa3]" /> {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section id="journey" className="container-shell py-4 sm:py-6">
      <SectionHeading index="03" eyebrow="Journey" title="Built through practice" />
      <div className="grid gap-4 md:grid-cols-2">
        {experience.slice(0, 2).map((item, index) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, x: index ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4, y: -4 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={`brutal-color-card ${journeyThemes[index]} rounded-xl p-4 sm:p-5`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded border-2 border-[#111] bg-white px-2 py-1 font-mono text-[9px] font-black text-[#111]">0{index + 1}</span>
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.12em] text-[#111]/65">{item.period}</span>
            </div>
            <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.03em] text-[#111]">{item.role}</h3>
            <p className="mt-1 text-sm font-bold text-[#111]/65">{item.company}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.points.slice(0, 4).map((point) => (
                <span key={point} className="rounded border-2 border-[#111] bg-white/70 px-2 py-1 text-[10px] font-bold text-[#111]">{point}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="container-shell py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="contact-card grid gap-5 rounded-xl p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center"
      >
        <div>
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#111]/60">No forms. Just email.</p>
          <h2 className="mt-2 max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#111] sm:text-5xl">
            Let&apos;s build something that works.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <a href={`mailto:${contact.email}`} className="contact-button focus-ring inline-flex min-h-12 items-center gap-2 rounded-md px-4 text-sm font-black">
            <Mail size={17} /> {contact.email} <ArrowRight size={16} />
          </a>
          <a href={contact.github} aria-label="GitHub" className="contact-icon focus-ring grid h-11 w-11 place-items-center rounded-md">
            <Github size={18} />
          </a>
          <a href={contact.linkedin} aria-label="LinkedIn" className="contact-icon focus-ring grid h-11 w-11 place-items-center rounded-md">
            <Linkedin size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="container-shell flex flex-col gap-1 py-4 text-xs font-bold uppercase text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>(c) 2026 Smit Gadhiya</p>
      <p>Full-stack developer / Surat, India</p>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        <SkillsSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
