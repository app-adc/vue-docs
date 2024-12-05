import { colors as bcColors } from './src/ABC/ui/bc-colors'
const { colors: defaultColors } = require('tailwindcss/defaultTheme')
const clr = require('tailwindcss/colors')

const colors = {
    ...defaultColors,
    ...bcColors,
    ...{
        smoke: clr.slate[50], //สี 4
        slate: { ...clr.slate, DEFAULT: clr.slate[700] },
    },
    backdrop: `var(--backdrop, 'rgba(0, 0, 0, 0.5)')`,
}
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors,
            gridTemplateColumns: {
                'fill-320': 'repeat(auto-fill, minmax(20rem, 1fr))',
            },
            width: {
                'min-xs': 'min(475px, 100vw)',
                'min-md': 'min(768px, 100vw)',
            },
            height: {
                'input-y': 'var(--h_input,44px)',
            },
            spacing: {
                ['nav-y']: 'var(--h_nav)',
            },
            borderWidth: {
                DEFAULT: '1px',
                0: '0',
                2: '2px',
            },
        },
    },
    plugins: [],
}
