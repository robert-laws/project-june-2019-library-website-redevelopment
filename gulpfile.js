const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');

var paths = {
  styles: {
    src: ["node_modules/bootstrap/scss/bootstrap.scss", "src/sass/**/*.scss"],
    dest: "build/styles"
  },
  pug: {
    src: "src/pug/*.pug",
    watch: "src/pug/**/*.pug",
    dest: "build"
  },
  scripts: {
    src: ["node_modules/bootstrap/dist/js/bootstrap.js","node_modules/popper.js/dist/popper.js", "node_modules/jquery/dist/jquery.js", "src/js/**/*.js"],
    dest: "build/scripts"
  },
  images: {
    src: ["src/img/**/*.jpg", "src/img/**/*.JPG", "src/img/**/*.png", "src/img/**/*.ico", "src/img/**/*.json"],
    dest: "build/images"
  }
}

var sassOptions = {
  outputStyle: "expanded"
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', function() {
  var stream = gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
  return stream;
});

gulp.task('pug', function() {
  var stream = gulp.src(paths.pug.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.pug.dest));
  return stream;
});

gulp.task('styles', function() {
  var stream = gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
  return stream;
});

gulp.task('images', function() {
  var stream = gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
  return stream;
});

gulp.task('browser', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch(paths.pug.watch, gulp.parallel('pug'))
    .on('change', browserSync.reload);
    
  // watch and rebuild .css files
  gulp.watch(paths.styles.src, gulp.parallel('styles'))
    .on('change', browserSync.reload);
    
  // watch and rebuild .js files
  gulp.watch(paths.scripts.src, gulp.parallel('scripts'))
    .on('change', browserSync.reload);

  // Reload when html changes
  gulp.watch(paths.images.src, gulp.parallel('images'))
    .on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean',
  gulp.parallel(
    'pug',
    'styles',
    'scripts',
    'images'
  )));

gulp.task('serve', gulp.series('clean',
  gulp.parallel(
    'pug',
    'styles',
    'scripts',
    'images'),
  'browser'));

gulp.task('default', gulp.series('serve'));