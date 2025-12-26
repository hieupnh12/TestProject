import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-red': '#dc2626', // A vibrant red (Tailwind's red-600)
        'light-gray': '#f9fafb', // A very light gray for backgrounds
      },
    },
  },
  plugins: [],
} satisfies Config
