"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function StatCard({ label, value, icon, href }) {
  return (
    <Link href={href} className="card hover:border-accent/40 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-mono text-mutedForeground group-hover:text-accent-light transition-colors">
          Manage →
        </span>
      </div>
      <div className="font-display text-3xl font-bold text-foreground">{value ?? "—"}</div>
      <div className="text-mutedForeground text-sm mt-1 font-body">{label}</div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: null, skills: null, messages: null });

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/contact").then((r) => r.json()),
    ]).then(([p, s, c]) => {
      setStats({
        projects: p.data?.length ?? 0,
        skills: s.data?.skills?.length ?? 0,
        messages: c.data?.length ?? 0,
      });
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-mutedForeground font-body mt-1">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Projects" value={stats.projects} icon="◈" href="/admin/projects" />
        <StatCard label="Skills Listed" value={stats.skills} icon="⬡" href="/admin/skills" />
        <StatCard label="Messages" value={stats.messages} icon="@" href="/admin/messages" />
      </div>

      <div className="card">
        <h2 className="font-display font-bold text-lg mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects" className="btn-primary text-sm py-2 px-4">
            + Add Project
          </Link>
          <Link href="/admin/skills" className="btn-outline text-sm py-2 px-4">
            + Add Skill
          </Link>
          <Link href="/" target="_blank" className="btn-outline text-sm py-2 px-4">
            ↗ View Site
          </Link>
        </div>
      </div>
    </div>
  );
}
