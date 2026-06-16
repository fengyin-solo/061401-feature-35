/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#0f0f14',
        'game-card': '#1a1a24',
        'game-card-hover': '#22222e',
        'game-border': '#2a2a3a',
        'danger-safe': '#10b981',
        'danger-caution': '#f59e0b',
        'danger-warning': '#f97316',
        'danger-danger': '#ef4444',
        'danger-critical': '#dc2626',
        'danger-safe-bg': 'rgba(16, 185, 129, 0.1)',
        'danger-caution-bg': 'rgba(245, 158, 11, 0.12)',
        'danger-warning-bg': 'rgba(249, 115, 22, 0.15)',
        'danger-danger-bg': 'rgba(239, 68, 68, 0.18)',
        'danger-critical-bg': 'rgba(220, 38, 38, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'pulse-warning': 'pulseWarning 1.2s infinite',
        'pulse-danger': 'pulseDanger 0.8s infinite',
        'pulse-critical': 'pulseCritical 0.5s infinite',
        'glow-critical': 'glowCritical 1s infinite',
        'shake-danger': 'shakeDanger 0.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        pulseWarning: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        pulseDanger: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.04)' },
        },
        pulseCritical: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.08)' },
        },
        glowCritical: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(220, 38, 38, 0.5), 0 0 10px rgba(220, 38, 38, 0.3)' },
          '50%': { boxShadow: '0 0 15px rgba(220, 38, 38, 0.8), 0 0 30px rgba(220, 38, 38, 0.5)' },
        },
        shakeDanger: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
      },
    },
  },
  plugins: [],
}
