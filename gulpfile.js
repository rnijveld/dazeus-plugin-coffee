var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');
var babel = require('gulp-babel');

gulp.task('watch', function (cb) {
    nodemon({
      script: './index.js',
      ext: 'js',
      env: { NODE_ENV: 'development' }
    });
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest('dist'));
})

gulp.task('build', ['copy'], function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('run', ['build'], shell.task([
  'node dist/index.js'
]));
