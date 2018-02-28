var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var compress = 'expanded'; // expanded, nested, compact, compressed

gulp.task('sass', function(){
   gulp.src('src/scss/**/*.scss')
       .pipe(sass({outputStyle: compress}).on('error', sass.logError))
       .pipe(concat('atomic_theme.css'))
       .pipe(autoprefixer())
       .pipe(gulp.dest('public/css'))
});

gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(concat('atomic_theme.js'))
        .pipe(gulp.dest('public/js'))
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
});