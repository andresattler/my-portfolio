import gulp from 'gulp';
import stylus from 'gulp-stylus';
import pug from 'gulp-pug';
import babel from 'gulp-babel';
import webserver from 'gulp-webserver';
import del from 'del';

gulp.task('clean', () => del.sync(['lib/**/*.css', 'lib/script.js', 'lib/**/*.html']));

gulp.task('buildHtml', () =>
  gulp.src('src/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('lib'))
);

gulp.task('buildCss', () =>
  gulp.src('src/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('lib'))
);

gulp.task('main', ['clean', 'buildHtml', 'buildCss',], () =>
  gulp.src('src/script.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
);

gulp.task('webserver', () =>
  gulp.src('lib')
    .pipe(webserver({
      livereload: true,
      open: true
    }))
);


gulp.task('watch', () =>
  gulp.watch('src/**', ['main'])
);

gulp.task('default', ['main', 'watch', 'webserver']);
