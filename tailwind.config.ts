import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#070707",
          secondary: "#0f0f0f",
          surface: "#161616",
          elevated: "#222222",
          accent: "#737373",
          highlight: "#ffffff",
          light: "#e5e5e5",
          muted: "#a3a3a3",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        serif: ["var(--font-cinzel)", "serif"],
      },
      boxShadow: {
        "glass-sm": "0 8px 24px -4px rgba(0, 0, 0, 0.5)",
        "glass-md": "0 16px 36px -6px rgba(0, 0, 0, 0.7)",
        "glass-lg": "0 24px 48px -8px rgba(0, 0, 0, 0.85)",
        "minimal-border": "0 0 0 1px rgba(255, 255, 255, 0.08)",
        "minimal-hover": "0 12px 30px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2)",
      },
      animation: {
        "float-slow": "float 8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "pulse-subtle": "pulseSubtle 5s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 3s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
