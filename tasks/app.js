(function() {
    /**
     * App Task
     * This is the main task that is invoked for the processing of the slushfile.js
     */
    var gulp = require('gulp'),
        install = require('gulp-install'),
        conflict = require('gulp-conflict'),
        template = require('gulp-template'),
        rename = require('gulp-rename'),
        inquirer = require('inquirer'),
        _ = require('lodash');

    //Local dependencies
    var util = require('../util');

    module.exports = function(gulp) {
        'use strict';
        _.extend(_, require('underscore.string'));
        var examples = ["todo", "heat"];

        gulp.task('app', function(done) {
            var _this = this;
            //User Input
            inquirer.prompt([{
                    type: 'input',
                    name: 'name',
                    message: 'What do you want to name your AngularJS app?',
                    default: util.getDefaultOption(_this.args, 0) || util.getNameProposal()
                }, {
                    type: 'list',
                    name: 'csstype',
                    message: 'What CSS preprocessor do you want to use?',
                    default: 'sass',
                    choices: [{
                        name: 'Sass',
                        value: 'sass'
                    }]
                }],

                function(answers) {
                    //Hande for user response
                    answers.nameDashed = _.slugify(answers.nameApp);
                    answers.modulename = _.camelize(answers.nameDashed);

                    var files = [__dirname + '/../templates/app/**'];
                    var exclude = _.xor(examples, answers.example);
                    _.each(exclude, function(choice) {
                        files.push('!' + __dirname + '/../templates/app/src/app/modules/' + choice + '/**');
                        files.push('!' + __dirname + '/../templates/app/src/app/modules/' + choice);
                    });
                    answers.exampleSettings = {};
                    _.each(answers.example, function(item) {
                        answers.exampleSettings[item] = item;
                    });
                    answers.styleData = util.cssTypeData[answers.csstype];
                    // console.log("ANSWERS:", answers);
                    return gulp.src(files)
                        .pipe(template(answers))
                        .pipe(rename(function(file) {
                            if (file.extname === '.sass') {
                                file.extname = '.' + answers.styleData.extension;
                            } else if (file.basename[0] === '_') {
                                file.basename = '.' + file.basename.slice(1);
                            }
                        }))
                        .pipe(conflict('./'))
                        .pipe(gulp.dest('./'))
                        .pipe(install())
                        .on('finish', function() {
                            done();
                        });
                });
        });
    }

})();
