var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var sources = [
    'src/intro.js',
    'src/bridge.js',
    'src/client.js',
    'src/util.js',
    'src/exports.js',
    'src/outro.js'
];

gulp.task('bulid', function(){
    return gulp.src(sources)
        .pipe( concat('jsbridge.js') )
        .pipe( gulp.dest('dist/') )
        .pipe( uglify({
            banner: 'jsbridge - bridge for IOS&Android | https://github.com/90Team/jsbridge'
        }))
        .pipe( rename('jsbridge.min.js') )
        .pipe( gulp.dest('dist/') );
});
