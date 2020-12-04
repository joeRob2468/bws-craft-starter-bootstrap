const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (env, argv) => {

    const isDevelopment = env.development || false;

    return {
        entry: {
            main: './src/app.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname) + '/cms/web/dist',
            publicPath: '/dist/'
        },
        optimization: {
            splitChunks: { chunks: 'all' },
            removeEmptyChunks: isDevelopment ? false : true,
            removeAvailableModules: isDevelopment ? false : true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: isDevelopment ? true : false,
            ignored: /node_modules/
        },
        devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
        stats: 'none',
        mode: isDevelopment ? 'development' : 'production',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader?cacheDirectory"
                    }
                },
                {
                    test: /\.scss|.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { 
                            loader: 'css-loader', 
                            options: { sourceMap: true, importLoaders: 2 }
                        },
                        { 
                            loader: 'postcss-loader', 
                            options: {}
                        },
                        { 
                            loader: 'sass-loader', 
                            options: { sourceMap: true }
                        },
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/fonts/'
                        }
                    }]
                },
                {
                    test: /\.(png|jpg|gif|ico)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/img/'
                        }
                    }]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new BrowserSyncPlugin({
                files: [
                    'cms/templates/**/*.twig'
                ],
                proxy: 'workspace:3000',
                notify: false,
                open: false,
                logSnippet: false,
                logLevel: 'warn',
                reloadDelay: 0,
                watchOptions: {
                    usePolling: isDevelopment? true : false,
                    interval: 500
                }
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new FaviconsWebpackPlugin({
                logo: './src/img/favicon_src.png',
                publicPath: '/dist',
                prefix: 'img/favicon/',
                cache: true,
                inject: false
            }),
            new CopyPlugin([{
                from: './src/img/static', to: './img/static'
            }]),
            new WebpackBar(),
            new FriendlyErrorsWebpackPlugin({
                clearConsole: false
            })
        ],
        resolve: {
            modules: [
                'node_modules'
            ],
            alias: {
                vue: isDevelopment ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.min.js'
            }
        }
    };
};