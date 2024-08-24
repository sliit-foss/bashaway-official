/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx,json}'],
  theme: {
    extend: {
      boxShadow: {
        'section-badge': '0px 0px 20px 0px rgba(0, 0, 0, 0.04)'
      },
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)'
      },
      fontFamily: {
        cabinet: ['Cabinet Grotesk Variable', 'sans'],
        consolas: ['Consolas', 'monospace'],
        inter: ['Inter', 'sans']
      },
      maxWidth: {
        body: '1680px'
      },
      transitionDuration: {
        medium: '300ms',
        long: '500ms'
      },
      screens: {
        xxs: '350px',
        xs: '400px',
        xsm: '450px'
      }
    }
  },
  plugins: []
};
