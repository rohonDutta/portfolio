"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const SOCIAL_LINKS = [
  { href: "https://github.com/rohon", label: "GitHub", icon: "⌥" },
  { href: "https://linkedin.com/in/rohon", label: "LinkedIn", icon: "in" },
  { href: "mailto:rohon@example.com", label: "Email", icon: "@" },
];

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Decorative Geometric Shapes */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-tertiary rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-secondary rounded-full opacity-10 pointer-events-none" />

      {/* Massive Yellow Circle (Feature Decoration) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", damping: 15 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary rounded-full pointer-events-none opacity-40 blur-[100px]"
      />

      {/* Dot Grid Background */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-8"
        >
          {/* Available badge (Sticker style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-border bg-white shadow-pop-sm font-heading font-extrabold text-xs uppercase tracking-wider"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-quaternary animate-pulse border border-border" />
            <span>Available for new opportunities</span>
          </motion.div>

          {/* Name & Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl sm:text-7xl lg:text-9xl font-heading leading-none"
            >
              Rohon Kumar<br />
              <span className="text-accent underline decoration-tertiary decoration-8 underline-offset-[12px]">Dutta</span>
            </motion.h1>

            {/* Type animation in a speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-6 py-3 bg-white border-2 border-border bubble-tail shadow-pop font-heading font-extrabold text-xl sm:text-2xl text-accent"
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "AI Integration Engineer",
                  2000,
                  "Next.js Specialist",
                  2000,
                  "MongoDB Expert",
                  2000,
                ]}
                repeat={Infinity}
                wrapper="span"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/80 font-body text-xl max-w-2xl leading-relaxed mb-4"
          >
            I build scalable, production-ready web applications with modern stacks.
            Passionate about <span className="font-bold text-foreground">clean architecture</span>,
            AI-powered products, and exceptional UX.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <a href="#projects" className="btn-primary group">
              View My Work
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </motion.div>

          {/* Social links (Floating icons) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mt-8"
          >
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-border bg-white shadow-pop-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-xl font-heading font-black group"
                title={label}
              >
                <span className="group-hover:animate-wiggle">{icon}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Row (Sticker Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: "3+", label: "Years Exp", color: "bg-vivid-violet" },
            { value: "20+", label: "Projects", color: "bg-hot-pink" },
            { value: "10+", label: "Tech Stack", color: "bg-amber-yellow" },
            { value: "100%", label: "Satisfaction", color: "bg-emerald-mint" },
          ].map(({ value, label, color }, idx) => (
            <div
              key={label}
              className={`p-6 border-2 border-border rounded-2xl bg-white shadow-pop flex flex-col items-center text-center transition-all hover:-rotate-2`}
            >
              <div className="font-heading text-3xl font-black text-accent">{value}</div>
              <div className="text-mutedForeground text-xs font-heading font-extrabold uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bouncy Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-heading font-black uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center p-1"
        >
          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
