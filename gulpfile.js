var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
  minifyCSS = require('gulp-minify-css'),
	jshint = require('gulp-jshint'), 
	stylish = require('jshint-stylish'),
	inject = require('gulp-inject'),
	wiredep = require('wiredep').stream,
  imagesop = require('gulp-image-optimization'),
  gulpif = require('gulp-if'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify');

config={
  rutserver:{
    app: './app/',
    dist: './dist'
  },
  html:{
    main: './app/index.html'
  },
  styles:{
    main: './app/css/styles/main.styl',
    watch: './app/css/styles/**/*.styl',
    output: './app/css',
  },
  js:{
    watch: './app/js/**/*.js',
  },
  wiredep:{
    main: './app/index.html',
    output: './app'
  },
  inject:{
    main: './app/index.html',
    js_and_css: ["./app/js/**/*.js", "./app/css/**/*.css"],
    output: './app'
  },
  images:{
    watch: ['./app/img/**/*.png','./app/img/**/*.jpg','./app/img/**/*.svg'],
    output: './dist/img'
  },
  useref:{
    main: './app/index.html',
    output: './dist'
  }
}
//server for develop
gulp.task('server', function() {
  gulp.src(config.rutserver.app)
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9000,
      livereload: true,
      open: true
    }));
});

// Preprocesa archivos Stylus a CSS y minifica en main.css
gulp.task('css', function(){
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(),
      'include css': true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.styles.output));
});

//Busca las dependencias de bower que hayamos instalado y los inyecta en ./app/index.html
gulp.task('wiredep', function () {
  gulp.src(config.wiredep.main)
    .pipe(wiredep())
    .pipe(gulp.dest(config.wiredep.output));
});

//Busca en las carpetas de estilos y javascript los archivos que hayamos creado y los inyecta en ./app/index.html
gulp.task("inject", function () {
  gulp.src(config.inject.main)
    .pipe(inject(gulp.src(config.inject.js_and_css, {read: false}), {relative: true}))
    .pipe(gulp.dest(config.inject.output));
});

// Busca errores en el JS y nos los muestra por pantalla en ./app/js/*.js (develop)
gulp.task('jshint', function() {
  return gulp.src(config.js.watch)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

//escucha cambios de desarrollo src (develop)
gulp.task("watch", function () {
    gulp.watch(config.styles.watch, ["css", "inject"]);
    gulp.watch('./bower.json', ["wiredep"]);
    gulp.watch([config.js.watch, './Gulpfile.js'], ['jshint', "inject"]);
});

//server for dist
gulp.task('server_dist', function() {
  gulp.src(config.rutserver.dist)
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9001,
      livereload: true,
      open: true
    }));
});

// optimiza las imgs de ./app/img y las copia en dist/img
gulp.task('imgop', function(){
  gulp.src(config.images.watch)
    .pipe(imagesop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.images.output))
});

//copea los archivos a la carpetas dist
gulp.task('copy', function(){
  gulp.src('./app/lib/bootstrap/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./app/pokemons.json')
    .pipe(gulp.dest('./dist'));
  gulp.src('./app/views/**')
    .pipe(gulp.dest('./dist/views'));
  gulp.src('./app/partials/**')
    .pipe(gulp.dest('./dist/partials'));
});

//renombra y crea un solo archivo con su link a css y js en index.html
gulp.task('useref', function () {
  return gulp.src(config.useref.main)
    .pipe(useref())
    //.pipe(gulpif('js/main.js', uglify()))
    .pipe(gulpif('css/combined.css', minifyCSS()))
    .pipe(gulp.dest(config.useref.output));
});

//tareas de src (develop)
gulp.task('app', ['css', 'wiredep', 'inject'])
//task main (tarea principal)
gulp.task('default', ['server', 'app', 'watch']);

//tareas de dist
gulp.task('develop_dist', ['server_dist', 'imgop', 'copy', 'useref']);