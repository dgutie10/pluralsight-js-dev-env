import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';



export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        main: path.resolve(__dirname, 'src/index'),
        vendor: path.resolve(__dirname, 'src/vendor')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash]js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin(),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css'),

        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackMd5Hash(),

    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
        ]
    }
}