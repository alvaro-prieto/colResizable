"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    terser: {
      dist: {
          files: [
                {
                    src: ["colResizable-1.6.js"],
                    dest: "colResizable-1.6.min.js"
                }
          ]
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-terser");

  // Default task.
  grunt.registerTask("default", ["terser"]);

};
