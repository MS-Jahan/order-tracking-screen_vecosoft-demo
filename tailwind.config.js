/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: '#F7F6F2',
        surface: '#FFFFFF',
        brand: {
          DEFAULT: '#1E3A2F',
          soft: '#2D5A49',
        },
        success: '#059669',
        delayed: '#D97706',
        alert: '#DC2626',
        ink: {
          DEFAULT: '#192A24',
          soft: '#6B7280',
        },
        line: '#F1EFEA',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        micro: ['11px', { lineHeight: '1.45', fontWeight: '500' }],
        step: ['13px', { lineHeight: '1.4', fontWeight: '600' }],
        eta: ['22px', { lineHeight: '1.15', fontWeight: '800', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        shell: '0 24px 80px -24px rgb(25 42 36 / 0.28), 0 4px 16px rgb(25 42 36 / 0.08)',
        card: '0 1px 2px rgb(25 42 36 / 0.05)',
        raise: '0 8px 24px -8px rgb(25 42 36 / 0.18)',
      },
      borderRadius: {
        shell: '36px',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgb(217 119 6 / 0.45)' },
          '70%': { boxShadow: '0 0 0 8px rgb(217 119 6 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(217 119 6 / 0)' },
        },
        'pulse-green': {
          '0%': { boxShadow: '0 0 0 0 rgb(5 150 105 / 0.4)' },
          '70%': { boxShadow: '0 0 0 8px rgb(5 150 105 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(5 150 105 / 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-green': 'pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        'bounce-soft': 'bounce-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
