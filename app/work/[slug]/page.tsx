import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import CaseStudyScene from "@/components/case-study-scene";
import { contact, projects } from "@/lib/content";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} Case Study — Smit Gadhiya`,
    description: `${project.description} Explore the problem, architecture, implementation, and outcomes.`,
    openGraph: {
      title: `${project.name} — ${project.world}`,
      description: project.description,
      images: ["/og.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const implementation = project.highlights.slice(0, 8);

  return (
    <main className="case-page" style={{ "--case-accent": project.accent } as React.CSSProperties}>
      <header className="case-header">
        <Link href="/#work" className="case-brand"><span>SG</span><strong>Smit Gadhiya</strong></Link>
        <nav aria-label="Case study navigation">
          <Link href="/#work"><ArrowLeft size={15} />All work</Link>
          <a href={`mailto:${contact.email}`}>Discuss a project <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="case-hero">
        <div className="case-hero-copy">
          <p>{project.number} / {project.world}</p>
          <h1>{project.name}</h1>
          <span>{project.badge}</span>
          <strong>{project.role}</strong>
          <p className="case-description">{project.description}</p>
        </div>
        <CaseStudyScene accent={project.accent} variant={projectIndex} />
        <div className="case-scroll-label">CASE FILE · SCROLL TO INSPECT</div>
      </section>

      <section className="case-overview case-section">
        <div className="case-section-label"><span>01</span>THE SITUATION</div>
        <div className="case-two-column">
          <article><small>PROBLEM</small><h2>What needed to change</h2><p>{project.problem}</p></article>
          <article><small>APPROACH</small><h2>The system response</h2><p>{project.solution}</p></article>
        </div>
      </section>

      <section className="case-section architecture-section">
        <div className="case-section-label"><span>02</span>ARCHITECTURE</div>
        <div className="architecture-map">
          {project.architecture.map((chain, chainIndex) => (
            <div key={chainIndex}>
              {chain.map((node, nodeIndex) => (
                <span key={node}><i>{String(nodeIndex + 1).padStart(2, "0")}</i><strong>{node}</strong>{nodeIndex < chain.length - 1 ? <ArrowRight size={18} /> : null}</span>
              ))}
            </div>
          ))}
          {project.secondaryArchitecture?.map((chain, chainIndex) => (
            <div key={`secondary-${chainIndex}`} className="architecture-secondary">
              {chain.map((node, nodeIndex) => (
                <span key={node}><i>{String(nodeIndex + 1).padStart(2, "0")}</i><strong>{node}</strong>{nodeIndex < chain.length - 1 ? <ArrowRight size={18} /> : null}</span>
              ))}
            </div>
          ))}
        </div>
        <p className="architecture-focus">{project.focus}</p>
      </section>

      <section className="case-section build-section">
        <div className="case-section-label"><span>03</span>IMPLEMENTATION</div>
        <div className="build-grid">
          <div className="implementation-list">
            {implementation.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><Check size={15} /></div>)}
          </div>
          <div className="case-stack">
            <small>TECHNOLOGY PATH</small>
            {project.tech.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>
      </section>

      <section className="case-section result-section">
        <div className="case-section-label"><span>04</span>RESULTS</div>
        <div className="result-grid">
          {project.outcomes.map((outcome, index) => <article key={outcome}><span>{String(index + 1).padStart(2, "0")}</span><p>{outcome}</p></article>)}
        </div>
        <div className="case-reflection"><small>ENGINEERING REFLECTION</small><p>The strongest outcome is the system connection: product UX, backend behavior, operational constraints, and automation were treated as one continuous build.</p></div>
      </section>

      <section className="next-case">
        <p>NEXT CASE FILE</p>
        <Link href={`/work/${nextProject.slug}`}><span>{nextProject.world}</span><strong>{nextProject.name}</strong><ArrowUpRight /></Link>
      </section>

      <footer className="case-footer">
        <span>SMIT GADHIYA · FULL-STACK DEVELOPER</span>
        <div><a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href={`mailto:${contact.email}`} aria-label="Email"><Mail size={17} /></a></div>
      </footer>
    </main>
  );
}
