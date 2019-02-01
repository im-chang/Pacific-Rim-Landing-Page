const gulp = require('gulp'),
  terser = require('gulp-terser'),
  rename = require('gulp-rename'),
  uglifycss = require('gulp-uglifycss'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp
    .src('./sass/*.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    )
    .pipe(gulp.dest('./build/css'))
    .pipe(uglifycss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function(done) {
  gulp.watch('sass/*.scss', gulp.series('sass'));
  gulp.watch('js/*.js', gulp.series('scripts'));
  done();
});

gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('build/css/*.css').on('change', browserSync.reload);
  done();
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
