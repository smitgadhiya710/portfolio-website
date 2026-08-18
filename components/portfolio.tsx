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
  ArrowDown,
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
  {
    title: "Product",
    detail: "Interfaces people enjoy using.",
    icon: Code2,
    accent: "from-cyan-400/25 to-blue-500/5 text-cyan-300"
  },
  {
    title: "Backend",
    detail: "APIs and systems built to scale.",
    icon: ServerCog,
    accent: "from-violet-400/25 to-purple-500/5 text-violet-300"
  },
  {
    title: "AI",
    detail: "Useful intelligence inside products.",
    icon: Bot,
    accent: "from-pink-400/25 to-rose-500/5 text-pink-300"
  },
  {
    title: "Automation",
    detail: "Workflows that run without friction.",
    icon: Workflow,
    accent: "from-amber-300/25 to-orange-500/5 text-amber-300"
  }
];

const projectThemes = ["project-cyan", "project-violet", "project-pink", "project-amber"];
const stackItems = Array.from(new Set(stackGroups.flatMap(([, items]) => items))).slice(0, 24);

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 25, mass: 0.25 });

  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent" style={{ scaleX }} />;
}

function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 650, damping: 40, mass: 0.3 });
  const smoothY = useSpring(cursorY, { stiffness: 650, damping: 40, mass: 0.3 });
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
      const target = event.target;
      setInteractive(target instanceof Element && Boolean(target.closest("a, button")));
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
      className="cursor-follower pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full border border-accent/45 bg-accent/[0.045]"
      style={{ x: smoothX, y: smoothY, marginLeft: -16, marginTop: -16 }}
      animate={{ opacity: visible ? 1 : 0, scale: interactive ? 1.45 : 1 }}
      transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.18 } }}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
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
      className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-line bg-background/55 text-muted backdrop-blur-xl transition hover:border-accent/50 hover:text-foreground"
    >
      <Icon size={17} />
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <nav
        className={`container-shell pointer-events-auto mt-4 flex h-14 items-center justify-between rounded-full border px-3 transition-all ${
          scrolled ? "border-line bg-background/82 shadow-2xl backdrop-blur-2xl" : "border-transparent bg-transparent"
        }`}
      >
        <a href="#home" className="focus-ring flex items-center gap-2 rounded-full pr-3 text-sm font-semibold">
          <span className="brand-orb grid h-9 w-9 place-items-center rounded-full text-[10px] font-black text-white">SG</span>
          <span>Smit</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="focus-ring rounded-full px-4 py-2 text-sm text-muted transition hover:bg-surface/[0.05] hover:text-foreground">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a href={`mailto:${contact.email}`} className="focus-ring inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:-translate-y-0.5">
            Contact <Mail size={14} />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-line bg-background/70 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="container-shell pointer-events-auto mt-2 rounded-3xl border border-line bg-background/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-sm text-muted hover:bg-surface/[0.05] hover:text-foreground">
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 border-t border-line pt-3">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <a href={`mailto:${contact.email}`} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background">
                {contact.email} <Mail size={14} />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h2>
      </div>
      <span className="hidden h-px w-32 bg-gradient-to-r from-accent/70 to-transparent md:block" />
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-visual absolute inset-0">
        <DeveloperWorkspace3D />
      </div>
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="hero-color hero-color-one" />
      <div className="hero-color hero-color-two" />

      <div className="container-shell relative z-10 flex min-h-[100svh] items-start pb-[38vh] pt-28 sm:items-center sm:pb-24 sm:pt-32">
        <motion.div initial={{ opacity: 0, x: -34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-background/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur-xl">
            <Sparkles size={13} className="text-accent" /> Full-stack developer
          </div>
          <h1 className="text-5xl font-semibold leading-[0.94] tracking-[-0.065em] text-foreground sm:text-6xl lg:text-8xl">
            I build digital products that <span className="color-text">feel alive.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">
            Product interfaces, scalable backends, AI, and automation—designed as one experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:-translate-y-1">
              See my work <ArrowDown size={16} />
            </a>
            <a href={`mailto:${contact.email}`} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-background/45 px-6 text-sm font-semibold text-foreground backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent/50">
              {contact.email} <Mail size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted md:flex">
        Scroll to explore <ArrowDown size={13} />
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="container-shell py-24 sm:py-32">
      <SectionHeading eyebrow="Selected work" title="Things I’ve shipped." />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.slice(0, 4).map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, rotateX: 1.5, rotateY: index % 2 ? -1.5 : 1.5 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className={`project-card ${projectThemes[index]} rounded-[2rem] border border-line p-5 sm:p-6`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                  0{index + 1} / {project.badge}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">{project.name}</h3>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-background/35 text-foreground">
                <ArrowUpRight size={17} />
              </span>
            </div>
            <p className="project-description mt-3 max-w-xl text-sm leading-6 text-muted">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full border border-line bg-background/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{tech}</span>
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
    <section id="skills" className="overflow-hidden py-24 sm:py-32">
      <div className="container-shell">
        <SectionHeading eyebrow="What I do" title="One builder. Full system." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -7 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`capability-card rounded-[1.75rem] border border-line bg-gradient-to-br ${item.accent} p-5`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-current/20 bg-background/30">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-14 border-y border-line bg-surface/[0.02] py-4">
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-8 px-4">
              {stackItems.map((item) => (
                <span key={`${copy}-${item}`} className="inline-flex items-center gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {item}
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
    <section id="journey" className="container-shell py-24 sm:py-32">
      <SectionHeading eyebrow="Journey" title="Built through practice." />
      <div className="grid gap-4 lg:grid-cols-3">
        {experience.slice(0, 3).map((item, index) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="journey-card rounded-[1.75rem] border border-line p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">0{index + 1}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">{item.period}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">{item.role}</h3>
            <p className="mt-1 text-sm text-muted">{item.company}</p>
            <p className="mt-4 text-sm leading-6 text-muted">{item.points[0]}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="container-shell py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        className="contact-world relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-10 sm:py-24"
      >
        <div className="contact-glow contact-glow-one" />
        <div className="contact-glow contact-glow-two" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/65">Available for selected projects</p>
          <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl">
            Have a hard problem? Let’s make it simple.
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="focus-ring mx-auto mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-[#09111f] shadow-2xl transition hover:-translate-y-1 sm:px-8 sm:text-base"
          >
            <Mail size={18} /> {contact.email} <ArrowRight size={17} />
          </a>
          <div className="mt-7 flex justify-center gap-3">
            <a href={contact.github} aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20">
              <Github size={18} />
            </a>
            <a href={contact.linkedin} aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="container-shell flex flex-col gap-3 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 Smit Gadhiya</p>
      <p>Full-stack developer · Surat, India</p>
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
