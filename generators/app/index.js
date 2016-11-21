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

    var prompts = [{
      type: 'confirm',
      name: 'greet',
      message: 'Would you like to enable this option?',
      default: 'Welcome to Markakod Web Starter Kit'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.greet = props.greet;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dev/index.html'),
      this.destinationPath('dev/index.html')
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
        this.templatePath('dev/scripts/main.js'),
        this.destinationPath('dev/scripts/main.js')
    );

    this.fs.copy(
        this.templatePath('dev/styles/main.scss'),
        this.destinationPath('dev/styles/main.scss')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
