"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Tools", "AI/ML", "Other"];
const EMPTY = { name: "", category: "Frontend", level: 80, icon: "⚡", order: 0 };

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    if (data.success) setSkills(data.data.skills);
    setLoading(false);
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "level" || name === "order" ? Number(value) : value }));
  };

  const handleEdit = (s) => {
    setForm(s);
    setEditId(s._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) { toast.success("Skill deleted"); fetchSkills(); }
    else toast.error(data.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = editId ? `/api/skills/${editId}` : "/api/skills";
    const method = editId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editId ? "Skill updated!" : "Skill added!");
        setForm(EMPTY);
        setEditId(null);
        setShowForm(false);
        fetchSkills();
      } else toast.error(data.error);
    } catch { toast.error("Save failed"); }
    finally { setSaving(false); }
  };

  const cancelEdit = () => { setForm(EMPTY); setEditId(null); setShowForm(false); };

  const categories = ["All", ...CATEGORIES];
  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Skills</h1>
          <p className="text-mutedForeground font-body mt-1">{skills.length} total</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2 px-4">
            + Add Skill
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
          <h2 className="font-display font-bold text-xl">{editId ? "Edit Skill" : "New Skill"}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Skill Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className="input" required placeholder="e.g. React" />
            </div>
            <div>
              <label className="label">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className="input">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Icon (emoji)</label>
              <input name="icon" value={form.icon} onChange={handleChange} className="input" maxLength={4} />
            </div>
            <div>
              <label className="label">Proficiency Level ({form.level}%)</label>
              <input type="range" name="level" min={10} max={100} step={5} value={form.level} onChange={handleChange} className="w-full mt-2 accent-violet-500" />
            </div>
            <div>
              <label className="label">Display Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} className="input" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-60">
              {saving ? "Saving..." : editId ? "Update Skill" : "Add Skill"}
            </button>
            <button type="button" onClick={cancelEdit} className="btn-outline text-sm py-2 px-5">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all
              ${activeCategory === cat
                ? "bg-accent text-white"
                : "bg-surface border border-border text-mutedForeground hover:border-accent/50 hover:text-foreground"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse space-y-3">
              <div className="h-5 bg-border rounded w-1/2" />
              <div className="h-2 bg-border rounded-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16 text-mutedForeground">No skills in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <div key={skill._id} className="card group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-display font-semibold text-foreground">{skill.name}</span>
                </div>
                <span className="badge text-[10px]">{skill.category}</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono text-mutedForeground mb-1">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(skill)} className="btn-outline text-xs py-1 px-3 flex-1">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="text-xs px-3 py-1 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
