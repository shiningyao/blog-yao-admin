import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import apiRoutes from './src/main/node/routes/api/api';

const path = require('path');

const app = express();
const port = 9000;

app.set('views', path.join(__dirname, 'src/main/node/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is started on port ${port}.`);
});