/**
 * Created by zpq on 1/30/16.
 */

var gulp = require('gulp');
var jshint = require("gulp-jshint");

gulp.task('jscheck', function() {
    gulp.src('app.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.watch('app.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default', function() {
    gulp.start(['jscheck']);
});