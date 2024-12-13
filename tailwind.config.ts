import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './services/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    }
  },
  plugins: [],
}

export default config
