'use strict';
const $ 				 = require('gulp-load-plugins')();

const gulp  	 = require('gulp');
const multipipe  = require('multipipe');
const concatcss  = require('gulp-concat-css');
const autopref   = require('gulp-autoprefixer');
const cached     = require('gulp-cached');
const remember   = require('gulp-remember');
const debug 	 = require('gulp-debug');
//const newer      = require('gulp-newer');

module.exports = function (options) {
  return function(){
    return multipipe(
        gulp.src(options.src),
        //$.cached('sass'),
        //newer('dest'),
        $.debug(),
        $.sass().on('error', $.sass.logError),
        autopref(),
        $.remember('sass'),
        concatcss('style.css'),
        $.debug(),
        gulp.dest('dest')
    ).on('error', $.notify.onError());
  };
};
