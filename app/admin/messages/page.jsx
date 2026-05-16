"use client";
import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    if (data.success) setMessages(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id) => {
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setMessages((msgs) => msgs.map((m) => m._id === id ? { ...m, read: true } : m));
  };

  const handleSelect = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg._id);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Messages</h1>
        <p className="text-mutedForeground font-body mt-1">
          {messages.length} total{unread > 0 && <span className="ml-2 badge">{unread} unread</span>}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card animate-pulse flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-border rounded w-1/4" />
                <div className="h-3 bg-border rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="card text-center py-16 text-mutedForeground">No messages yet.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Message list */}
          <div className="lg:col-span-2 space-y-2">
            {messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => handleSelect(msg)}
                className={`w-full text-left card transition-all cursor-pointer
                  ${selected?._id === msg._id ? "border-accent/60 bg-accent/5" : ""}
                  ${!msg.read ? "border-accent/30" : ""}
                `}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-0.5" />}
                    <span className={`font-display font-semibold text-sm ${!msg.read ? "text-foreground" : "text-mutedForeground"}`}>
                      {msg.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-mutedForeground flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-mutedForeground truncate pl-4">{msg.subject || msg.message}</p>
              </button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="card h-full">
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
                  <div>
                    <h2 className="font-display font-bold text-xl">{selected.name}</h2>
                    <a href={`mailto:${selected.email}`} className="text-accent-light text-sm font-mono hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  <span className="text-xs font-mono text-mutedForeground">
                    {new Date(selected.createdAt).toLocaleString()}
                  </span>
                </div>

                {selected.subject && (
                  <div className="mb-4">
                    <span className="text-xs font-mono text-mutedForeground uppercase tracking-wide">Subject</span>
                    <p className="text-foreground font-body mt-1">{selected.subject}</p>
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono text-muted uppercase tracking-wide">Message</span>
                  <p className="text-foreground font-body mt-2 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your message"}`}
                    className="btn-primary text-sm py-2 px-5"
                  >
                    ↗ Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="card h-64 flex items-center justify-center text-mutedForeground font-body">
                Select a message to read
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
