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
      this.templatePath('templates/'),
      this.destinationPath('templates/')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
