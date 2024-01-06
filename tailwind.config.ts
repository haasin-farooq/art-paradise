import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        art: {
          primary: "rgb(181, 8, 56, 1)",
          "primary-dark": "rgb(162, 8, 50, 1)",
          gray: {
            dark: "rgba(51, 51, 51, 1)",
            light: "rgba(112, 112, 112, 1)",
            "extra-light": "rgba(155, 155, 155, 1)",
            stroke: "rgba(229, 229, 229, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
