/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Outfit'", "system-ui", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        background: "#FFFDF5",
        foreground: "#1E293B",
        muted: "#F1F5F9",
        mutedForeground: "#64748B",
        accent: "#8B5CF6",
        accentForeground: "#FFFFFF",
        secondary: "#F472B6",
        tertiary: "#FBBF24",
        quaternary: "#34D399",
        border: "#1E293B", // Strong borders
        input: "#FFFFFF",
        card: "#FFFFFF",
        ring: "#8B5CF6",
      },
      boxShadow: {
        'pop-sm': '2px 2px 0px 0px #1E293B',
        'pop': '4px 4px 0px 0px #1E293B',
        'pop-md': '6px 6px 0px 0px #1E293B',
        'pop-lg': '8px 8px 0px 0px #1E293B',
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pop-in": "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "wiggle": "wiggle 0.3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
