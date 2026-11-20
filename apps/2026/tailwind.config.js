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
        // Tailwind 3 default; 4.3.3 dropped system-ui, which changes the fallback font on Linux
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
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
        xxs: '21.875rem',
        xs: '25rem',
        xsm: '28.125rem'
      }
    }
  },
  plugins: []
};
