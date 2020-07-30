const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
			colors: {
				primary: {
					500: "#FF6B1A",
					600: "#FF5A00",
				},
				secondary: {
					500: "#667eea",
					600: "#5a67d8"
				}
			}
		},
	},
  variants: {
		borderWidth: [ "responsive", "hover" ]
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
  ],
};
