"use strict";

const gulp      = require('gulp');
const bs        = require('browser-sync').create();
const wiredep   = require('wiredep').stream;
const sass      = require('gulp-sass');
const pug       = require('gulp-pug');
const concat    = require('gulp-concat');
const concatcss = require('gulp-concat-css');
const cached    = require('gulp-cached');
const multipipe = require('multipipe');
const notify    = require('gulp-notify');
const autopref  = require('gulp-autoprefixer');


// bower
gulp.task('bower', function() {
  return gulp.src('frontend/**/*.pug')
      .pipe(wiredep({
        directory : "frontend/bower_components"
      }))
      .pipe(gulp.dest('frontend/'));
});

/*== server ==*/
gulp.task('server', function () {
  bs.init({
    'server': 'frontend'
  });
  bs.watch('frontend/**/*.*').on('change', bs.reload);
});

/*== pug ==*/
gulp.task('pug', function buildHTML(){
  return multipipe(
    gulp.src('frontend/*.pug'),
    pug({
      'pretty': true,
      'compileDebug': true
    }),
    gulp.dest('frontend/')
  ).on('error', notify.onError());
});

/*== sass ==*/
gulp.task('sass',function(){
    return multipipe(
        gulp.src('frontend/sass/main.sass'),
        //cached('sass'),
        sass().on('error', sass.logError),
        autopref({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        concatcss('style.css'),
        gulp.dest('frontend')
    ).on('error', notify.onError());
});

/*== scripts ==*/
gulp.task('scripts', function(){
    return multipipe(
        gulp.src([
            'frontend/libs/jq.mmnu/js/jquery.mmenu.all.min.js',
            'frontend/libs/superfish/dist/js/superfish.js',
            'frontend/libs/simplyscroll/jquery.simplyscroll.min.js',
            'frontend/libs/flexslider/jquery.flexslider-min.js',
            'frontend/libs/semantic/public/semantic.min.js'
        ]),
        //cached('scripts'),
        concat('all.js'),
        gulp.dest('frontend/js')
    );
});

/*== watch ==*/
gulp.task('watch', function(){
    gulp.watch('frontend/sass/**/*.sass',['sass']);
    gulp.watch('frontend/js/*.js',['scripts']);
    gulp.watch('frontend/**/*.pug', ['pug']);
});
/*== default ==*/
gulp.task('default', ['watch', 'server']);