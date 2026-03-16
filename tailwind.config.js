/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        canvas: {
          bg: "#1a1a2e",
          panel: "#16213e",
          sidebar: "#0f3460",
          accent: "#e94560",
          hover: "#1a1f3a",
        },
      },
    },
  },
  plugins: [],
};
