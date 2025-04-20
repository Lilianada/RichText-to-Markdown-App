import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "mark-1000": "#151619",
        "mark-900": "#1D1F22",
        "mark-800": "#2B2D31",
        "mark-700": "#35393F",
        "mark-600": "#5A6069",
        "mark-500": "#7C8187",
        "mark-400": "#C1C4CB",
        "mark-300": "#E4E4E4",
        "mark-200": "#F5F5F5",
        "mark-100": "#FFFFFF",
        "mark-orange": "#fdb52a",
        "mark-orange-hover": "#fdb52a80",
      },
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
        sans: ["Roboto", "sans-serif"],
        slab: ["Roboto Slab", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      backgroundImage: {
        'noise': "url('/Noise.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
