module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      build: {
        src: 'lib/index.js',
        dest: 'build/index.js'
      },
      instrumented: {
        src: 'coverage/lib/index.js',
        dest: 'coverage/build/index.js'
      },
      options: {
        standalone: 'CircularList'
      },
    },

    instrument: {
      files: 'lib/**/*.js',
      options: {
        basePath: 'coverage/'
      }
    },
  });

  // Grunt plugins must have been included in the
  // project and saved to the devDependencies
  // list in the package.json, e.g. by using
  // npm install <plugin name> --save-dev

  // Creates browserify task.
  grunt.loadNpmTasks('grunt-browserify');

  // Creates instrument task (amongst others).
  grunt.loadNpmTasks('grunt-istanbul');

  // Default task. Build the project.
  grunt.registerTask('default', ['browserify:build']);

  // Custom tasks. Instrument and build into the test directory.
  grunt.registerTask('build-instrumented', ['instrument', 'browserify:instrumented']);
};