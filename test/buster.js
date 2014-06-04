/**
 * Buster.js cofiguration file.
 */

var config = module.exports;

config['instrumented_tests'] = {
  rootPath: '../',
  environment: 'browser',
  sources: [
    'coverage/build/index.js'
  ],
  tests: [
    'test/tests/*.js'
  ],
  extensions: [
    require('buster-istanbul') // For reporting only.
  ],
  'buster-istanbul': {
    instrument: false, // The code has already been instrumented by the Grunt build task.
    silent: true, // Don't report the coverage results to stdout because we need to xml output only to go there.
    outputDirectory: 'coverage',
    format: ["cobertura", "lcov"]
  }
};
