import * as path from 'path';
import * as webpack from 'webpack';
import { Configuration } from 'webpack';

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = function(_path) {
    
    const WEB_ROOT = path.join(_path, 'src/main/webapp');
    
    const config:Configuration = {
        watch: true,
        context: _path,
        entry: {
            app: [path.join(WEB_ROOT, 'app/index.bootstrap.tsx'), hotMiddlewareScript]
        },
        devtool: 'cheap-source-map',
        devServer: {
            info: true,
            hot: true,
            inline: true
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        ]
    };

    return config;
}