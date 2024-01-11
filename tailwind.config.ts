import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     colors: {
      red: {
        primary: "#f53162",
        strong: "#ff8484",
        light: "#ffe5e5",

      },
      blue: {
        strong: "#3798ff",
        light: "#ebf4ff"
      },
      green: {
        strong: "#1cc850",
        light: "#e8f9ed"
      }
     }
    },
  },
  plugins: [],
}
export default config
