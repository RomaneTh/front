var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

var config = {
    mode: "production",
    module: {
        rules: [
            // Use react-hot for HMR and then ts-loader to transpile TS (pass path to tsconfig because it is not in root (cwd) path)
            { test: /\.ts(x?)$/, loaders: ['ts-loader'] },
            // { test: /\.styl$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!stylus-loader' }) },
            { test: /\.css/,  use: [MiniCssExtractPlugin.loader, "css-loader"] }
        ]
    },
    devtool: '',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new HtmlWebpackPlugin({
            release: true,
            template: path.join(__dirname, 'index.ejs'),
            useCdn: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin()
        // new ExtractTextPlugin("styles.css")
    ]
};
