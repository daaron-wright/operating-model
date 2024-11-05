/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        everett: ['TW Everett', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
        'heading-2': ['1.5rem', { lineHeight: '2rem', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}