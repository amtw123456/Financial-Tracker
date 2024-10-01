import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        customPalette: {
          deepBlue: '#1E3A8A',
          skyBlue: '#3B82F6',
          turquoise: '#22D3EE',
          mintGreen: '#34D399',
          limeGreen: '#A3E635',
          yellow: '#FDE047',
          tangerine: '#F97316',
          coralRed: '#EF4444',
          magenta: '#D946EF',
          violet: '#8B5CF6',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
