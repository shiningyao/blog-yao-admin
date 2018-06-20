import {Router} from 'express';
import menusRoute from './menus';

const apiRoutes: Router = Router();

apiRoutes.get('/profile', (req, res) => {
    res.render('api');
});

apiRoutes.use('/', menusRoute);

export default apiRoutes;