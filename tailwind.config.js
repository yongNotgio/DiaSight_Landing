/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        dark: {
          DEFAULT: '#000000',
          light: '#0a0a0a',
          lighter: '#141414',
        },
      },
      fontFamily: {
        // Single source of truth for the stacks lives in src/index.css (:root).
        // Real brand names (Conthrax / TT Firs Neue) are listed first there, so
        // self-hosting the licensed fonts later needs no code changes here.
        sans: 'var(--font-body)',
        heading: 'var(--font-heading)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
