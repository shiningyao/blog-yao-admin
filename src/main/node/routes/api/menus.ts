import { Router } from 'express';
import * as uuid from 'uuid/v4';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const menuRoutes: Router = Router();

menuRoutes.get('/menus', (req, res) => {
    res.status(200).send({
        Navigation: [{
            id: uuid(),
            title: 'Dashboard',
            iconClass: 'ti-home',
            children: [{
                id: uuid(),
                title: 'Default',
                to: '/'
            }, {
                id: uuid(),
                title: 'Ecommerce'
            }, {
                id: uuid(),
                title: 'CRM'
            }, {
                id: uuid(),
                title: 'Anlytics',
                badge: {
                    name: 'NEW',
                    type: 'info'
                }
            }]
        }, {
            id: uuid(),
            title: 'Page layouts',
            iconClass: 'ti-layout',
            badge: {
                name: 'NEW',
                type: 'warning'
            },
            children: [{
                id: uuid(),
                title: 'Vertical',
                children: [{
                    id: uuid(),
                    title: 'Static Layout'
                }, {
                    id: uuid(),
                    title: 'Header Fixed'
                }, {
                    id: uuid(),
                    title: 'Compact'
                }, {
                    id: uuid(),
                    title: 'Sidebar Fixed'
                }]
            }, {
                id: uuid(),
                title: 'Horizontal',
                children: [{
                    id: uuid(),
                    title: 'Static Layout'
                }, {
                    id: uuid(),
                    title: 'Fixed Layout'
                }, {
                    id: uuid(),
                    title: 'Static With Icon'
                }, {
                    id: uuid(),
                    title: 'Fixed With Icon'
                }]
            }, {
                id: uuid(),
                title: 'Bottom Menu'
            }, {
                id: uuid(),
                title: 'Box Layout'
            }, {
                id: uuid(),
                title: 'RTL'
            }]
        }, {
            id: uuid(),
            title: 'Navigation',
            iconClass: 'ti-layout-cta-right'
        }, {
            id: uuid(),
            title: 'Widget',
            iconClass: 'ti-view-grid',
            badge: {
                name: '100+',
                type: 'danger'
            }
        }, {
            id: uuid(),
            title: 'Articles',
            iconClass: 'ti-write',
            children: [{
                id: uuid(),
                title: 'Editor',
                to: '/editor'
            }]
        }]
    });
});

export default menuRoutes;
