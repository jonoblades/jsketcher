import {defineConfig} from 'cypress';
import createPreprocessor from './test/cypress/preprocessor.mjs';
import webpackOptions from './test/cypress/webpack.config.js';

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    fixturesFolder: 'test/cypress/fixtures',
    specPattern: 'test/cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
    screenshotsFolder: 'test/cypress/screenshots',
    videosFolder: 'test/cypress/videos',
    supportFile: 'test/cypress/support/index.js',
    viewportWidth: 1600,
    viewportHeight: 1000,
    setupNodeEvents(on) {
      on('file:preprocessor', createPreprocessor(webpackOptions));
    }
  }
});
