module.exports = function(grunt) {
    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist',
                        src: 'jquery.min.js',
                        dest: 'www/js/lib'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/js',
                        src: 'bootstrap.min.js',
                        dest: 'www/js/lib'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css',
                        src: ['bootstrap-theme.min.css', 'bootstrap.min.css' ],
                        dest: 'www/css'
                    }
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    
    //Tasks
    grunt.registerTask('test', ['copy', 'karma']);
    
    //Default tasks

}