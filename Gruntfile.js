module.exports = function(grunt) {
    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: 'jquery.min.js',
                        dest: 'lib'
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