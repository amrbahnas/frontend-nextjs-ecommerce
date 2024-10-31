import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "150": "150px",
        "300": "300px",
        "250": "250px",
        "450": "450px",
        // Add more values as needed =>w-450 => width: 450px
      },
      colors: {
        primary: "#F35C7A",
      },
      gridTemplateColumns: {
        //grid-cols-autoFit
        autoFit: "repeat(auto-fit, minmax(min(150px,100%), 1fr))",
      },
    },
  },
  plugins: [
    // for grid-cols-autoFit-number
    plugin(function ({ addUtilities, theme, e }) {
      const values = theme("spacing") || {};
      const newUtilities = Object.keys(values).reduce<Record<string, any>>(
        (acc, key) => {
          acc[`.${e(`grid-cols-autoFit-${key}`)}`] = {
            gridTemplateColumns: `repeat(auto-fit, minmax(min(${values[key]}, 100%), 1fr))`,
          };
          return acc;
        },
        {}
      );

      addUtilities(newUtilities);
    }),
  ],
};
export default config;
