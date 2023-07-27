/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)'
      },
      fontFamily: {
        cabinet: ['Cabinet Grotesk Variable', 'sans'],
        consolas: ['Consolas', 'monospace'],
        inter: ['Inter', 'sans']
      },
      transitionDuration: {
        medium: '300ms',
        long: '500ms'
      }
    }
  },
  plugins: []
};
