import {Router} from 'express';

const apiRoutes: Router = Router();

apiRoutes.get('/profile', (req, res) => {
    res.render('api');
});

export default apiRoutes;