export default function Loading() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
        <p className="text-mutedForeground text-sm font-mono">Loading...</p>
      </div>
    </div>
  );
}
