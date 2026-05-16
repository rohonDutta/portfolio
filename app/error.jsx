"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="bg-[#0A0A0F] text-[#E8E8F0] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-red-400 text-sm mb-4">Something went wrong</p>
          <h1 className="text-3xl font-bold mb-4">{error.message || "Unexpected Error"}</h1>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7C3AED] text-white rounded-lg hover:bg-[#7C3AED]/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
