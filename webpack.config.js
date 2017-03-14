var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var PurifyCSSPlugin = require('purifycss-webpack');

var inProduction = (process.env.NODE_ENV === 'production');

var templatePaths = [].concat(
  glob.sync(path.join(__dirname, 'layouts/**/*.htm')),
  glob.sync(path.join(__dirname, 'partials/**/*.htm')),
  glob.sync(path.join(__dirname, 'pages/**/*.htm'))
);

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
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new PurifyCSSPlugin({ paths: templatePaths })
    ]
};

// Minify CSS & JS in production
if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: {comments: false}
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    );
}
