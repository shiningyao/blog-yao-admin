import * as React from 'react';
import { Component, SyntheticEvent } from "react";
import Http from '@/shared/utils/http';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { NavMenu, NavSubMenu } from './styles';
import { Menu } from '@/domain/menu';

export class SidebarNav extends Component<{}, {
    menus: Object
}> {

    private http = new Http();

    constructor(props) {
        super(props);
        this.state = {
            menus: {}
        }
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

        function renderSubMenu(menus: Array<Menu>) {
            if(menus.length > 0) {
                return (
                    <NavSubMenu>
                        {menus.map(menu => {
                            if(!menu.children) {
                                menu.children = [];
                            }
                            return (
                                <li key={menu.id} className={classNames({hasMenus: menu.children.length > 0, open: menu.$isOpen})}>
                                    <NavLink to={menu.to || ''} onClick={this.menuClick.bind(this, menu, menus)} activeClassName="active">
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
                                        {menu.$isOpen ? renderSubMenu.apply(this, [menu.children]) : null}
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
                            return ( 
                                <li key={menu.id} className={classNames({hasMenus: menu.children.length > 0, open: menu.$isOpen})}>
                                    <NavLink to={menu.to || ''} onClick={this.menuClick.bind(this, menu, menus)} activeClassName="active">
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
                                        {menu.$isOpen ? renderSubMenu.bind(this)(menu.children) : null}
                                    </ReactCSSTransitionGroup>
                                </li>
                            )
                            }
                        )}
                    </ul>
                );
            }
        }

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
    }

    menuClick(menu: Menu, menus: Array<Menu>, event?: SyntheticEvent) {
        if(event && !menu.to) {
            event.preventDefault();
        }
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

}