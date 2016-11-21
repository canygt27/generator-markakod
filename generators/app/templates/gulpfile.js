var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');
var buffer = require('vinyl-buffer');
var $ = gulpLoadPlugins();

var dev = 'dev';
var dist = 'public';
var temp = '.tmp';

//iconfont task
var fontName = 'Test';

gulp.task('iconfont', function() {
    gulp.src([dev + '/images/svg/icons/*.svg'])
        .pipe($.iconfontCss({
            fontName: fontName,
            path: 'node_modules/gulp-iconfont-css/templates/_icons.scss',
            targetPath: '_icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe($.iconfont({
            fontName: fontName
        }))
        .pipe(gulp.dest(dev + '/fonts'));
});

//sprite task
gulp.task('sprite', function () {
    var spriteData = gulp.src(dev + '/images/icons/*.png').pipe($.spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '/images/sprite.png'
    }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe($.imagemin())
        .pipe(gulp.dest(dev + '/images/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest(dev + '/styles/template/utilities/icons'));
    return merge(imgStream, cssStream);
});

gulp.task('styles', function () {
    gulp.src(dev + '/styles/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: require('node-bourbon').includePaths
        }).on('error', $.sass.logError))
        .pipe($.sourcemaps.write())
        .pipe($.cssnano())
        .pipe(gulp.dest(temp + '/styles'))
        .pipe(gulp.dest(dist + '/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function () {
   return gulp.src(dev + '/scripts/**/*.js')
       .pipe(gulp.dest(temp + '/scripts'))
       .pipe(gulp.dest(dev + '/scripts'))
       .pipe(browserSync.reload({
           stream: true
       }));
});

gulp.task('fonts', function() {
    return gulp.src(dev + '/fonts/**/*')
        .pipe(gulp.dest(temp + '/fonts'))
        .pipe(gulp.dest(dist + '/fonts'));
});

gulp.task('images', function () {
    return gulp.src(dev + '/images/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest(dist + '/images'));
});

gulp.task('html', function () {
   return gulp.src(dev + '/*.html')
       .pipe(gulp.dest(dist));
});

gulp.task('serve', function() {
    runSequence(['styles', 'scripts', 'fonts'], function () {
        browserSync.init({
            port: 9000,
            notify: false,
            server: {
                baseDir: [dev, temp]
            }
        });
    });
    gulp.watch(dev + '/styles/**/*.scss', ['styles']);
    gulp.watch(dev + '/*.html', browserSync.reload);
    gulp.watch(dev + '/scripts/**/*.js', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch(dev + '/*.html', ['html']);
    gulp.watch(dev + '/styles/**/*.scss', ['styles']);
    gulp.watch(dev + '/scripts/**/*.js', ['scripts']);
});

gulp.task('build', ['html', 'styles', 'scripts', 'fonts', 'images']);