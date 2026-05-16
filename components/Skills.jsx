"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function SkillBar({ skill, inView }) {
  const barColors = ["bg-vivid-violet", "bg-hot-pink", "bg-amber-yellow", "bg-emerald-mint"];
  const barColor = barColors[skill.name.length % barColors.length];

  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          {skill.name}
        </span>
        <span className="text-[10px] font-heading font-black text-mutedForeground border-b-2 border-border/10 pb-0.5">{skill.level}%</span>
      </div>
      <div className="h-4 bg-muted border-2 border-border rounded-lg overflow-hidden shadow-pop-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
          className={`h-full rounded-r-lg border-r-2 border-border ${barColor}`}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, skills, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const rotation = index % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1";

  const CATEGORY_ICONS = {
    Frontend: "◈",
    Backend: "⬡",
    Database: "⬟",
    DevOps: "⚙",
    Tools: "⊞",
    "AI/ML": "◉",
    Other: "◇",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", bounce: 0.4, delay: index * 0.1 }}
      className={`card-sticker flex flex-col ${rotation} hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-tertiary border-2 border-border text-foreground text-xl shadow-pop-sm group-hover:animate-wiggle">
          {CATEGORY_ICONS[category] || "◇"}
        </span>
        <h3 className="font-heading font-black text-xl leading-none">{category}</h3>
        <span className="ml-auto text-[10px] font-heading font-black text-white bg-accent border-2 border-border px-3 py-1 rounded-full shadow-pop-sm">
          {skills.length}
        </span>
      </div>

      <div className="space-y-6">
        {skills.map((skill) => (
          <SkillBar key={skill._id} skill={skill} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setGrouped(d.data.grouped);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = Object.keys(grouped);

  return (
    <section id="skills" className="section-container bg-background">
      {/* Absolute Decorative Blobs */}
      <div className="absolute bottom-40 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-20 w-96 h-96 bg-quaternary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-start"
        >
          <div className="inline-block px-4 py-1 bg-secondary border-2 border-border rounded-full font-heading font-black text-xs uppercase tracking-widest mb-6 rotate-2 shadow-pop-sm">
            Expertise
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading font-black mb-6">Skills & Tech</h2>
          <p className="text-mutedForeground text-lg max-w-2xl font-body leading-relaxed">
            My technical toolkit — continuously evolving with the latest in web, mobile, and
            AI development.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-sticker animate-pulse space-y-6 h-[400px]">
                <div className="h-10 bg-muted rounded-xl w-1/2" />
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded-lg" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-24 text-mutedForeground font-heading font-bold text-xl bg-white border-2 border-dashed border-border rounded-3xl">
            Skills coming soon...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={cat} category={cat} skills={grouped[cat]} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
