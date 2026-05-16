"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! I'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const INFO = [
    { icon: "@", label: "Email", value: "rohon@example.com", href: "mailto:rohon@example.com" },
    { icon: "⌥", label: "GitHub", value: "github.com/rohon", href: "https://github.com/rohon" },
    { icon: "in", label: "LinkedIn", value: "linkedin.com/in/rohon", href: "https://linkedin.com/in/rohon" },
  ];

  return (
    <section id="contact" className="section-container bg-background">
      {/* Decorative SVG Squiggles or Dots could go here */}
      <div className="absolute top-10 right-0 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="inline-block px-4 py-1 bg-quaternary border-2 border-border rounded-full font-heading font-black text-xs uppercase tracking-widest mb-6 -rotate-2 shadow-pop-sm">
            Contact Me
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading font-black mb-6">Let's Work Together</h2>
          <p className="text-mutedForeground text-lg max-w-2xl font-body leading-relaxed">
            Have a project in mind? I'm open to freelance work, full-time roles, and interesting
            collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info (Stickers) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {INFO.map(({ icon, label, value, href }, idx) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-white shadow-pop transition-all hover:-translate-y-1 hover:rotate-1 group`}
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent text-white border-2 border-border font-heading font-black text-xl shadow-pop-sm group-hover:animate-wiggle">
                  {icon}
                </span>
                <div>
                  <div className="text-[10px] text-mutedForeground font-heading font-black uppercase tracking-widest mb-0.5">{label}</div>
                  <div className="text-base text-foreground font-heading font-black group-hover:text-accent transition-colors">
                    {value}
                  </div>
                </div>
              </a>
            ))}

            {/* Availability sticker */}
            <div className="p-6 rounded-2xl border-2 border-border bg-white shadow-pop-sm rotate-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-quaternary animate-pulse border-2 border-border" />
                <span className="text-xs font-heading font-black uppercase tracking-widest text-quaternary-dark">Available Now</span>
              </div>
              <p className="text-mutedForeground text-sm font-body leading-relaxed">
                Open to full-time and freelance opportunities. <br />
                <span className="font-bold text-foreground">Response time: within 24h.</span>
              </p>
            </div>
          </motion.div>

          {/* Contact form (Sticker Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="card-sticker space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-playful">Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="input-playful"
                    required
                  />
                </div>
                <div>
                  <label className="label-playful">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="input-playful"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label-playful">Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="input-playful"
                />
              </div>

              <div>
                <label className="label-playful">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="input-playful resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
