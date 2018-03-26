var gulp         			=   	require('gulp');
var browserSync  			=   	require('browser-sync').create(); //live browser refresher.
var compass 		 			=			require('gulp-compass');
var csslint 		 			=			require('gulp-csslint'); //cross browser css validator.
var fileReporter 			= 		require('gulp-csslint-filereporter'); //csslint reporter.
var sass              =     require('gulp-ruby-sass'); //SASS compiler.

var uncss 						= 		require('gulp-uncss'); //unused css remover.
var cssPrefix 				= 		require('gulp-css-prefix'); //to custom prefix to class name 'yt-'.
var stripCssComments 	= 		require('gulp-strip-css-comments'); //css comment remover
 
var gcmq 							= 		require('gulp-group-css-media-queries'); //for grouping all media queries.
var uglify 						= 		require('gulp-uglify'); //Beautify css.

var sourcemaps 				= 		require('gulp-sourcemaps'); //Generate css sourcemap.
var postcss      			= 		require('gulp-postcss'); //to add webkit for crossbrowser compatibility
var autoprefixer 			= 		require('autoprefixer'); //to add webkit for crossbrowser compatibility

var spritesmith 			= 		require('gulp.spritesmith'); //png to css sprite generator
var buffer 						= 		require('vinyl-buffer'); // support script
var imagemin 					= 		require('gulp-imagemin'); //image compressor

var paths = {
	css: 'resources/css',
	sass: 'resources/sass',
	img: 'resources/images',
	html: '*.html'
};

gulp.task('sprite', function generateSpritesheets () {
  // Use all normal and `-2x` (retina) images as `src`
  //   e.g. `github.png`, `github-2x.png`
  var spriteData = gulp.src(paths.img + '/icons/*.png')
    .pipe(spritesmith({
      // Filter out `-2x` (retina) images to separate spritesheet
      //e.g. `github-2x.png`, `twitter-2x.png`
      //retinaSrcFilter: [paths.img +'/icons/*@2x.png'],

      // Generate a normal and a `-2x` (retina) spritesheet
      imgName: 'sprite.png',
      //retinaImgName: 'sprite-2x.png',

      // Generate SCSS variables/mixins for both spritesheets
      cssName: '_sprites.scss',

      padding: 10 // Exaggerated for visibility, normal usage is 1 or 2
    }));

  // Deliver spritesheets to 'dist/' folder as they are completed
  spriteData.img.pipe(buffer())
  	.pipe(imagemin())
    .pipe(gulp.dest(paths.img+'/'));

  // Deliver SCSS to `/components/` to be imported by 'any.scss'
  spriteData.css.pipe(gulp.dest(paths.sass+'/components/'));
});

//Add prefix
gulp.task('autoprefixer', function () {
  return gulp.src('./src/*.css')
      //.pipe(sourcemaps.init())
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
      //.pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.css+'/'));
});

// Remove all css comments.
gulp.task('remove-comments', function () {
	return gulp.src(paths.css+'/*.css')
		.pipe(stripCssComments())//remove all comments.
		.pipe(gulp.dest(paths.css+'/'));
});

// Remove unused classes from .css file.
gulp.task('uncss', function() {
  gulp.src(paths.css+'/*.css')
    .pipe(uncss({
    	ignore: ['.unused'],
      html: ['*.html']
    }))
    .pipe(gulp.dest(paths.css+'/'));
});

// add preifx in all classes 'ytr-'.
// 'ytr-' change this.
gulp.task('css-prefixer', function() {
  return gulp.src(paths.css+'/*.css')
    .pipe(cssPrefix('ytr-'))
    .pipe(gulp.dest(paths.css+'/prefixer/'));
});

//	Compile SASS using Compass, 
//	Compass required as we using its utitlities
gulp.task('css', function(){
	return gulp.src( paths.sass + '/*.scss' )
		.pipe(compass({
			compass: true, 
			sourcemap: true, 
			sourcemapPath: 'paths.css',
			css: paths.css,
			sass: paths.sass, 
			comments: false
		}))
		.pipe(stripCssComments()) //remove all comments.
		.pipe(gcmq()) // Group media queries.
		.pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css+'/'));
});

//	Compile SASS using Compass, 
//	Compass required as we using its utitlities
gulp.task('compass', function(){
	return gulp.src( paths.sass + '/*.scss' )
		.pipe(compass({
			compass: true, 
			sourcemap: true, 
			sourcemapPath: 'paths.css',
			css: paths.css,
			sass: paths.sass, 
			task: 'watch', 
			comments: true
		}))
		.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
		.pipe(gcmq()); // Group media queries.
});

// csslint set config
fileReporter.setConfig({
  "treshhold": 4, 
  // the treshhold is the number of errors it needs to start writing log files (set to 0 if you always want log files)
  "directory": "resources/"
  // the directory to where the log files are written set empty if you want log files next to the original files (default = './log')
});

// CSS Lint report
gulp.task('csslint', function() {
  gulp.src(paths.css+'/*.css')
    .pipe(csslint({
      'adjoining-classes': false,
      'box-sizing':false
      }))
    .pipe(csslint.reporter(fileReporter.reporter));
});

// Watch task, keep checking for changes
gulp.task('watch', function(){
	gulp.watch([
		paths.sass + '/*.scss', 
		paths.html
	]).on('change', browserSync.reload);
});

//	LiveReload Task
gulp.task('serve', function(){
    browserSync.init([
    		paths.css + '/*.css', 
    		paths.html
    	], {
    		server:  './'
	});
});

gulp.task('default', ['compass', 'serve', 'watch'], function(){
    console.log('m called');
});