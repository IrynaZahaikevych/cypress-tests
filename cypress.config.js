const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://google.com',
    // Вимикаємо пошук файлу support, щоб усунути помилку
    supportFile: false,
    setupNodeEvents(_on, _config) {
      // місце для плагінів
    },
  },
});
