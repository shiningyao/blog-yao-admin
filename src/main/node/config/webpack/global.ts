import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as WebpackPwaManifest from 'webpack-pwa-manifest';
import * as SpritesmithPlugin from 'webpack-spritesmith';
import * as webpack from 'webpack';
import { Configuration } from 'webpack';
import { styles } from '@ckeditor/ckeditor5-dev-utils';

const MODE = process.env.NODE_ENV === 'production'? process.env.NODE_ENV : 'development';
const devMode = MODE === 'development';

module.exports = function(_path) {

    const WEB_ROOT = path.join(_path, 'src/main/webapp');

    const config: Configuration = {
        mode: MODE,
        output: {
            path: path.join(_path, 'build', 'www'),
            filename: '[name].js',
            chunkFilename: 'lib/[name].js'
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
                test: /\.(tsx|ts)?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                exclude: [
                    /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/
                ]
            }, {
                test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig( {
                            themeImporter: {
                                themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                            },
                            minify: true
                        } )
                    },
                ]
            }, {
                test: /ckeditor5-[^/]+[\w-/]+\.svg$/,
                use: [
                    'raw-loader'
                ]
            }, {
                test: /\.ejs$/,
                use: ['ejs-loader']
            }, {
                test: /\.(jpe?g|png|gif|ico)$/i,
                loader: 'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]'
            }, {
                test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    "file-loader?name=assets/fonts/[name]_[hash].[ext]"
                ],
                exclude: [
                    /ckeditor5-[^/]+[\w-/]+\.svg$/
                ]
            }]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                      test: /[\\/]node_modules[\\/]/,
                      name: 'vendors',
                      priority: -10,
                      chunks: 'initial'
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
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: `'${MODE}'`,
                    BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
                    VERSION: `'${'1.0.0'}'`,
                    DEBUG_INFO_ENABLED: MODE === 'development',
                    // The root URL for API calls, ending with a '/' - for example: `"http://www.jhipster.tech:8081/myservice/"`.
                    // If this URL is left empty (""), then it will be relative to the current context.
                    // If you use an API server, in `prod` mode, you will need to enable CORS
                    // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
                    SERVER_API_URL: `''`
                }
            }),
            new HtmlWebpackPlugin({
                title: "BlogYao App",
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
            new WebpackPwaManifest({
                filename: "manifest.webapp",
                name: "BlogYao",
                short_name: "BlogYao",
                icons: [],
                theme_color: "#000000",
                background_color: "#e0e0e0",
                start_url: "/index.html",
                display: "standalone",
                orientation: "portrait"
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            })
        ]
    };

    return config;

}