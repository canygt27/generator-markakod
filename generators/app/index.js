'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the groundbreaking ' + chalk.red('generator-markakod') + ' generator!'
    ));

    var welcome =
        'MARKAKOD WEB APPLİCATİON STARTER KIT';
    console.log(welcome);

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name?',
      default: this.appname
    }];

    return this.prompt(prompts).then(function (props) {
      var done = this.async();
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log(props.name);
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dev/index.html'),
      this.destinationPath('dev/index.html'), {
          name: this.props.name
        }
    );

    this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
    );

    this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
    );

    this.fs.copy(
        this.templatePath('dev/fonts'),
        this.destinationPath('dev/fonts')
    );

    this.fs.copy(
        this.templatePath('dev/images'),
        this.destinationPath('dev/images')
    );

    this.fs.copy(
        this.templatePath('dev/js/main.js'),
        this.destinationPath('dev/js/main.js')
    );

    this.fs.copy(
        this.templatePath('dev/scss/main.scss'),
        this.destinationPath('dev/scss/main.scss')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
