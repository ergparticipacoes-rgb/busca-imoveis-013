/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-[url(\'/bg-hero.svg\')]',
    'bg-yellow-400',
    'bg-yellow-200',
    'bg-gray-200',
    'text-[var(--petroleum)]',
    'bg-[var(--petroleum)]',
    'bg-[var(--gold)]',
    'text-[var(--gold)]',
    'ring-[var(--gold)]/30',
    'bg-[#1e2f39cc]',
    'bg-[#1e2f39]',
    'bg-[#243b47]',
    'bg-[#f6f9fb]',
    'from-[#1e2f39]',
    'to-[#243b47]',
    'text-white/80',
    'text-white/60',
    'border-[var(--gold)]/20',
  ],
  theme: {
    extend: {
      colors: {
        petroleum: '#1e2f39',
        gold: '#f5a623',
      },
    },
  },
  plugins: [],
}

