var gulp        = require('gulp');
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var cleanCSS    = require('gulp-clean-css');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var changed     = require('gulp-changed');
var clean       = require('gulp-clean');
var svgmin      = require('gulp-svgmin');
var tinypng     = require('gulp-tinypng');
var newer       = require('gulp-newer');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

var server;

// Limpar pasta dist
gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});


// Imagens
gulp.task('tinypng', function () {
  return gulp.src('src/img/**/*.{jpg,jpeg,png,gif}')
    .pipe(newer('dist/img'))
    .pipe(tinypng('p8uaA5AO38jHg8oUvHpcXX0qoyvQE6l1'))
    .pipe(gulp.dest('dist/img'));
});
gulp.task('svgmin', function () {
    return gulp.src('src/img/**/*.svg')
      .pipe(newer('dist/img'))
      .pipe(svgmin())
      .pipe(gulp.dest('dist/img'));
});

// Font
gulp.task('font', function () {
  return gulp.src('src/webfonts/**/*')
    .pipe(gulp.dest('dist/webfonts/'));
});
gulp.task('iconfont', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('dist/webfonts'));
});
gulp.task('lgfont', function() {
    return gulp.src('node_modules/lightgallery/dist/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});



// Sass
gulp.task('cssmin', function () {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write ('./maps'))
  .pipe(gulp.dest('dist/css'))
});
gulp.task('cssdep', function() {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
   'node_modules/swiper/css/swiper.min.css',
    'node_modules/lightgallery/dist/css/lightgallery.min.css',
     'node_modules/@fortawesome/fontawesome-free/css/all.min.css'])
    .pipe(sourcemaps.init())
      .pipe(concat('alldep.css'))
      .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});



// Scripts
gulp.task('jsmin', function () {
  return gulp.src('src/js/**/*.js')
  .pipe(sourcemaps.init())
    .pipe(uglify())
  .pipe(sourcemaps.write ('./maps'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('jsdep', function() {
  return gulp
    .src(['node_modules/jquery/dist/jquery.slim.min.js',
     'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
       'node_modules/swiper/js/swiper.min.js',
        'node_modules/lightgallery/dist/js/lightgallery.min.js',
        'node_modules/axios/dist/axios.min.js',
        'node_modules/vue/dist/vue.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('alldep.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});



// Watch
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss',gulp.series('cssmin')),
  gulp.watch('src/js/**/*.js',gulp.series('jsmin')),
  gulp.watch('src/img/**/*',{cwd:'./'},gulp.series('tinypng','svgmin'))
});

// Compilar todas as tarefas
gulp.task('default',gulp.series('font','iconfont','lgfont','tinypng','svgmin','cssmin','jsmin','jsdep','cssdep','watch'));