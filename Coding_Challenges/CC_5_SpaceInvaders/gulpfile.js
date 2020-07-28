const { parallel } = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

function gulp_nodemon() {
  nodemon({
    script: './src',
    ext: 'js html css'
  });
};

function sync() {
  browserSync.init({
    port: 3001,
    proxy: 'http://localhost:1337/',
    ui: { port: 3002 },
    files: ['./**/*.{html,htm,css,js}'],
  });
};

exports.default = parallel(gulp_nodemon, sync);
