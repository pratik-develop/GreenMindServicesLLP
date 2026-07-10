import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: {
          DEFAULT: "hsl(var(--bg-page))",
          soft: "hsl(var(--bg-page-soft))",
          elevated: "hsl(var(--bg-page-elevated))",
        },
        primary: {
          DEFAULT: "hsl(var(--text-primary))",
          muted: "hsl(var(--text-muted))",
          light: "hsl(var(--text-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          light: "hsl(var(--accent-light))",
          dark: "hsl(var(--accent-dark))",
        },
        card: {
          DEFAULT: "hsl(var(--card-bg))",
          border: "hsl(var(--card-border))",
        },
        cream: {
          DEFAULT: "#F7F3EC",
          light: "#FAF8F4",
          dark: "#EDE8DF",
        },
        forest: {
          deep: "#152E1C",
          mid: "#1E5C30",
          light: "#2D7A3E",
        },
        gold: {
          DEFAULT: "#B8872A",
          light: "#D4A84D",
          dark: "#8B6518",
        },
        sage: {
          DEFAULT: "#7DB89A",
          light: "#A5D4BB",
          dark: "#5A8F73",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.02em",
      },
    },
  },
  plugins: [],
}

export default config
