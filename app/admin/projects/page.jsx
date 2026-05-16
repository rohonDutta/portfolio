"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EMPTY = {
  title: "", description: "", longDescription: "",
  tech: "", github: "", live: "", image: "", featured: false, order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (data.success) setProjects(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm((f) => ({ ...f, image: data.data.url }));
        toast.success("Image uploaded!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (p) => {
    setForm({ ...p, tech: p.tech?.join(", ") || "" });
    setEditId(p._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("Project deleted");
      fetchProjects();
    } else {
      toast.error(data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = editId ? `/api/projects/${editId}` : "/api/projects";
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editId ? "Project updated!" : "Project created!");
        setForm(EMPTY);
        setEditId(null);
        setShowForm(false);
        fetchProjects();
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => { setForm(EMPTY); setEditId(null); setShowForm(false); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Projects</h1>
          <p className="text-mutedForeground font-body mt-1">{projects.length} total</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2 px-4">
            + New Project
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
          <h2 className="font-display font-bold text-xl mb-2">
            {editId ? "Edit Project" : "New Project"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label className="label">Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} className="input" />
            </div>
          </div>

          <div>
            <label className="label">Short Description *</label>
            <input name="description" value={form.description} onChange={handleChange} className="input" required />
          </div>

          <div>
            <label className="label">Long Description</label>
            <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows={3} className="input resize-none" />
          </div>

          <div>
            <label className="label">Tech Stack (comma separated)</label>
            <input name="tech" value={form.tech} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="input" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">GitHub URL</label>
              <input name="github" value={form.github} onChange={handleChange} className="input" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="label">Live URL</label>
              <input name="live" value={form.live} onChange={handleChange} className="input" placeholder="https://..." />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="label">Project Image</label>
              <div className="flex gap-2">
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="input"
                  placeholder="URL or Upload ->"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    disabled={uploading}
                  />
                  <button
                    type="button"
                    className="btn-outline text-xs whitespace-nowrap h-[42px] px-4"
                    disabled={uploading}
                  >
                    {uploading ? "..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3">
              <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-violet-500" />
              <label htmlFor="featured" className="text-sm font-body text-foreground cursor-pointer">Featured project</label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving || uploading} className="btn-primary text-sm py-2 px-5 disabled:opacity-60">
              {saving ? "Saving..." : editId ? "Update Project" : "Create Project"}
            </button>
            <button type="button" onClick={cancelEdit} className="btn-outline text-sm py-2 px-5">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Projects table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse flex gap-4 items-center">
              <div className="h-4 bg-border rounded w-1/3" />
              <div className="h-4 bg-border rounded w-1/4 ml-auto" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card text-center py-16 text-mutedForeground">No projects yet. Create one above.</div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-foreground truncate">{p.title}</span>
                  {p.featured && <span className="badge text-[10px]">★ Featured</span>}
                </div>
                <p className="text-mutedForeground text-sm mt-0.5 truncate font-body">{p.description}</p>
                {p.tech?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="badge text-[10px]">{t}</span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="text-xs text-mutedForeground font-mono">+{p.tech.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(p)} className="btn-outline text-xs py-1.5 px-3">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
