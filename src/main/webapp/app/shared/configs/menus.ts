import * as uuid from 'uuid/v4';

export const MENUS = {
    "Navigation": [{
        "id": uuid(),
        "title": "Dashboard",
        "i18n": "Sidebar.dashboard",
        "iconClass": "ti-home",
        "breadcrumb": true,
        "children": [{
            "id": uuid(),
            "title": "Default",
            "i18n": "Sidebar.dashboard.default",
            "to": "/dashboard"
        }, {
            "id": uuid(),
            "title": "Ecommerce",
            "i18n": "Sidebar.dashboard.ecommerce"
        }, {
            "id": uuid(),
            "title": "CRM",
            "i18n": "Sidebar.dashboard.CRM"
        }, {
            "id": uuid(),
            "title": "Analytics",
            "i18n": "Sidebar.dashboard.analytics",
            "badge": {
                "name": "NEW",
                "type": "info"
            }
        }]
    }, {
        "id": uuid(),
        "title": "Page Layouts",
        "i18n": "Sidebar.pageLayouts",
        "iconClass": "ti-layout",
        "badge": {
            "name": "NEW",
            "type": "warning"
        },
        "children": [{
            "id": uuid(),
            "title": "Vertical",
            "i18n": "Sidebar.pageLayouts.vertical",
            "children": [{
                "id": uuid(),
                "title": "Static Layout",
                "i18n": "Sidebar.pageLayouts.vertical.staticLayout"
            }, {
                "id": uuid(),
                "title": "Header Fixed",
                "i18n": "Sidebar.pageLayouts.vertical.headerFixed"
            }, {
                "id": uuid(),
                "title": "Compact",
                "i18n": "Sidebar.pageLayouts.vertical.compact"
            }, {
                "id": uuid(),
                "title": "Sidebar Fixed",
                "i18n": "Sidebar.pageLayouts.vertical.sidebarFixed",
            }]
        }, {
            "id": uuid(),
            "title": "Horizontal",
            "i18n": "Sidebar.pageLayouts.horizontal",
            "children": [{
                "id": uuid(),
                "title": "Static Layout",
                "i18n": "Sidebar.pageLayouts.horizontal.staticLayout"
            }, {
                "id": uuid(),
                "title": "Fixed Layout",
                "i18n": "Sidebar.pageLayouts.horizontal.fixedLayout"
            }, {
                "id": uuid(),
                "title": "Static With Icon",
                "i18n": "Sidebar.pageLayouts.horizontal.staticWithIcon"
            }, {
                "id": uuid(),
                "title": "Fixed With Icon",
                "i18n": "Sidebar.pageLayouts.horizontal.fixedWithIcon"
            }]
        }, {
            "id": uuid(),
            "title": "Bottom Menu",
            "i18n": "Sidebar.pageLayouts.bottomMenu"
        }, {
            "id": uuid(),
            "title": "Box Layout",
            "i18n": "Sidebar.pageLayouts.boxLayout"
        }, {
            "id": uuid(),
            "title": "RTL",
            "i18n": "Sidebar.pageLayouts.RTL"
        }]
    }, {
        "id": uuid(),
        "title": "Navigation",
        "i18n": "Sidebar.navigation",
        "iconClass": "ti-layout-cta-right"
    }, {
        "id": uuid(),
        "title": "Widget",
        "i18n": "Sidebar.widget",
        "iconClass": "ti-view-grid",
        "badge": {
            "name": "100+",
            "type": "danger"
        }
    }, {
        "id": uuid(),
        "title": "Articles",
        "i18n": "Sidebar.articles",
        "iconClass": "ti-write",
        "breadcrumb": true,
        "children": [{
            "id": uuid(),
            "title": "Editor",
            "i18n": "Sidebar.articles.editor",
            "breadcrumb": true,
            "to": {
                "pathname": "/articles/editor"
            }
        }, {
            "id": uuid(),
            "title": "Management",
            "i18n": "Sidebar.articles.management",
            "breadcrumb": true,
            "to": {
                "pathname": "/articles/management"
            }
        }, {
            "id": uuid(),
            "title": "Compose",
            "i18n": "Sidebar.articles.compose",
            "breadcrumb": true,
            "to": {
                "pathname": "/articles/compose"
            }
        }]
    }]
}