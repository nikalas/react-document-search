/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,jsx}", "./index.js", "./view.js"],
	theme: {
		colors: {
			white: "#FFFFFF",
			black: "#000000",
			gray: {
				50: "#FAFAFA",
				100: "#EDEDED",
				200: "#D1D1D1",
				300: "#9D9D9C",
				400: "#636364",
			},
			primary: {
				100: "#D3DCF1",
				200: "#A4B9E1",
				300: "#7198CF",
				400: "#317ABF",
				500: "#0062AE",
			},
			secondary: {
				100: "#FAEFDB",
				200: "#F6E0B7",
				300: "#F1D093",
				400: "#EDC16F",
				500: "#F2AF32",
			},
			tertiary: {
				100: "#D7E6E1",
				200: "#B0CDC3",
				300: "#88B3A6",
				400: "#CCCCCC",
				500: "#B3B3B3",
			},
			fuchsia: "#A63783",
		},
	},
	extend: {},
	plugins: [],
};
