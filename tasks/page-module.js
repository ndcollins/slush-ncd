/**
 * module Task
 * This is the main task that is invoked for the processing of the slushfile.js
 */
(function() {

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    _ = require('underscore.string');

//Local dependencies
var util = require('../util');

module.exports = function(gulp) {
    'use strict';

    gulp.task('page-module', function(done) {
        var _this = this;
        var options  = util.getGlobalOptions();

        inquirer.prompt([{
            type: 'input',
            name: 'module',
            message: 'What is the name of your module?',
            default: util.getDefaultOption(_this.args, 0)
        }], function(answers) {
            //Init
            answers.nameDashed = _.slugify(util.getNameProposal());
            answers.scriptAppName =  _.camelize(answers.nameDashed) + '.' + answers.module ;
            answers.moduleName = _.classify(_.slugify(answers.module));
            answers.nameLower = _.camelize(_.slugify(answers.module));
            answers.moduleNameDashed = _.slugify( answers.module ).toLowerCase();

            //Generate
                gulp.src(__dirname + '/../templates/page-module/module-view.html')
                    .pipe(template(answers))
                    .pipe(rename(answers.moduleName + 'View.html'))
                    .pipe(conflict(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .pipe(gulp.dest(options.base + options.appDir +'/modules/'+ answers.nameLower))

                gulp.src(__dirname + '/../templates/page-module/module.sass')
                    .pipe(template(answers))
                    .pipe(rename('_' + answers.nameLower + '.sass'))
                    .pipe(conflict(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .pipe(gulp.dest(options.base + options.appDir +'/modules/'+ answers.nameLower))

                gulp.src(__dirname + '/../templates/page-module/ModuleController.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.moduleName + 'Controller.js'))
                    .pipe(conflict(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .pipe(gulp.dest(options.base + options.appDir +'/modules/'+ answers.nameLower))

                gulp.src(__dirname + '/../templates/page-module/ModuleController.spec.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.moduleName + 'Controller.spec.js'))
                    .pipe(conflict(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .pipe(gulp.dest(options.base + options.appDir +'/modules/'+ answers.nameLower))

                gulp.src(__dirname + '/../templates/page-module/moduleDirective.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.moduleName + 'Directive.js'))
                    .pipe(conflict(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .pipe(gulp.dest(options.base + options.appDir +'/modules/'+ answers.nameLower))

                gulp.src(__dirname + '/../templates/page-module/moduleRoutes.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.moduleName + 'Routes.js'))
                    .pipe(conflict(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .pipe(gulp.dest(options.base + options.appDir +'/modules/'+ answers.nameLower))

                gulp.src(__dirname + '/../templates/page-module/index.js')
                    .pipe(template(answers))
                    .pipe(conflict(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .pipe(gulp.dest(options.base + options.appDir +'/modules/'+ answers.nameLower))
                    .on('finish', function() {
                        done();
                    });
        });
    });
}

})();
