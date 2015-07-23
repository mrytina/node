var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less');

gulp.task('less', function () {
    return gulp.src('public/css/*.less')
        .pipe(less({
            paths: [__dirname]
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('templates', ['less'], function() {
    return gulp.src('**/*.{html,css,jade}')
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function(){
    browserSync({
        proxy: "http://localhost:3000",
        port: 3001
    });

    gulp.watch('**/*.{html,css,jade,less}', ['templates']);
});

gulp.task('restartserver', function () {
    nodemon({ script: 'server.js', ext: 'js', ignore: ['public/**'] })
        .on('restart', function () {
            console.log('restarted!')
        })
});

gulp.task('default', ['watch', 'restartserver']);