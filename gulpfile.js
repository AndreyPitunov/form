var gulp          = require('gulp');
var rigger        = require('gulp-rigger');
var sourcemaps    = require('gulp-sourcemaps');
var uglify        = require('gulp-uglify');

var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var cssmin        = require('gulp-minify-css');

var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

var ghPages       = require('gulp-gh-pages');

var path = {

  sources: {
    js: "./app/js/app.js",
    styles: "./app/styles/app.scss"
  },

  build: {
    js: "./dist/js",
    styles: "./dist/styles"
  }

}

gulp.task('js', function () {

  return gulp.src(path.sources.js)
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}))

});

gulp.task('styles', function () {

  var processors = [
    autoprefixer({browsers: ['last 3 versions']}),
  ];

  return gulp.src(path.sources.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.styles))
    .pipe(reload({stream: true}))
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('watch', ['styles', 'js'],function () {
  browserSync({server: './dist/'});
  gulp.watch('./app/styles/**/*.*', ['styles']);
  gulp.watch('./app/js/**/*.*', ['js']);
  gulp.watch('./dist/**/*.html', reload);
  gulp.watch('./dist/images/**/*.*', reload);
});
