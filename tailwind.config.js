/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // פלטת המותג — אומתה ממסמך האפיון
        navy: {
          deep: '#001D4A',
          DEFAULT: '#002060',
          mid: '#003571',
        },
        sky: '#10A8EB',
        magenta: '#E2088C',
        surface: '#F7F7F7',
        ink: '#2C3E50',
      },
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 29, 74, 0.18)',
        pill: '0 8px 20px -6px rgba(16, 168, 235, 0.45)',
      },
    },
  },
  plugins: [],
}
