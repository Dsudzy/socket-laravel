let mix = require('laravel-mix');

try {
    extraConfig = require('./.watch-config.json');
} catch (error) {
    extraConfig = {
        browserSync: {
            proxy: 'localhost'
        }
    }
}

if (!mix.config.inProduction) {
    mix.browserSync({
        proxy: extraConfig.browserSync.proxy,
        // files: ['path/to/files/to/watch/**/*.js'] // defaults to Laravel-specific watchers
        port: 3000,
        watchOptions: {
            usePolling: true, // necessary to notice change from host os
            interval: 250
        }
    });

    mix.options({ processCssUrls: false });
    mix.webpackConfig({
        output: {
            chunkFilename: 'js/chunk-[id].js'
        },
        watchOptions: {
            poll: 2500
        }
    });

} else {
    if (extraConfig && extraConfig.browserSync &&
        extraConfig.browserSync.proxy != 'localhost') {
       mix.options({ processCssUrls: false });
    }
    mix.webpackConfig({
        output: {
            chunkFilename: 'js/chunk-[id]-[chunkhash].js'
        }
    });
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css', { includePaths: ['vendor/zurb/foundation/scss'] })
   .version();
