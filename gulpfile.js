var gulp             = require('gulp'),
    sass             = require('gulp-sass'),
    browserSync      = require('browser-sync'),
    concat           = require('gulp-concat'),
    uglify           = require('gulp-uglifyjs'),
    cssnano          = require('gulp-cssnano'),
    rename           = require('gulp-rename'),
    del              = require('del'),
    imagemin         = require('imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    cache            = require('gulp-cache'),
    autoprefixer     = require('gulp-autoprefixer'),
    jade             = require('gulp-jade'),
    babel            = require('gulp-babel');

gulp.task('jade', function(){ 
  return gulp.src('app/jade/*.jade')
  .pipe(jade({ pretty: true }))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: [
      'last 15 versions',
      '> 1%',
      'ie 8',
      'ie 7'
    ],
    cascade: false
  }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('scripts', function(){
  return gulp.src([
    'app/js/common.js',
  ])
  .pipe(concat('common.min.js'))
  .pipe(uglify())
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest('app/js'))
})

gulp.task('styles', function(){
  return gulp.src([
    'app/css/main.css'
  ])
  .pipe(cssnano())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('app/css'))
})

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
})

gulp.task('img', function(){
  return(gulp.src('app/img/**/*'))
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{
      removeViewBox: false
    }],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('watch', ['browser-sync', 'jade', 'sass', 'styles', 'scripts'], function () {
  gulp.watch('app/jade/*.jade', ['jade']); 
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/**/*.html', browserSync.reload);
})

gulp.task('clean', function(){
  return del.sync('dist');
})

gulp.task('clear', function () {
  return cache.clearAll();
})

gulp.task('img', function () {
  return (gulp.src('app/img/**/*'))
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{
      removeViewBox: false
    }],
    use: [imageminPngquant()]
  })))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){
  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/main.min.css'
  ])
  .pipe(gulp.dest('dist/css'));
  
  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src(['app/js/**/*'])
  .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src(['app/*.html'])
  .pipe(gulp.dest('dist'));
})