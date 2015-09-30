import gulp from 'gulp';
import babel from 'gulp-babel';

const paths = {
    es6: 'src/**/*.js',
    templates: 'src/**/templates/*'
};

// Compile ES2015 templates
gulp.task('compile', function() {
    return gulp.src(paths.es6)
        .pipe(babel())
        .pipe(gulp.dest('generators'));
});

// Copy generator templates
gulp.task('copy-templates', function() {
    return gulp.src(paths.templates)
        .pipe(gulp.dest('generators'));
});

// Watch files for changes
gulp.task('watch', function () {
    gulp.watch(paths.es6, ['compile']);
    gulp.watch(paths.templates, ['copy-templates']);
});

// Build task
gulp.task('build', ['compile', 'copy-templates']);

// Default task
gulp.task('default', ['build']);