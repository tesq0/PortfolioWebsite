const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
			colors: {
				facebook: "#3b5998",
				reddit: "#FF5700",
				twitter: "#1da1f",
				linkedin: "#0e76a8",
				youtube: "#c4302b",
				primary: {
					500: "#FF6B1A",
					600: "#FF5A00",
				},
				secondary: {
					500: "#667eea",
					600: "#5a67d8"
				}
			},
			spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      }
		},
	},
  variants: {
		borderWidth: [ "responsive", "hover" ],
		margin: [ "responsive", "odd" ],
		padding: [ "responsive", "odd", "even" ]
	},
  purge: {
    content: [
      './**/*.htm',
      './assets/**/*.js',
      './assets/**/*.jsx',
      './assets/**/*.ts',
      './assets/**/*.tsx',
      './assets/**/*.vue',
      './assets/**/*.twig',
    ],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
      whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/, /show$/],
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
		require('@tailwindcss/typography')
	],
};
