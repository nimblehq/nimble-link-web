const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        black: {
          default: '#000',
          600: 'rgba(0, 0, 0, 0.6)',
        },
        blue: {
          default: '#3759FD',
        },
      },
      fontFamily: {
        sans: ['AktivGroteskCorp', ...defaultTheme.fontFamily.sans],
      },
      inset: {
        '1/2': '50%',
        ...defaultTheme.inset,
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
