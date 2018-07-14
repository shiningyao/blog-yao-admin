import * as React from 'react';
import { Component, SyntheticEvent } from "react";
import Http from '@/shared/utils/http';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NavLink, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { NavMenu, NavSubMenu } from './styles';
import { Menu } from '@/domain/menu';

import isObject = require('lodash/isObject');
import isArray = require('lodash/isArray');
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { setBreadcrumbs } from '@/shared/actions';

class SidebarNav extends Component<any, {
    menus: Object,
    loaded: boolean
}> {

    private http = new Http();
    private firstRender = true;

    constructor(props) {
        super(props);
        this.state = {
            menus: {},
            loaded: false
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location !== this.props.location) {
            this.onRouteChanged(this.props.location);
        }
    }

    onRouteChanged(location) {

        const allMenus = [];
        const rootMenus = [].concat(...Object.values(this.state.menus));
        const breadcrumbs = [];

        const findActiveMenu = (menus) => {
            let activeMenu;
            
            function step(menus, parent?) {
                menus.forEach(menu => {
                    if(parent) {
                        menu.$parent = parent;
                    }
                    allMenus.push(menu);
                    
                    function isCurrent(currentPathname, menu) {
                        const pathname = isObject(menu.to) ? menu.to.pathname : menu.to;
                        return currentPathname === pathname;
                    }
                    
                    if(isArray(menu.children) && menu.children.length > 0) {
                        step(menu.children, menu);
                    } else {
                        if(isCurrent(location.pathname, menu)) {
                            activeMenu = menu;
                        }
                    }
                });
            }

            step(menus);

            return activeMenu;
        }

        const activeMenu = findActiveMenu(rootMenus);
        if(activeMenu) {
            initBreadcrumbs(activeMenu);
            this.props.setBreadcrumbs(breadcrumbs);
        }
        function initBreadcrumbs(menu) {
            breadcrumbs.unshift(menu);
            if(menu.$parent) {
                menu.$parent.$isOpen = true;
                initBreadcrumbs(menu.$parent);
            }
        }
    }

    componentDidMount() {
        this.http.getData<{
             [category: string]: [Menu]
        }>('/api/menus').subscribe(data => {
            this.setState({
                menus: data
            });
            const menus = [].concat(...Object.values(data));
            const breadcrumbs = [];
            const initMenus = (menus, parent?, location?) => {
                breadcrumbs.length = 0;
                location = location || this.props.location;
                menus.forEach((menu) => {
                    if(parent) {
                        menu.$parent = parent;
                    }

                    function initBreadcrumbs(menu) {
                        breadcrumbs.unshift(menu);
                        if(menu.$parent) {
                            menu.$parent.$isOpen = true;
                            initBreadcrumbs(menu.$parent);
                        }
                    }
    
                    function isCurrent(currentPathname, menu) {
                        const pathname = isObject(menu.to) ? menu.to.pathname : menu.to;
                        return currentPathname === pathname;
                    }
    
                    if(isArray(menu.children) && menu.children.length > 0) {
                        initMenus(menu.children, menu);
                    } else {
                        if(isCurrent(location.pathname, menu)) {
                            initBreadcrumbs(menu);
                        }
                    }
    
                });
            };
            initMenus(menus);
            this.props.setBreadcrumbs(breadcrumbs);
        });
    }

    render() {
        function renderSubMenu(menus: Array<Menu>, parents: Menu[]) {
            if(menus.length > 0) {
                return (
                    <NavSubMenu>
                        {menus.map(menu => {
                            if(!menu.children) {
                                menu.children = [];
                            }
                            
                            if(this.props.location.state && this.props.breadcrumbs.map(breadcrumb => breadcrumb.name).indexOf(menu.title) > -1 && this.firstRender) {
                                this.firstRender = false;
                                menu.$isOpen = true;
                            }
                            
                            return (
                                <li key={menu.id} className={classNames({hasMenus: menu.children.length > 0, open: menu.$isOpen})}>
                                    <NavLink to={menu.to || ''} exact={true} onClick={this.menuClick.bind(this, menu, menus)} activeClassName="active">
                                        <span className="menu-icon">
                                            <i className={menu.iconClass}></i>
                                        </span>
                                        <span className="menu-text">
                                            <FormattedMessage id={menu.i18n} defaultMessage={menu.title} />
                                        </span>
                                        {(() => {
                                            if(menu.badge) {
                                                let className = 'menu-badge label';
                                                if(menu.badge.type) {
                                                    className += ' label-' + menu.badge.type;
                                                } else {
                                                    className += ' label-warning';
                                                }
                                                return <span className={className}>
                                                    {menu.badge.name}
                                                </span>
                                            }
                                        })()}
                                    </NavLink>
                                    <ReactCSSTransitionGroup
                                        transitionName="accordion-dropdown"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={300}>
                                        {menu.$isOpen ? renderSubMenu.apply(this, [menu.children, [...parents, menu]]) : null}
                                    </ReactCSSTransitionGroup>
                                </li>
                            ) 
                            }
                        )}
                    </NavSubMenu>
                );
            }
        }

        function renderMenu(menus: Array<Menu>) {
            if(menus.length > 0) {

                return (
                    <ul>
                        {menus.map(menu => {
                            if(!menu.children) {
                                menu.children = [];
                            }
                            
                            if(this.props.location.state && this.props.breadcrumbs.map(breadcrumb => breadcrumb.name).indexOf(menu.title) > -1 && this.firstRender) {
                                this.firstRender = false;
                                menu.$isOpen = true;
                            }
                            return ( 
                                <li key={menu.id} className={classNames({hasMenus: menu.children.length > 0, open: menu.$isOpen})}>
                                    <NavLink to={menu.to || ''} onClick={this.menuClick.bind(this, menu, menus)} isActive={(match, location) => this.isRootMenuActive(menu, match, location)} activeClassName="active">
                                        <span className="menu-icon">
                                            <i className={menu.iconClass}></i>
                                        </span>
                                        <span className="menu-text">
                                            <FormattedMessage id={menu.i18n} defaultMessage={menu.title} />
                                        </span>
                                        {(() => {
                                            if(menu.badge) {
                                                let className = 'menu-badge label';
                                                if(menu.badge.type) {
                                                    className += ' label-' + menu.badge.type;
                                                } else {
                                                    className += ' label-warning';
                                                }
                                                return <span className={className}>
                                                    {menu.badge.name}
                                                </span>
                                            }
                                        })()}
                                    </NavLink>
                                    <ReactCSSTransitionGroup
                                        transitionName="accordion-dropdown"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={300}>
                                        {menu.$isOpen ? renderSubMenu.bind(this)(menu.children, [menu]) : null}
                                    </ReactCSSTransitionGroup>
                                </li>
                            )
                            }
                        )}
                    </ul>
                );
            }
        }

        if(Object.keys(this.state.menus).length > 0) {
            return (
                <div>
                    {Object.keys(this.state.menus).map(category => {
                        const menus = this.state.menus[category];
                        return (
                            <NavMenu key={category}>
                                <div className="nav-category">
                                    {category}
                                </div>
                                {renderMenu.bind(this)(menus)}
                            </NavMenu>
                        );
                    })}
                </div>
            );
        } else {
            return null;
        }
    }

    menuClick(menu: Menu, menus: Array<Menu>, event?: SyntheticEvent) {
        if(event && !menu.to) {
            event.preventDefault();
        }
        this.firstRender = false;
        menus.forEach(m => {
            if(m.id === menu.id) {
                m.$isOpen = !m.$isOpen;
            } else {
                m.$isOpen = false;
            }
            if(m.children && m.$isOpen === false) {
                this.menuClick(m, m.children);
            }
        });
        this.setState({
            menus: this.state.menus
        });
    }

    isRootMenuActive(menu, match, location) {
        if(location.state && location.getBreadcrumbs) {
            return location.state.breadcrumbs.map(breadcrumb => breadcrumb.name).indexOf(menu.title) > -1;
        }
        return false;
    }

}

function mapStateToProps(state) {
    return {
        breadcrumbs: state.breadcrumbs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setBreadcrumbs: bindActionCreators(setBreadcrumbs, dispatch)
    };
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SidebarNav);