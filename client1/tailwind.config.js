/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                mobile: "0px",
                tablet: "600px",
                laptop: "960px",
                desktop: "1280px",
            },
            colors: {
                "main-purple": "#7367F0",
                hoverColor: "#f4f3f4",
                lightBlack: "#2f2b3d",
            },
            text: {
                "custom-sm": ".8125rem",
            },
        },
    },
    plugins: [],
};
