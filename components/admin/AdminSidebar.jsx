"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/projects", label: "Projects", icon: "◈" },
  { href: "/admin/skills", label: "Skills", icon: "⬡" },
  { href: "/admin/messages", label: "Messages", icon: "@" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    toast.success("Logged out");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r-2 border-border flex flex-col shadow-pop">
      <div className="px-6 h-20 flex items-center border-b-2 border-border">
        <Link href="/" className="font-heading text-2xl font-black transition-transform hover:scale-105">
          RKD<span className="text-accent">!</span>
        </Link>
        <span className="ml-3 text-[10px] font-heading font-black text-white bg-accent border-2 border-border px-2 py-0.5 rounded-full shadow-pop-sm">
          Admin
        </span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-heading font-black uppercase tracking-wider transition-all
                ${active
                  ? "bg-tertiary text-foreground border-2 border-border shadow-pop-sm -translate-y-0.5"
                  : "text-mutedForeground hover:text-foreground hover:bg-muted"
                }`}
            >
              <span className="text-xl">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6 border-t-2 border-border pt-6 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-heading font-black uppercase tracking-wider text-mutedForeground hover:text-foreground hover:bg-muted transition-all"
        >
          <span className="text-lg">↗</span> View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-heading font-black uppercase tracking-wider text-mutedForeground hover:text-white hover:bg-secondary border-2 border-transparent hover:border-border transition-all"
        >
          <span className="text-lg">⏻</span> Logout
        </button>
      </div>
    </aside>
  );
}
