const sass = require('node-sass');
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'css/main.css': 'css/scss/main.scss'
                }
            }
        },
        terser: {
            my_target: {
                files: {
                    'js/min/main.min.js': ['js/main.js']
                }
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(),
                    require('autoprefixer')({overrideBrowerslist: ['last 2 versions']})
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        jshint: {
            options: {
                'esversion': 6
            },
            all: ['Gruntfile.js', 'js/main.js']
        },
        watch: {
            files: [
                '*.html',
                'js/*.js',
                'css/**/*.scss',
                'img/**/*.{png,jpg,gif,svg)'
            ],
            tasks: [
                'jshint', 'sass', 'terser', 'postcss'
            ]
        }
    });
    grunt.registerTask('default', ['watch']);
};