var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PurifyCSSPlugin = require('purifycss-webpack');
var fakePlugin = { apply() {} };
var inProduction = (process.env.NODE_ENV === 'production');


/**
 * ======================================================================
 *   CONFIGURE BELOW
 * ======================================================================
 */


/**
 * If true, light image optimization will be performed
 * however it will incur a performance hit, so is disabled
 * by default:
 */
var optimizeImagesInDev = false;


/**
 * Include all paths that should be scanned for templates to determin
 * which css rules can be omitted during css purification that is
 * performed when building for production:
 */
var templatePaths = [].concat(
  glob.sync(path.join(__dirname, 'layouts/**/*.htm')),
  glob.sync(path.join(__dirname, 'partials/**/*.htm')),
  glob.sync(path.join(__dirname, 'pages/**/*.htm'))
);


/**
 * ======================================================================
 *   CONFIGURE ABOVE
 * ======================================================================
 */


module.exports = {
    entry: [
      './src/js/main.js',
      './src/scss/main.scss',
    ],
    output: {
        path: path.resolve(__dirname, './assets'),
        filename: 'bundle.js'
    },
    module: { 
        rules: [
            {   // SASS Handling
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {   // CSS Handling
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {   // Image Handling
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash].[ext]'
                }
            },
            {   // Font Handling
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[hash].[ext]'
                }
            },
            {   // JavaScript Handling
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new PurifyCSSPlugin({ paths: templatePaths, minimize: inProduction }),
        (optimizeImagesInDev) ? new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }) : fakePlugin
    ]
};

// Minify CSS & JS in production
if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: {comments: false}
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i ,
            optipng: { optimizationLevel: 6 },
            gifsicle: { optimizationLevel: 3 },
            jpegtran: { progressive: true },
            pngquant: { quality: '95-100' }
        })
    );
}
