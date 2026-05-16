import "./globals.css";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata = {
  title: "Rohon Kumar Dutta — Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and AI integration. Building scalable web applications.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "AI", "Web Development"],
  authors: [{ name: "Rohon Kumar Dutta" }],
  openGraph: {
    title: "Rohon Kumar Dutta — Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and AI integration.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohon Kumar Dutta — Full Stack Developer",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-ink text-foreground font-body antialiased">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A1A26",
              color: "#E8E8F0",
              border: "1px solid #2A2A3E",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
