const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.html", "./src/**/*.js"
    ],
    theme: {
        container: {
            center: true
        },
        fontFamily: {
            inter: [
                'Inter+Tight', 'sans-serif'
            ],
            sans: [
                "Inter",
                ... defaultTheme.fontFamily.sans
            ],
            stock: [defaultTheme.fontFamily.sans]
        },
        extend: {
            backdropBlur: {
                'none': '0',
                'xs': '2px',
                'sm': '4px',
                'md': '10px',
                'lg': '24px',
                'xl': '40px',
                '2xl': '60px',
                '3xl': '80px'
            },
            boxShadow: {
                'login': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)'
            }
        }
    },
    variants: {
        extend: {
            backdropBlur: ['responsive']
        }
    },
    plugins: [
        require("@tailwindcss/forms"), 
        function ({matchUtilities, theme}) {
            matchUtilities({
                'text-shadow': (value) => (
                    {textShadow: value}
                )
            }, {values: theme('textShadow')})
        },
    ]
}
