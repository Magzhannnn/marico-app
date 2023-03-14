/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				textColor: '#707070',
				mainColor: '#000000',
				whiteColor: '#ffffff',
				hoverNav: '#3C82F4',
			},
			screens: {
				sm: "480px",
				md: "768px",
				lg: "1028px",
				xl: "1440px",
			}
		},
	},
	plugins: [],
};
