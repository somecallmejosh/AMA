var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var injectPartials = require('gulp-inject-partials');
var postcss = require('gulp-postcss');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
	var plugins = [
		autoprefixer({browsers: ['last 1 version']}),
		cssnano()
	];
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))	
		.pipe(postcss(plugins))
    .pipe(gulp.dest('./public/css'));
});

 
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(injectPartials({
			removeTags: true
		}))
    .pipe(gulp.dest('./public'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// Watch asset folder for changes
gulp.task('watch', ['sass', 'html'], function () {
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('build', function(callback) {
  runSequence('html', 'sass', callback);
});

