"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.filter(({ href }) => href.startsWith("#")).forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b-2 border-border py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-heading text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform">
          RKD<span className="text-accent">!</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ href, label }) => {
            const IsHash = href.startsWith("#");
            const Tag = IsHash ? "a" : Link;
            return (
              <Tag
                key={href}
                href={href}
                className={`relative px-6 py-2 text-sm font-heading font-extrabold uppercase tracking-wider transition-all
                  ${active === href ? "text-foreground" : "text-mutedForeground hover:text-foreground"}`}
              >
                <span className="relative z-10">{label}</span>
                {active === href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-tertiary border-2 border-border bubble-tail shadow-pop-sm"
                    transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                  />
                )}
              </Tag>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-6 btn-primary !py-2 !px-6 text-sm"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-white border-2 border-border rounded-lg shadow-pop-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white border-2 border-border rounded-2xl shadow-pop overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => {
                const IsHash = href.startsWith("#");
                const Tag = IsHash ? "a" : Link;
                return (
                  <Tag
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-base font-heading font-extrabold uppercase tracking-wide text-mutedForeground hover:text-foreground hover:bg-muted rounded-xl transition-all"
                  >
                    {label}
                  </Tag>
                );
              })}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 btn-primary w-full"
              >
                Resume ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
