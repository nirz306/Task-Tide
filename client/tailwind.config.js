/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      fontFamily: {
        code: [
          'source-code-pro',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Courier New"',
          'monospace',
        ],
        sans: ['Quicksand', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}