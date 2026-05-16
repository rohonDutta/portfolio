import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t-2 border-border py-12 px-6 bg-background relative overflow-hidden">
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative">
        <div className="font-heading text-2xl font-black text-foreground hover:scale-105 transition-transform cursor-default">
          RKD<span className="text-accent">!</span>
        </div>

        <p className="text-mutedForeground text-xs font-heading font-black uppercase tracking-widest text-center">
          © {new Date().getFullYear()} Rohon Kumar Dutta. <br className="sm:hidden" />
          Built with <span className="text-accent underline decoration-tertiary">Next.js</span> & <span className="text-secondary underline decoration-quaternary">MongoDB</span>.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 border-2 border-border rounded-xl font-heading font-black text-[10px] uppercase tracking-widest bg-white shadow-pop-sm hover:shadow-none hover:translate-y-0.5 transition-all text-mutedForeground hover:text-foreground"
          >
            Admin
          </Link>
          <a
            href="#about"
            className="px-4 py-2 border-2 border-border rounded-xl font-heading font-black text-[10px] uppercase tracking-widest bg-white shadow-pop-sm hover:shadow-none hover:translate-y-0.5 transition-all text-mutedForeground hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
