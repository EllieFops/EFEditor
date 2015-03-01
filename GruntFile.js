module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig(
    {
      buildnumber: {
        files: ['package.json']
      },
      pkg:    grunt.file.readJSON('package.json'),
      clean: ['build'],
      uglify: {
        build: {
          files: [{
            expand: true,
            cwd:    'src/',
            src:    ['**/*.js'],
            dest:   'build/',
            ext:    '.min.js',
            extDot: 'first'
          }]
        }
      },
      concat: {
        options: {
          banner: '/**\n * <%= pkg.name %>\n * \n * Build: <%= pkg.build %>\n * Date:  <%= grunt.template.today("yyyy-mm-dd") %>\n */\n',
          seperator: ';'
        },
        dist:    {
          src: 'build/*.min.js',
          dest: 'dist/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>.js'
        }
      }
    }
  );

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-build-number');

  grunt.registerTask('default', ['clean', 'buildnumber', 'uglify', 'concat']);

};
