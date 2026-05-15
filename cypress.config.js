const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://google.com', // Замініть на сайт, який будете тестувати
		viewportWidth: 1920,
		viewportHeight: 1080,
		setupNodeEvents(on, config) {
			// місце для плагінів
		},
	},
});
