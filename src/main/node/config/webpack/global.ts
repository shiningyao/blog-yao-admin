import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as SpritesmithPlugin from 'webpack-spritesmith';
import { Configuration } from 'webpack';

const MODE = process.env.NODE_ENV === 'production'? process.env.NODE_ENV : 'development';
const devMode = MODE === 'development';

module.exports = function(_path) {

    const WEB_ROOT = path.join(_path, 'src/main/webapp');

    const config: Configuration = {
        mode: MODE,
        output: {
            path: path.join(_path, 'build', 'www'),
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                '@': path.join(WEB_ROOT, 'app'),
                '#': path.join(WEB_ROOT, 'content')
            },
            modules: [
                "node_modules", 
                path.join(WEB_ROOT, 'content/images/sprites-generated')
            ]
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.ejs?$/,
                use: ['ejs-loader']
            }, {
                test: /\.(jpe?g|png|gif|ico)$/i,
                loader: 'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]'
            }, {
                test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    "file-loader?name=assets/fonts/[name]_[hash].[ext]"
                ]
            }]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                      test: /[\\/]node_modules[\\/]/,
                      name: 'vendors',
                      chunks: 'all'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(WEB_ROOT, 'index.ejs'),
                filename: 'index.html',
                favicon: path.join(WEB_ROOT, 'favicon.ico')
            }),
            new SpritesmithPlugin({
                src: {
                    cwd: path.resolve(WEB_ROOT, 'content/images/flags'),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve(WEB_ROOT, 'content/images/sprites-generated/flags.png'),
                    css: path.resolve(WEB_ROOT, 'content/styles/scss/sprites/_flags.scss')
                },
                apiOptions: {
                    cssImageRef: "~flags.png"
                }
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            })
        ]
    };

    return config;

}