/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './resources/views/*.php',
        './resources/ts/**/*.{js,vue,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            slate: colors.slate,
            stone: colors.stone,
            // indigo: colors.indigo,
            // yellow: colors.yellow,
            main: '#A0D1FB',
            mainHover: '#5aafff',
            second: '#F1F9FE',
            // second: '#ddd', // need to change
            third: '#E9E9E9',
        },
    },
    plugins: [],
};
