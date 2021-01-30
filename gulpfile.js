const { parallel, watch } = require('gulp');

const browserSync = require('browser-sync').create();

function browsersync() {
	browserSync.init({
		server: { baseDir: './' },
		notify: false,
		online: true
	})
}

function startwatch() {
	watch('js/**/*.js').on('change', browserSync.reload);
}

exports.browsersync = browsersync;

exports.startwatch = startwatch;

exports.default = parallel(browsersync, startwatch);
