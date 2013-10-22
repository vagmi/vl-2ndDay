var grunt = require('grunt');
grunt.initConfig({
    'http-server':

            {
                root: ".",

                port: 8282,
                host: "127.0.0.1",

                showDir : true,
                autoIndex: true,
                defaultExt: "html",

                //wait or not for the process to finish
                runInBAckground: false
            }

});
grunt.loadNpmTasks('grunt-http-server');
