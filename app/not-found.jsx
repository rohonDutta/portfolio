import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-accent text-sm mb-4 tracking-widest">404</p>
        <h1 className="font-display text-5xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-mutedForeground font-body mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved to a different universe.
        </p>
        <Link href="/" className="btn-primary">
          ← Back Home
        </Link>
      </div>
    </div>
  );
}
