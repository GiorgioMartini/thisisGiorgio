// INCLUDE GULP
var gulp = require('gulp'),
// INCLUDE PLUGINS
    path          = require("path"),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    browserSync   = require('browser-sync'),
    autoprefixer  = require('gulp-autoprefixer'),
    fileinclude   = require('gulp-file-include');

var paths         = {
  templates:'src/templates',
};

// COPY FILES
gulp.task('copyFiles', function() {
  //  gulp.src(['src/slots.html'])
  //  .pipe(gulp.dest('src/games'));
});

//FILE INCLUDE
gulp.task('fileinclude',function(){
  return gulp.src(path.join(paths.templates, '*.tpl.html'))
  .pipe(fileinclude())
  .pipe(rename( {extname: ""}))
  .pipe(rename( {extname: '.html'}))
  .pipe(gulp.dest('build'));
});


//COPY STATIC FILES
var filesToMove = [
        'src/img/**/*.*',
        'src/images/**/*.*',
        'src/fonts/**/*.*',
        'src/vendor/**/*.*',
        'src/pdf/**/*.*',
        'src/videos/**/*.*',
    ];

gulp.task('copyStaticFiles', function(){
  gulp.src(filesToMove, { base: 'src/' })
  .pipe(gulp.dest('build'));
});

// COMPILE SASS
gulp.task('sass', function() {
    return gulp.src('src/wip_css/*.scss')
        .pipe(sass({indentedSyntax: true}))
        .pipe(sass({includePaths: ['src/wip_css']}))
        .pipe(gulp.dest('build/css'));
});

//AUTOPREFIXER
gulp.task('autoprefixer', function () {
    return gulp.src('build/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('sass-watch',['sass'], browserSync.reload);
gulp.task('prefix',['autoprefixer'], browserSync.reload);
gulp.task('copy',['copyFiles'], browserSync.reload);

//CONCAT & MINIFY JS
gulp.task('scripts', function() {
    return gulp.src(['src/wip_js/app.js',
                     'src/wip_js/sketch.js',
                     'src/vendor/velocity.min.js',
                     'src/vendor/velocity.ui.js',
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('js-watch',['scripts'], browserSync.reload);

// WATCH FILES
gulp.task('default', function() {
    browserSync({
      files: ['build/index.html','about.html'],
      server:{
        baseDir:'build',
        directory: true
      }
    });
    gulp.watch(['src/images/**/*.*','src/img/**/*.*','src/pdf/*.pdf','src/fonts/*.{eot,svg,ttf,woff}','src/vendor/**/*.{css,js,eot,svg,ttf,woff}','src/videos/*.{mp4,webm,jpg}'], ['copyStaticFiles']);
    gulp.watch('src/templates/*.html', ['fileinclude']);
    gulp.watch(['src/wip_js/*.js','src/vendor/*.js'], ['js-watch']);
    gulp.watch('src/wip_css/*.scss', ['sass-watch']);
    gulp.watch('build/css/*.css', ['prefix']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/*.html', ['copy']);
});
