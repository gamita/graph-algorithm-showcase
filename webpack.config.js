const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {

    mode: 'development',

    context: path.join(__dirname, 'src'),

    entry: './ts/index.ts',

    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: "ts-loader"
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                ],
            }
        ]
    },

    output: {

        filename: './js/main.js',

        path: path.join(__dirname, 'public'),

        libraryTarget: 'umd2'
    },

    resolve: {
        extensions: [".ts", ".js"],
        modules: ["src", "node_modules"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './html/index.html',
            filename: 'index.html',
        }),

        new HtmlWebpackPlugin({
            template: './html/breadth-first-search.html',
            filename: 'breadth-first-search.html',
        }),

        new HtmlWebpackPlugin({
            template: './html/dijkstra.html',
            filename: 'dijkstra.html',
        }),

        new HtmlWebpackPlugin({
            template: './html/bidirectional-dijkstra.html',
            filename: 'bidirectional-dijkstra.html',
        }),

        new HtmlWebpackPlugin({
            template: './html/a-start.html',
            filename: 'a-start.html',
        }),

        new HtmlWebpackPlugin({
            template: './html/bellman-ford.html',
            filename: 'bellman-ford.html',
        }),

        new HtmlWebpackPlugin({
            template: './html/ant-colony-optimization.html',
            filename: 'ant-colony-optimization.html',
        }),

        new CopyWebpackPlugin({
            patterns: [
              { from: "images", to: "images" },
            ],
          }),

        new WriteFilePlugin()
    ],


    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8080,
        open: true,
    },
};