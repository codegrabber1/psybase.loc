"use strict";

const gulp      = require('gulp');
const bs        = require('browser-sync').create();
const wiredep   = require('wiredep').stream;
const sass      = require('gulp-sass');
const concat    = require('gulp-concat');
const cached    = require('gulp-cached');
const multipipe = require('multipipe');
const notify    = require('gulp-notify');
const autopref  = require('gulp-autoprefixer');


// bower
gulp.task('bower', function() {
  return gulp.src('frontend/*.html')
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

/*== sass ==*/
gulp.task('sass',function(){
    return multipipe(
        gulp.src('frontend/sass/main.sass'),
        cached('sass'),
        sass().on('error', sass.logError),
        autopref({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        gulp.dest('frontend')
    ).on('error', notify.onError());
});

/*== scripts ==*/
gulp.task('scripts', function(){
    return multipipe(
        gulp.src([
            'frontend/'
        ]),
        cached('scripts'),
        concat('all.js'),
        gulp.dest('frontend/js')
    );
});

/*== watch ==*/
gulp.task('watch', function(){
    gulp.watch('frontend/sass/*.sass',['sass']);
});
/*== default ==*/
gulp.task('default', ['watch']);