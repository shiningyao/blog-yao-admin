import * as React from 'react';
import { Component, SyntheticEvent } from "react";
import Http from '@/shared/utils/http';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { NavMenu, NavSubMenu } from './styles';
import { Menu } from '@/domain/menu';
import { LocationDescriptorObject, Path } from 'history';

import isObject = require('lodash/isObject');
import isString = require('lodash/isString');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

    componentDidMount() {
        this.http.getData<{
             [category: string]: [Menu]
        }>('/api/menus').subscribe(data => {
            this.setState({
                menus: data
            });
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
                            if(this.props.location.state && this.props.location.state.breadcrumbs.map(breadcrumb => breadcrumb.name).indexOf(menu.title) > -1 && this.firstRender) {
                                this.firstRender = false;
                                menu.$isOpen = true;
                            }
                            
                            return (
                                <li key={menu.id} className={classNames({hasMenus: menu.children.length > 0, open: menu.$isOpen})}>
                                    <NavLink to={this.getLinkTo(menu, parents)} exact={true} onClick={this.menuClick.bind(this, menu, menus)} activeClassName="active">
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
                                        {menu.$isOpen || !this.state.loaded ? renderSubMenu.apply(this, [menu.children, [...parents, menu]]) : null}
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
                            if(this.props.location.state && this.props.location.state.breadcrumbs.map(breadcrumb => breadcrumb.name).indexOf(menu.title) > -1 && this.firstRender) {
                                this.firstRender = false;
                                menu.$isOpen = true;
                            }
                            return ( 
                                <li key={menu.id} className={classNames({hasMenus: menu.children.length > 0, open: menu.$isOpen})}>
                                    <NavLink to={this.getLinkTo(menu)} onClick={this.menuClick.bind(this, menu, menus)} isActive={(match, location) => this.isRootMenuActive(menu, match, location)} activeClassName="active">
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
                                        {menu.$isOpen || !this.state.loaded ? renderSubMenu.bind(this)(menu.children, [menu]) : null}
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

    getLinkTo(menu: Menu, parents: Menu[] = []): LocationDescriptorObject | Path {

        function getBreadcrumbs(menus: Menu[]) {
            return menus.filter(menu => menu.breadcrumb).map(menu => {
                if(menu.breadcrumb === true) {
                    return {
                        name: menu.title,
                        i18n: menu.i18n,
                        to: menu.to || '/'
                    };
                }

                if(isObject(menu.breadcrumb)) {
                    return Object.assign({
                        to: menu.to || '/'
                    }, menu.breadcrumb);
                }
            });
        }

        if(menu.to) {
            const breadcrumbs = getBreadcrumbs([...parents, menu]);
            this.props.setBreadcrumbs(breadcrumbs);
            if(isString(menu.to)) {
                return {
                    pathname: menu.to,
                    state: {
                        breadcrumbs
                    }
                };
            }
            if(isObject(menu.to)) {
                return Object.assign({
                    state: {
                        breadcrumbs
                    }
                }, menu.to);
            }
        }

        if(!this.state.loaded) {
            this.setState({
                loaded: true
            });
        }
        return '';
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

export default connect(
    null,
    mapDispatchToProps
)(SidebarNav);