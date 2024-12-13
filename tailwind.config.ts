import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}', './services/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }
    }
  }
}

export default config
