var gulp = require('gulp');
var exec = require('child_process').exec;
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');


gulp.task('start-server', function(cb){
	exec('node server.js', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('sass', function(){
	gulp.src('./source/scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer({browser: ['last 2 versions'] }) ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./client/css'));
		//.pipe(gulp.dest('./client/css'));
});

gulp.task('autoprefixer', function(){
	gulp.src('./client/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer({browser: ['last 2 versions'] }) ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./client/css'));
});

gulp.task('client-scripts', function(){
	return gulp.src(['./source/js/**/*.js'])
				.pipe(concat('app.js'))
				.pipe(gulp.dest('./client/js'));
});

gulp.task('watch', function(){
	gulp.watch('./source/scss/**/*.scss', ['sass']);
	gulp.watch('./source/js/**/*.js', ['client-scripts']);
	
});

gulp.task('default', ['watch', 'start-server']);
gulp.task('build-scripts', ['client-scripts']);
gulp.task('compile-sass', ['sass']);