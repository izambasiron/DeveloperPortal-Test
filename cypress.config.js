require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // viewportWidth: 430,
  // viewportHeight: 932,
  viewportHeight: 800,
  viewportWidth: 1200,
  watchForFileChanges: false,
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
