var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
  minifyCSS = require('gulp-minify-css'),
	jshint = require('gulp-jshint'), 
	stylish = require('jshint-stylish'),
	inject = require('gulp-inject'),
	wiredep = require('wiredep').stream;

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

//escucha cambios de desarrollo (develop)
gulp.task("watch", function () {
    gulp.watch(config.styles.watch, ["css", "inject"]);
    gulp.watch('./bower.json', ["wiredep"]);
    gulp.watch([config.js.watch, './Gulpfile.js'], ['jshint', "inject"]);
});

gulp.task('app', ['css', 'wiredep', 'inject'])

gulp.task('default', ['server', 'app', 'watch']);
