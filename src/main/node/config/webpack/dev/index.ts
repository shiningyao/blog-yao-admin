import * as path from 'path';
import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import * as proxy from 'http-proxy-middleware';
import * as webpack from 'webpack';
import { Configuration } from 'webpack';

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const proxyMiddleware = proxy('/api', {
    target: 'http://localhost:8080',
    changeOrigin: true
});

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
            inline: true,
            historyApiFallback: true,
            proxy: [{
                context: [
                    '/api'
                ],
                target: 'http://127.0.0.1:8080',
                secure: false
            }],
            watchOptions: {
                ignored: /node_modules/
            }
        },
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 9000,
                open: false,
                proxy: {
                    target: 'http://localhost:4000',
                    ws: true
                }
            }, {
                reload: false
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        ]
    };

    return config;
}