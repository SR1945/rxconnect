import type { Config } from 'tailwindcss'

// Accessibility-first Tailwind config
// Larger base font sizes and comfortable line heights for older users
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        success: '#16a34a',
        warning: '#d97706',
        danger:  '#dc2626',
      },
      fontSize: {
        // Bumped up for older-adult readability
        'sm':   ['0.9375rem',  { lineHeight: '1.5rem' }],   // 15px
        'base': ['1.125rem',   { lineHeight: '1.75rem' }],  // 18px
        'lg':   ['1.25rem',    { lineHeight: '1.875rem' }], // 20px
        'xl':   ['1.5rem',     { lineHeight: '2rem' }],     // 24px
        '2xl':  ['1.875rem',   { lineHeight: '2.25rem' }],  // 30px
        '3xl':  ['2.25rem',    { lineHeight: '2.75rem' }],  // 36px
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        // Generous tap targets
        'touch': '2.75rem', // 44px minimum touch target
      }
    },
  },
  plugins: [],
}
export default config
