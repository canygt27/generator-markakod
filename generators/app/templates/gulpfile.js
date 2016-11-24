var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');
var buffer = require('vinyl-buffer');
var $ = gulpLoadPlugins();
var runSequence = require('run-sequence').use(gulp);

var dev = 'dev';
var dist = 'public';
var temp = '.tmp';

var appStyles = '/styles';
var appScripts = '/scripts';
var appImages = '/images';
var appFonts = '/fonts';

var devObj = {
    styles: dev + appStyles,
    scripts: dev + appScripts,
    images: dev + appImages,
    fonts: dev + appFonts
};

var distObj = {
    styles: dist + appStyles,
    scripts: dist + appScripts,
    images: dist + appImages,
    fonts: dist + appFonts
};

var tempObj = {
    styles: temp + appStyles,
    scripts: temp + appScripts,
    fonts: temp + appFonts
};

//iconfont task
var fontName = 'Icons';

gulp.task('iconfont', function() {
    gulp.src([devObj.images + '/svg/icons/*.svg'])
        .pipe($.iconfontCss({
            fontName: fontName,
            path: 'node_modules/gulp-iconfont-css/templates/_icons.scss',
            targetPath: '_icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe($.iconfont({
            fontName: fontName
        }))
        .pipe(gulp.dest(devObj.fonts));
});

//sprite task
gulp.task('sprite', function () {
    var spriteData = gulp.src(devObj.images + '/icons/*.png').pipe($.spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '/images/sprite.png'
    }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe($.imagemin())
        .pipe(gulp.dest(devObj.images));

    var cssStream = spriteData.css
        .pipe(gulp.dest(devObj.styles + '/template/utilities/icons'));
    return merge(imgStream, cssStream);
});

//style task
gulp.task('styles', function () {
    gulp.src(devObj.styles + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: require('node-bourbon').includePaths
        }).on('error', $.sass.logError))
        .pipe($.sourcemaps.write())
        .pipe($.cssnano())
        .pipe(gulp.dest(tempObj.styles))
        .pipe(gulp.dest(distObj.styles))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//browseify task for scripts
gulp.task('browserify', function() {
    gulp.src(devObj.scripts + '/**/*.js', {read: false})
        .pipe($.browserify({
            insertGlobals : true,
            debug : !gulp.env.production,
            paths: ['./node_modules', './' + devObj.scripts]
        }))
        .pipe($.uglify())
        .pipe(gulp.dest(tempObj.scripts))
        .pipe(gulp.dest(distObj.scripts))
});

//move font task
gulp.task('fonts', function() {
    return gulp.src(devObj.fonts + '/**/*')
        .pipe(gulp.dest(tempObj.fonts))
        .pipe(gulp.dest(distObj.fonts));
});

//move images taks
gulp.task('images', function () {
    return gulp.src(devObj.images + '/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest(distObj.images));
});

//copy html task
gulp.task('html', function () {
    return gulp.src(dev + '/*.html')
        .pipe(gulp.dest(dist));
});

//work localhost on frontend task
gulp.task('serve', function() {
    runSequence(['styles', 'browserify', 'fonts'], function () {
        browserSync.init({
            port: 9000,
            notify: false,
            server: {
                baseDir: [dev, temp]
            }
        });
    });
    gulp.watch(devObj.styles + '/**/*.scss', ['styles']);
    gulp.watch(dev + '/*.html', browserSync.reload);
    gulp.watch(devObj.scripts + '/**/*.js', browserSync.reload);
});

//for backend integration watch task
gulp.task('watch', function() {
    gulp.watch(devObj.styles + '/**/*.scss', ['styles']);
    gulp.watch(devObj.scripts + '/**/*.js', ['browserify']);
});

//for build task
gulp.task('build', ['html', 'styles', 'browserify', 'fonts', 'images']);