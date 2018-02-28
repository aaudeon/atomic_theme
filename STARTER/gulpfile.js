var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var compress = 'expanded'; // expanded, nested, compact, compressed

gulp.task('sass', function(){
   gulp.src('src/scss/**/*.scss')
       .pipe(sass({outputStyle: compress}).on('error', sass.logError))
       .pipe(concat('style.css'))
       .pipe(autoprefixer())
       .pipe(gulp.dest('css'))
});

gulp.task('scripts', function(){
    gulp.src('src/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'))
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});