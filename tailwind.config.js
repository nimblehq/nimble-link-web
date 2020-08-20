const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      borderWidth: {
        3: '3px',
      },
      colors: {
        black: {
          ...defaultTheme.colors.black,
          300: 'rgba(0, 0, 0, 0.3)',
          default: '#000',
          600: 'rgba(0, 0, 0, 0.6)',
        },
        blue: {
          ...defaultTheme.colors.blue,
          default: '#3759FD',
          400: 'rgba(55, 89, 253, 0.32)',
          600: '#1338EB',
          700: '#0325CC',
        },
        gray: {
          ...defaultTheme.colors.gray,
          default: '#D4D5D8',
          100: '#F8F8F8',
          200: '#F5F5F5',
        },
        white: {
          ...defaultTheme.colors.white,
          default: '#fff',
          70: 'rgba(0, 0, 0, 0.07)',
        },
      },
      fontFamily: {
        sans: ['AktivGroteskCorp', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        ...defaultTheme.fontSize,
        large: '1.75rem',
        xlarge: '2.875rem',
      },
      lineHeight: {
        ...defaultTheme.lineHeight,
        'extra-loose': '3.375rem',
      },
      height: {
        14: '3.5rem',
        18: '4.5rem',
      },
      inset: {
        '1/2': '50%',
        8: '32px',
        ...defaultTheme.inset,
      },
      boxShadow: {
        ...defaultTheme.inset,
        outline: '0 0 0 2px rgba(55, 89, 253, 0.32)',
      },
      zIndex: {
        '-10': '-10',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
