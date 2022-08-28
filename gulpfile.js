const { src, dest, watch, parallel, series } = require('gulp');



const concat =        require('gulp-concat');
const autoprefixer =  require('gulp-autoprefixer');
const scss = require("gulp-sass");

const uglify =        require('gulp-uglify');
const imagemin =      require('gulp-imagemin');
const svgSprite =     require('gulp-svg-sprite');
const del =           require('del');
const browserSync =   require('browser-sync').create();


function browsersync() {
    browserSync.init({
        server:{
            baseDir: 'app/'
        },
        notofy:false
    })
}


function styles (){
    return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist:  ['last 7 versions'],
        grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())

}  

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/swiper/swiper-bundle.min.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function svgSprites (){
	return src('app/img/icon/**.svg')
	.pipe(svgSprite({
		mode: {
			stack:{
				sprite: "../sprite.svg"
			}
		}
	}))
	.pipe(dest('app/img'))
}

// import imagemin from 'gulp-imagemin';

function images() {
    return src('app/img/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
    })
    ]))
    .pipe(dest('dist/img'))
}   

function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/fonts/**/**',
        'app/favicon/**/**',
        'app/js/main.min.js'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}

function watching(){
    watch(['app/scss/**/*.scss'], styles );
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts );
    watch(['app/img/icon/**.svg'], svgSprites );
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.svgSprites = svgSprites;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist,images,build);




exports.default = parallel(styles,scripts,browsersync,svgSprites,watching);
