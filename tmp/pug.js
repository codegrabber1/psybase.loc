'use strict';
const $ 				 = require('gulp-load-plugins')();

const gulp  	   		= require('gulp');
const multipipe  		= require('multipipe');
const pug   	 	 	= require('gulp-pug');
const debug 			= require('gulp-debug');
const cached     		= require('gulp-cached');
// const newer      = require('gulp-newer');

module.exports = function(options) {
  return function buildHTML(){
    return multipipe(
      gulp.src(options.src, {since: gulp.lastRun('pug')}),
      $.cached('pug'),
      //$.debug(),
      pug({
        'pretty': true,
        'compileDebug': true
      }),
      $.debug(),
      gulp.dest('dest')
    ).on('error', $.notify.onError());
  };
};
