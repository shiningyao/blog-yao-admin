import * as path from 'path';
import * as webpack from 'webpack';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import { Configuration } from 'webpack';

module.exports = function(_path) {

    const WEB_ROOT = path.join(_path, 'src/main/webapp');
    const OUTPUT_ROOT = path.join(WEB_ROOT, 'build/www');

    const config: Configuration = {
        entry: {
            app: path.join(WEB_ROOT, 'app/index.bootstrap.tsx')
        },
        context: _path,
        output: {
            path: OUTPUT_ROOT,
            publicPath: '/',
            filename: '[name].[hash].js'
        },
        plugins: [
            new CleanWebpackPlugin(['build/www'], {
                root: _path,
                verbose: true,
                dry: false
            }),
            new webpack.LoaderOptionsPlugin({
                debug: false,
                minimize: true
            })
        ]
    };

    return config;
}