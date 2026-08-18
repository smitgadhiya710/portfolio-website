"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Send,
  Sun,
  X
} from "lucide-react";
import {
  builds,
  capabilities,
  contact,
  education,
  experience,
  navItems,
  principles,
  Project,
  projects,
  stackGroups,
  visualNodes
} from "@/lib/content";

const fadeTransition: Transition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] };
const viewportOnce = { once: true, margin: "-80px" } as const;
const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: fadeTransition
};

type Theme = "light" | "dark";

function SectionIntro({ label, title, subtitle }: { label?: string; title: string; subtitle: string }) {
  return (
    <motion.div className="mb-10 max-w-2xl" {...fadeUp}>
      {label ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">{label}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted">{subtitle}</p>
    </motion.div>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const className =
    variant === "primary"
      ? "bg-accent text-accent-foreground hover:-translate-y-0.5 hover:bg-accent-hover"
      : variant === "secondary"
        ? "border border-line bg-surface/[0.04] text-foreground hover:-translate-y-0.5 hover:border-accent/60"
        : "text-muted hover:text-foreground";

  return (
    <a
      href={href}
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition ${className}`}
    >
      {children}
    </a>
  );
}

function ThemeToggle({
  theme,
  onToggle,
  expanded = false
}: {
  theme: Theme | null;
  onToggle: () => void;
  expanded?: boolean;
}) {
  const nextTheme = theme === "light" ? "dark" : "light";
  const label = theme ? `Switch to ${nextTheme} theme` : "Toggle color theme";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={
        expanded
          ? "focus-ring flex min-h-11 w-full items-center justify-between rounded-xl border border-line bg-surface/[0.035] px-3 text-sm text-foreground transition hover:border-accent/50 hover:bg-surface/[0.06]"
          : "focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface/[0.04] text-muted transition hover:border-accent/50 hover:bg-surface/[0.07] hover:text-foreground"
      }
    >
      {expanded ? (
        <>
          <span className="inline-flex items-center gap-2 font-medium">
            <Icon size={17} /> Appearance
          </span>
          <span className="text-xs text-muted">{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </>
      ) : (
        <Icon size={18} />
      )}
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const activeTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = activeTheme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      window.localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      document.documentElement.dataset.theme = nextTheme;
    }
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <nav
        className={`container-shell pointer-events-auto mt-3 grid min-h-14 grid-cols-[1fr_auto] items-center rounded-2xl border border-line px-3 backdrop-blur-xl transition-all lg:grid-cols-[auto_1fr_auto] ${
          scrolled
            ? "bg-background/95 shadow-[0_18px_55px_rgba(0,0,0,0.16)]"
            : "bg-background/78 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        }`}
      >
        <a href="#home" className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl pr-2 text-sm font-semibold tracking-wide">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-xs font-bold text-accent-foreground">
            SG
          </span>
          <span>Smit Gadhiya</span>
        </a>
        <div className="hidden items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface/[0.05] hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#contact"
            className="focus-ring inline-flex min-h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            Let&apos;s Work Together
          </a>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <button
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface/[0.04] transition hover:border-accent/50 hover:bg-surface/[0.07] lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-shell pointer-events-auto mt-2 rounded-2xl border border-line bg-background/95 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring block rounded-xl px-3 py-3 text-sm font-medium text-muted transition hover:bg-surface/[0.05] hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover"
            >
              Let&apos;s Work Together
            </a>
            <div className="mt-2 border-t border-line pt-2">
              <ThemeToggle theme={theme} onToggle={toggleTheme} expanded />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ArchitectureVisual() {
  const reduceMotion = useReducedMotion();
  const satellite = ["AI", "Queue", "Search", "Automation"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="panel relative overflow-hidden rounded-lg p-5"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(82,210,188,0.08),transparent_34%,rgba(241,184,91,0.05))]" />
      <div className="relative mb-5 flex items-center justify-between border-b border-line pb-4">
        <div>
          <p className="font-mono text-xs text-muted">system.flow</p>
          <p className="mt-1 text-sm font-semibold">Production app architecture</p>
        </div>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">online</span>
      </div>
      <div className="relative grid gap-3 sm:grid-cols-5">
        {visualNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="relative">
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.18 }}
                className="rounded-md border border-line bg-background/70 p-4"
              >
                <Icon className="mb-4 text-accent" size={20} />
                <p className="text-sm font-semibold">{node.label}</p>
                <p className="mt-2 font-mono text-[11px] text-muted">layer.{index + 1}</p>
              </motion.div>
              {index < visualNodes.length - 1 ? (
                <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-muted sm:block" size={18} />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {satellite.map((item, index) => (
          <motion.div
            key={item}
            animate={reduceMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.3 }}
            className="rounded-md border border-line bg-surface/[0.035] px-3 py-2 text-center font-mono text-xs text-muted"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="container-shell min-h-screen scroll-mt-24 pt-32 md:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Full-Stack Developer
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            I build scalable web applications, AI-powered products, and business automation systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            I work across the full stack - from React and Next.js interfaces to Node.js backends, databases,
            asynchronous systems, AI integrations, search, and workflow automation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#work">View My Work <ArrowRight size={17} /></ButtonLink>
            <ButtonLink href="#contact" variant="secondary">Let&apos;s Work Together</ButtonLink>
            <ButtonLink href={contact.github} variant="ghost">GitHub <ExternalLink size={15} /></ButtonLink>
          </div>
          {contact.availability ? (
            <div className="mt-7 inline-flex items-center gap-2 text-sm text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_5px_rgba(82,210,188,0.12)]" />
              Available for freelance projects
            </div>
          ) : null}
        </motion.div>
        <ArchitectureVisual />
      </div>
      <div className="mt-16 overflow-hidden rounded-md border border-line bg-surface/[0.03]">
        <div className="flex min-w-max items-center gap-3 px-4 py-3 md:justify-between">
          {capabilities.map((item) => (
            <span key={item} className="whitespace-nowrap rounded-sm px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildSection() {
  return (
    <section id="expertise" className="container-shell scroll-mt-28 py-20">
      <SectionIntro title="What I Build" subtitle="Software that solves real business problems - not just demos." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {builds.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article key={item.title} className="panel rounded-lg p-5 transition hover:-translate-y-1 hover:border-accent/45" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
              <Icon className="text-accent" size={22} />
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 min-h-24 text-sm leading-6 text-muted">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <span key={tech} className="rounded-md border border-line bg-surface/[0.035] px-2.5 py-1 text-xs text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Diagram({ paths }: { paths: string[][] }) {
  return (
    <div className="space-y-3">
      {paths.map((path) => (
        <div key={path.join("-")} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {path.map((node, index) => (
            <div key={`${node}-${index}`} className="flex items-center gap-2">
              <span className="rounded-md border border-line bg-background/75 px-3 py-2 font-mono text-xs text-muted">{node}</span>
              {index < path.length - 1 ? <ArrowRight className="hidden text-accent/70 sm:block" size={15} /> : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      onMouseDown={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onMouseDown={(event) => event.stopPropagation()}
        className="panel max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-lg p-5 md:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {project.badge}
            </span>
            <h2 id="project-title" className="mt-4 text-3xl font-semibold tracking-tight">{project.name}</h2>
            <p className="mt-3 max-w-2xl text-muted">{project.description}</p>
          </div>
          <button aria-label="Close project details" onClick={onClose} className="focus-ring rounded-md border border-line p-2 hover:bg-surface/[0.06]">
            <X size={18} />
          </button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Business problem" text={project.problem} />
          <InfoBlock title="Solution" text={project.solution} />
        </div>
        <div className="mt-6 rounded-lg border border-line bg-background/45 p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">Architecture</h3>
          <Diagram paths={[...project.architecture, ...(project.secondaryArchitecture ?? [])]} />
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_0.9fr]">
          <div>
            <h3 className="text-lg font-semibold">Technical implementation</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{project.focus}</p>
            <ul className="mt-4 grid gap-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Results</h3>
            <div className="mt-3 grid gap-2">
              {project.outcomes.map((item) => (
                <div key={item} className="rounded-md border border-line bg-surface/[0.035] px-3 py-2 text-sm text-muted">{item}</div>
              ))}
            </div>
            <h3 className="mt-6 text-lg font-semibold">Technology stack</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-md border border-line bg-surface/[0.04] px-2.5 py-1 text-xs text-muted">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface/[0.03] p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}

function WorkSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="container-shell scroll-mt-28 py-20">
      <SectionIntro title="Selected Work" subtitle="A few systems I've designed and built." />
      <div className="grid gap-5">
        {projects.map((project, index) => (
          <motion.button
            key={project.name}
            type="button"
            onClick={() => setSelected(project)}
            className="panel focus-ring group rounded-lg p-5 text-left transition hover:-translate-y-1 hover:border-accent/45 md:p-6"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: index * 0.05 }}
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {project.badge}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <h3 className="text-2xl font-semibold">{project.name}</h3>
                  <ArrowRight className="text-muted transition group-hover:translate-x-1 group-hover:text-accent" size={20} />
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-md border border-line bg-surface/[0.035] px-2.5 py-1 text-xs text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-line bg-background/55 p-4">
                <Diagram paths={[project.architecture[0]]} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>{selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}</AnimatePresence>
    </section>
  );
}

function EngineeringSection() {
  return (
    <section className="container-shell py-20">
      <SectionIntro
        title="How I Think About Engineering"
        subtitle="Concise principles for building products that stay useful after the first version ships."
      />
      <div className="grid gap-4 md:grid-cols-5">
        {principles.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article key={item.title} className="rounded-lg border border-line bg-surface/[0.035] p-4" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
              <Icon className="text-amber" size={20} />
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section className="container-shell py-20">
      <SectionIntro title="Technical Stack" subtitle="A practical stack for full product delivery, backend systems, AI integrations, and automation." />
      <div className="grid gap-4 md:grid-cols-2">
        {stackGroups.map(([group, items], index) => (
          <motion.div key={group} className="panel rounded-lg p-5" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.035 }}>
            <h3 className="text-lg font-semibold">{group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="rounded-md border border-line bg-surface/[0.035] px-3 py-1.5 text-sm text-muted transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="container-shell py-20">
      <SectionIntro title="Experience" subtitle="Where these frontend, backend, automation, and system design skills have been applied." />
      <div className="relative grid gap-5">
        <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-line md:block" />
        {experience.map((item, index) => (
          <motion.article key={item.company} className="relative grid gap-4 rounded-lg border border-line bg-surface/[0.03] p-5 md:ml-10 md:grid-cols-[0.8fr_1.2fr]" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }}>
            <span className="absolute -left-[47px] top-6 hidden h-3 w-3 rounded-full bg-accent md:block" />
            <div>
              <h3 className="text-xl font-semibold">{item.role}</h3>
              <p className="mt-1 text-muted">{item.company}</p>
              <p className="mt-2 font-mono text-xs text-accent">{item.period}</p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-muted">
                  <Check className="mt-0.5 shrink-0 text-accent" size={15} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="container-shell scroll-mt-28 py-20">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionIntro
          title="A little about me"
          subtitle="I'm a full-stack developer who enjoys turning complex requirements into simple, reliable software. I work across frontend, backend, databases, APIs, automation, and AI integrations, with a particular interest in systems that need more than just a basic CRUD application."
        />
        <motion.div className="panel rounded-lg p-5" {...fadeUp}>
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="mt-4 text-muted">{education.degree}</p>
          <p className="mt-2 text-sm text-muted">{education.school}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-md border border-line px-3 py-1.5 text-sm text-muted">{education.period}</span>
            <span className="rounded-md border border-line px-3 py-1.5 text-sm text-muted">{education.cgpa}</span>
            <span className="rounded-md border border-line px-3 py-1.5 text-sm text-muted">Surat, Gujarat, India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("Please complete the required fields.");
      return;
    }
    setStatus("Message ready. Configure CONTACT_EMAIL or a form endpoint to send submissions.");
    form.reset();
  }

  return (
    <section id="contact" className="container-shell scroll-mt-28 py-20">
      <motion.div className="contact-banner mb-16 rounded-lg border border-accent/25 p-6 md:p-8" {...fadeUp}>
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Have a product idea or a problem that needs software?</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Tell me what you&apos;re trying to build. I&apos;ll help you figure out the right technical approach and turn it into a working product.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <ButtonLink href="#contact">Start a Conversation <MessageSquare size={17} /></ButtonLink>
            <ButtonLink href="#work" variant="secondary">View My Work</ButtonLink>
          </div>
        </div>
      </motion.div>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionIntro title="Let's build something useful." subtitle="Share the product, workflow, or system you want to create." />
        <motion.form onSubmit={onSubmit} className="panel grid gap-4 rounded-lg p-5" {...fadeUp} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company / Project" name="project" required />
            <Field label="Budget (optional)" name="budget" />
          </div>
          <Field label="What are you looking to build?" name="build" required />
          <label className="grid gap-2 text-sm text-muted">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="focus-ring resize-y rounded-md border border-line bg-background/70 px-3 py-2 text-foreground placeholder:text-muted/60"
              placeholder="Give me context, goals, current stack, or timeline."
            />
          </label>
          <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-accent-hover">
            Send Message <Send size={16} />
          </button>
          {status ? <p className="text-sm text-muted" role="status">{status}</p> : null}
          <div className="flex flex-wrap gap-3 border-t border-line pt-4">
            <a className="focus-ring inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted hover:text-foreground" href={contact.github}>
              <Github size={16} /> GitHub
            </a>
            <a className="focus-ring inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted hover:text-foreground" href={contact.linkedin}>
              <Linkedin size={16} /> LinkedIn
            </a>
            <span className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted">
              <Mail size={16} /> Email configurable
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="focus-ring h-11 rounded-md border border-line bg-background/70 px-3 text-foreground placeholder:text-muted/60"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">Smit Gadhiya</p>
          <p className="mt-1 text-sm text-muted">Full-Stack Developer</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          {[...navItems.slice(1), { label: "GitHub", href: contact.github }, { label: "LinkedIn", href: contact.linkedin }].map((item) => (
            <a key={item.label} href={item.href} className="focus-ring rounded-md px-2 py-1 hover:text-foreground">{item.label}</a>
          ))}
        </div>
        <p className="text-sm text-muted">© 2026 Smit Gadhiya. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BuildSection />
        <WorkSection />
        <EngineeringSection />
        <StackSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <a
        href="#contact"
        className="focus-ring fixed bottom-4 right-4 z-30 inline-flex min-h-11 items-center gap-2 rounded-md border border-accent/40 bg-background/90 px-4 text-sm font-semibold text-accent shadow-glow backdrop-blur md:hidden"
      >
        Contact <MessageSquare size={16} />
      </a>
      <Footer />
    </>
  );
}
