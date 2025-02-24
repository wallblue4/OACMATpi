/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        'title': '24px',
        'body': '16px',
        'button': '14px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        primary: '#1E40AF',
        secondary: '#60A5FA',
        success: '#059669',
        warning: '#EA580C',
        background: '#F3F4F6',
        dark: '#111827',
      },
    },
  },
  plugins: [],
};