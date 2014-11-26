module.exports = function(grunt) {

    grunt.initConfig({
        serve: {
            options: {
                port: 9000
            }
        },
        dirs: {
            'bower_components': 'bower_components',
            'js': 'js',
            'tmp': 'dist/tmp',
            'css': 'css',
            'template': 'template',
            'img': 'img',
            'dist' : 'dist'
        },

        src: {
            output: {
                dist : '<%= dirs.dist %>'
            },

            input: {
                js: '<%= dirs.js %>',
                css: '<%= dirs.css %>',
                bower_components: '<%= dirs.bower_components %>'
            }
        },

        /********************************** Task **********************************/

        clean: {
            options: { force: true },
            before: ['<%= dirs.dist %>'],
            after: ['<%= dirs.tmp %>']
        },

        bower: {
            install: {
                options: {
                    targetDir: '<%= dirs.bower_components %>',
                    cleanTargetDir: true,
                    layout: 'byComponent',
                    install: true,
                    copy: false,
                    verbose: true
                }
            }
        },

        dev_prod_switch: {
            options: {
                environment: 'prod',
                env_char: '#',
                env_block_dev: 'env:dev',
                env_block_prod: 'env:prod'
            },
            all: {
                files: {
                    '<%= src.output.dist %>/index.html': 'index.html',
                    '<%= src.output.dist %>/js/app.min.js': '/js/app.js'
                }
            }
        },


        concat: {
            options: {
                stripBanners: {block: true, line: true},
                separator: '\n'
            },
            js: {
                src: [
                    '<%= src.input.js %>/**/*.js'
                ],
                dest: '<%= dirs.tmp %>/app.min.js'
            },
//            bower_components: {
//                src: [
//                    '<%= dirs.bower_components %>/jquery/dist/jquery.min.js',
//                    '<%= dirs.bower_components %>/angular/angular.min.js',
//                    '<%= dirs.bower_components %>/angular-ui-router/release/angular-ui-router.mn.js',
//                    '<%= dirs.bower_components %>/angular-translate/angular-translate.min.js',
//                    '<%= dirs.bower_components %>/bootstrap/dist/js/bootstrap.min.js',
//                    '<%= dirs.bower_components %>/angular-dynamic-locale/tmhDynamicLocale.min.js',
//                    '<%= dirs.bower_components %>/angular-scroll/angular-scroll.min.js'
//                ],
//                dest: '<%= src.output.dist %>/js/bower_components.min.js'
//            },
            css: {
                src: [
                    '<%= dirs.bower_components %>/bootstrap/dist/css/bootstrap.min.css',
                    '<%= dirs.bower_components %>/bootstrap/dist/css/bootstrap-theme.min.css',
                    '<%= dirs.bower_components %>/font-awesome/css/font-awesome.min.css',
                    '<%= dirs.bower_components %>/flag-icon-css/css/flag-icon.min.css',
                    '<%= dirs.css%>/cv.css'
                ],
                dest: '<%= src.output.dist %>/css/css.min.css'
            }
//            libsFooter: {
//                src: [
//                    '<%= dirs.vendor %>/ng-file-upload/angular-file-upload-shim.min.js',
//                    '<%= dirs.vendor %>/angular/angular.min.js',
//                    '<%= dirs.vendor %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
//                    '<%= dirs.vendor %>/angular-cookies/angular-cookies.min.js',
//                    '<%= dirs.vendor %>/angular-resource/angular-resource.min.js',
//                    '<%= dirs.vendor %>/ng-file-upload/angular-file-upload.min.js',
//                    '<%= dirs.vendor %>/angular-i18n/angular-locale_fr.js',
//                    '<%= dirs.vendor %>/angular-i18n/angular-locale_en.js',
//                    '<%= dirs.vendor %>/angular-translate/angular-translate.min.js',
//                    '<%= dirs.vendor %>/angular-ui-router/release/angular-ui-router.min.js'
//                ],
//                dest: '<%= src.output.dist %>/js/libs-footer.min.<%= hashBuild %>.js'
        },


//        less: {
//            app: {
//                options: {
//                    compress: true,
//                    cleancss: true,
//                    report: 'gzip',
//                    strictImports: true
//                },
//                files: {
//                    '<%= src.output.dist %>/css/tnd-app.<%= hashBuild %>.css': '<%= src.input.css %>/tnd-public.less'
//                }
//            }
//        },

        uglify: {
            dist: {
                files: {
                    '<%= src.output.dist %>/js/app.min.js': '<%= dirs.tmp %>/app.min.js'
                }
            }
        },

        copy: {
            main: {
                src: '<%= dirs.template %>/**',
                dest:  '<%= src.output.dist %>/'
            },
            bower_components: {
                src: [
                    '<%= dirs.bower_components %>/jquery/dist/jquery.min.js',
                    '<%= dirs.bower_components %>/angular/angular.min.js',
                    '<%= dirs.bower_components %>/angular-ui-router/release/angular-ui-router.min.js',
                    '<%= dirs.bower_components %>/angular-translate/angular-translate.min.js',
                    '<%= dirs.bower_components %>/bootstrap/dist/js/bootstrap.min.js',
                    '<%= dirs.bower_components %>/angular-dynamic-locale/tmhDynamicLocale.min.js',
                    '<%= dirs.bower_components %>/angular-scroll/angular-scroll.min.js'
                ],
                dest: '<%= src.output.dist %>/'
            },
            img: {
                src: '<%= dirs.img %>/**',
                dest:  '<%= src.output.dist %>/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-serve');
    grunt.registerTask('default', 'serve');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-dev-prod-switch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('partial', ['clean:before', 'dev_prod_switch', 'concat', 'uglify', 'copy', 'clean:after']);
    grunt.registerTask('full', ['clean:before', 'bower', 'dev_prod_switch', 'concat', 'uglify', 'copy', 'clean:after']);

};