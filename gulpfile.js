var gulp = require('gulp')
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var cleancss = require('gulp-cleancss');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
var debug = require('gulp-debug');
var plumberNotifier = require('gulp-plumber-notifier');
const cached = require('gulp-cached');
var browserify = require('gulp-browserify');
const sassPartialsImported = require('gulp-sass-partials-imported');
var pugInheritance = require('gulp-pug-inheritance');
var imageResize = require('gulp-image-resize');
gulp.task('webserver', async function() {
  gulp.src('./dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: false,
      host: '0.0.0.0'
    }));
});

gulp.task('imgCopy',async function(){
  gulp.src('./app/img/*')
    .pipe(cached('images'))
    .pipe( gulp.dest('./dist/img/') )
  gulp.src('./app/img/**/*')
    .pipe(cached('images-1'))
    .pipe( gulp.dest('./dist/img/') )


  gulp.src('./app/img/content/*')
    .pipe(cached('images-3'))
    .pipe(imageResize({
      width : 320,
      upscale : true
    }))
    .pipe(gulp.dest('./dist/img/content/320/'));
  gulp.src('./app/img/content/*')
    .pipe(cached('images-2'))
    .pipe(imageResize({
      width : 360,
      upscale : true
    }))
    .pipe(gulp.dest('./dist/img/content/360/'));
  
  gulp.src('./app/img/content/*')
    .pipe(cached('images-4'))
    .pipe(imageResize({
      width : 420,
      upscale : true
    }))
    .pipe(gulp.dest('./dist/img/content/420/'));

  gulp.src('./app/img/content/*')
    .pipe(cached('images-5'))
    .pipe(imageResize({
      width : 640,
      upscale : true
    }))
    .pipe(gulp.dest('./dist/img/content/640/'));

  gulp.src('./app/img/content/*')
    .pipe(cached('images-5'))
    .pipe(imageResize({
      width : 800,
      upscale : true
    }))
    .pipe(gulp.dest('./dist/img/content/800/'));
})
gulp.task('jsBuild',async function(){
  gulp.src('./app/js/*.js')
    .pipe(plumberNotifier())
    .pipe(debug())
    .pipe(cached('js'))
    .pipe(debug())
    .pipe(browserify({
      
    }))
    .pipe( gulp.dest('./dist/js/') )
})
gulp.task('htmlBuild',async function(){
  gulp.src('./app/*.pug')
    .pipe(plumberNotifier())
    .pipe( pug({
      pretty: true
    }) )
    .pipe( gulp.dest('./dist/') )
})

gulp.task('cssBuild', async function(){
  gulp.src('./app/scss/*.sass')
  .pipe(plumberNotifier())
  .pipe(cached('sass'))
  .pipe(sassPartialsImported('./app/scss/', './app/scss/'))
  .pipe( sass() )
  .pipe(cleancss({keepBreaks: true}))
  .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
  }))
  .pipe( gulp.dest('./dist/css/'))
})

gulp.task('watcher', async function(){
  gulp.watch(['./app/img/*', './app/img/**/*'], gulp.series('imgCopy'))
  gulp.watch('./app/scss/*.sass', gulp.series('cssBuild'))
  gulp.watch('./app/js/*.js', gulp.series('jsBuild'))
  gulp.watch(['./app/*.pug','./app/chunks/*.pug'], gulp.series('htmlBuild'))
})
gulp.task('serve', gulp.parallel('watcher', 'webserver'))
gulp.task('default', async function(){
  console.log('Привіт')
})