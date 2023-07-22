/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        roboto: ["Roboto"],
        montserrat: ["Montserrat"],
      },
      colors: {
        brand: {
          "main-color": "#F6F7FB",
          blue: "#1E86FF",
          "dark-blue": "#334680",
          "light-gray": "#B9BDCF",
          "dark-gray": "#282538",
        },
      },
      boxShadow: {
        "brand-sm": "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        4: "4px",
      },
      padding: {
        1.5: "6px",
        3.5: "12px",
      },
    },
  },
  plugins: [],
};
