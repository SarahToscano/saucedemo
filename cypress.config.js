const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    chromeWebSecurity: false,
  },
  browsers: [
    {
      name: 'chrome',
      family: 'chromium',
      channel: 'stable',
      displayName: 'Chrome',
      version: 'latest',
      path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      minSupportedVersion: 64,
      majorVersion: 'latest',
    },
  ],
});