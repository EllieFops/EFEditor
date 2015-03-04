module.exports = function(grunt) {

  var dirE = 'dist/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>/';
  var filE = '<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>';

  // Project configuration.
  grunt.initConfig({
    buildnumber: {files: ['package.json']},
    pkg:         grunt.file.readJSON('package.json'),
    clean:       ['build', 'doc/<%= pkg.name %>-<%= pkg.version %>'],
    less:        {
      options: {
        compress: true,
        optimization: 0
      },
      dev: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>.min.css': 'src/EF.less'
        }
      }
    },
    uglify:      {
      build: {
        files: [
          {
            expand: true,
            cwd:    'src/',
            src:    ['**/*.js'],
            dest:   'build/',
            ext:    '.min.js',
            extDot: 'first'
          }
        ]
      }
    },
    concat:      {
      options: {
        banner:    '/**\n * <%= pkg.name %>\n * \n * Build: <%= pkg.build %>\n * Date:  <%= grunt.template.today("yyyy-mm-dd") %>\n */\n',
        separator: '\n'
      },
      dist:    {
        src:  ['build/Structure.min.js', 'build/efe/**/*.min.js'],
        dest: dirE + filE + '.min.js'
      }
    },
    jshint:      {
      options:      {
        curly:     true,
        forin:     true,
        eqeqeq:    true,
        maxparams: 5,
        nonew:     true,
        unused:    true,
        undef:     true,
        browser:   true,
        globals:   {
          EFEditor: true
        }
      },
      beforeconcat: ['src/efe/**/*.js']
    },
    yuidoc:      {
      compile: {
        name:        '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version:     '<%= pkg.version %>',
        options:     {
          paths:  'src/', //'src/**/*.js',
          outdir: 'doc/<%= pkg.name %>-<%= pkg.version %>/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-build-number');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.registerTask('default', ['clean', 'yuidoc', 'jshint', 'uglify', 'less', 'concat', 'buildnumber']);

};
