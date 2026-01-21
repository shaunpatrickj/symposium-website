/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          900: '#164e63',
        },
      },
      fontFamily: {
        serif: ['Ethnocentric', 'Georgia', 'serif'],
        display: ['Ethnocentric', 'playfair Display', 'serif'],
        tech: ['Ethnocentric', 'Chakra Petch', 'sans-serif'],
        sans: ['Ethnocentric', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.05em',
      },
    },
  },
  plugins: [],
}
