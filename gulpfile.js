
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const uglifycss = require('gulp-uglifycss');
const copy = require('gulp-copy');
const sequence = require('run-sequence');

const srcCSS = [
  './node_modules/bootstrap/dist/css/bootstrap.css',
  './src/assets/styles/**/*.css'
];
const srcJS = [
  './node_modules/vue/dist/vue.js',
  './src/services/*.js',
  './src/components/*.js',
  './src/main.js'
];
const dist = './dist';

gulp.task('clean', () => {
  del(['./dist/**/*']).then(paths => {});
});

gulp.task('build:css:prod', function() {
  return gulp.src(srcCSS)
    .pipe(concat('app.css'))
    .pipe(uglifycss({
      'maxLineLen': 80,
      'uglyComments': true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(dist));
});

gulp.task('build:css:dev', function() {
  return gulp.src(srcCSS)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(dist));
});

gulp.task('build:js:prod', () => {
  return gulp.src(srcJS)
    .pipe(concat('app.js'))
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(minify())
    .pipe(rename({ suffix: '' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist));
});

gulp.task('build:js:dev', () => {
  return gulp.src(srcJS)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dist));
});

gulp.task('fonts', () => {
  return gulp.src('./src/assets/fonts/**/*')
    .pipe(gulp.dest(dist + '/fonts'))
});

gulp.task('build:prod', callback => {
  sequence('clean', 'build:js:prod', 'build:css:prod', 'fonts', callback);
});
gulp.task('build:dev', callback => {
  sequence('clean', 'build:js:dev', 'build:css:dev', 'fonts', callback);
});

gulp.task('watch', ['build:dev'], () => {
  gulp.watch(['./src/**/*.js', './src/**/*.css'], ['build:dev']);
});