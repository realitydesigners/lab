/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				mono: "var(--font-mono)",
				sans: "var(--font-sans)",
				serif: "var(--font-serif)",
			},
			colors: {
				black: "#000",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
