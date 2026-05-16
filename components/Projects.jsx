"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const rotation = index % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", bounce: 0.4, delay: index * 0.1 }}
      className={`card-sticker group relative flex flex-col ${rotation} ${project.featured ? "border-accent shadow-[6px_6px_0px_0px_#F472B6]" : ""}`}
    >
      {/* Featured badge (Sticker style) */}
      {project.featured && (
        <span className="absolute -top-3 -right-3 px-3 py-1 bg-tertiary border-2 border-border rounded-lg font-heading font-black text-[10px] uppercase tracking-tighter rotate-12 z-20 shadow-pop-sm">
          ★ Featured
        </span>
      )}

      {/* Project image (Blob mask for featured) */}
      {project.image && (
        <div className={`h-48 overflow-hidden mb-6 border-2 border-border relative ${project.featured ? "blob-mask" : "rounded-xl"}`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {!project.image && (
        <div className="h-48 rounded-xl mb-6 bg-muted border-2 border-border flex items-center justify-center">
          <span className="text-6xl opacity-10 font-heading font-black">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      <div className="flex-1">
        <h3 className="font-heading text-2xl font-black text-foreground mb-3 leading-tight">
          {project.title}
        </h3>
        <p className="text-mutedForeground text-sm font-body leading-relaxed mb-6">{project.description}</p>

        {/* Tech stack (Mini stickers) */}
        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-background border border-border rounded shadow-pop-sm text-[10px] font-heading font-bold uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-6 border-t-2 border-border/10">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-heading font-extrabold text-[10px] uppercase tracking-widest text-mutedForeground hover:text-accent transition-colors"
          >
            <span className="w-6 h-6 flex items-center justify-center bg-muted rounded border border-border">⌥</span>
            Source
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-heading font-extrabold text-[10px] uppercase tracking-widest text-mutedForeground hover:text-secondary transition-colors"
          >
            <span className="w-6 h-6 flex items-center justify-center bg-muted rounded border border-border">↗</span>
            Live
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProjects(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const allTags = ["all", ...new Set(projects.flatMap((p) => p.tech || []))].slice(0, 8);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tech?.includes(filter));

  return (
    <section id="projects" className="section-container bg-dot-grid">
      <div className="absolute top-40 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-1 bg-tertiary border-2 border-border rounded-full font-heading font-black text-xs uppercase tracking-widest mb-6 -rotate-2">
            My Portfolio
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading font-black mb-6">Selected Projects</h2>
          <p className="text-mutedForeground text-lg max-w-2xl font-body leading-relaxed">
            A collection of projects that showcase technical range — from full-stack apps to
            AI-powered tools.
          </p>
        </motion.div>

        {/* Tag filters (Label style) */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-5 py-2 border-2 border-border rounded-xl font-heading font-black text-[10px] uppercase tracking-widest transition-all duration-300
                  ${filter === tag
                    ? "bg-accent text-white shadow-pop-sm -translate-y-0.5"
                    : "bg-white text-mutedForeground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Projects grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-sticker animate-pulse h-[400px]">
                <div className="h-48 bg-muted rounded-xl mb-6" />
                <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-mutedForeground font-heading font-bold text-xl bg-white border-2 border-dashed border-border rounded-3xl">
            {projects.length === 0
              ? "Projects coming soon..."
              : "No projects match this filter."}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
