import * as path from 'path';
import * as fs from 'fs';

// server & middleware
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

// logging
import * as morgan from 'morgan';
import logger from './src/main/node/config/logging';

// webpack
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './src/main/node/config/webpack';

// routes & config files
import apiRoutes from './src/main/node/routes/api/api';

const app = express();
const port = 9000;
const logo = fs.readFileSync(path.join(__dirname, '/src/main/resources/banner.txt'));
const logoText = logo.toString().replace(/(\$\{.*?\})/g, '');

console.log(logoText);

logger.info('Loading webpack config file.');

const compiler = webpack(webpackConfig);

logger.debug('Loaded webpack config: ' + JSON.stringify(webpackConfig));

app.set('views', path.join(__dirname, 'src/main/node/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use('/api', apiRoutes);

logger.info('Launching webpack dev server.');

app.use(webpackDevMiddleware(compiler, () => {
    
}));

app.listen(port, () => {
    console.log(`Server is started on port ${port}.`);
});