import type { Config } from "tailwindcss"

const tailwindConfig: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default tailwindConfig
