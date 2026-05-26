const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      guestUser: 'guest',
      guestPassword: 'welcome2qauto',
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-blink-features=BlockCredentialedSubresources');
        }
        return launchOptions;
      });
      return config;
    },
  },
});
