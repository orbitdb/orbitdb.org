// Run this file by installing gulp globally, and running `> gulp`

const gulp = require('gulp')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')
const pngcrush = require('imagemin-pngcrush')
const imageResize = require('gulp-image-resize')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')

var paths = {
  img: [
    // SVGs are moved over directly below
    'images/src/**/*.png',
    'images/src/**/*.jpg',
    'images/src/**/*.jpeg'
  ],
  imgDest: 'images',
  js: [
    'assets/js/plugins/search.js',
    'assets/js/plugins/jquery.fitvids.js',
    'assets/js/plugins/respond.js',
    'assets/js/plugins/responsive-nav.js',
    'assets/js/_main.js'
  ]
}

// Note: This doesn't optimize for different devices.
// If we find another library for that, I'd be super happy to use it.
gulp.task('img', function () {
  // Move over the SVG files and leave them alone
  gulp.src('images/src/**/*.svg')
    .pipe(gulp.dest(paths.imgDest))

  return gulp.src(paths.img)
    // If something changed
    // .pipe(changed('images/src'))
    // Crop it
    .pipe(imageResize({
      width: 2000, // Maximum width for the file.
      crop: false,
      upscale: false
    }))
    // Optimize the png files
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    }))
    // ...and the jpegs
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 })
    ],
    // Log stuff
    { verbose: true }
    ))
    .pipe(gulp.dest(paths.imgDest))
})

gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/js'))
})

gulp.task('images', ['img'])
gulp.task('default', ['img', 'js'])
