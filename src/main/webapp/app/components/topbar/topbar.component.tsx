import * as React from 'react';
import styles from './styles';
import Logo from '../logo/logo.component';

const { Component } = React;
const { Navbar } = styles;

export class Topbar extends Component<{}, {}> {

    render() {

        return (
            <Navbar>
                <div className="navbar-wrapper">
                    <div className="navbar-logo">
                        <a href="javascript: void(0)">
                            <Logo width={25} height={25} fill="#303549"></Logo>
                        </a>
                        <a className="logo-text" href="javascript: void(0)">
                            YAOSHEN
                        </a>
                        <a className="mobile-menu" href="javascript: void(0)">
                            <i className="ti-menu"></i>
                        </a>
                    </div>
                    <div className="navbar-container container-fluid">
                        <ul className="nav-left">
                            <li>
                                <a className="main-search morphsearch-search" href="">
                                    <i className="ti-search"></i>
                                </a>
                            </li>
                            <li>
                                <a className="main-search morphsearch-search" href="">
                                    <i className="ti-fullscreen"></i>
                                </a>
                            </li>
                            <li className="mega-menu-top">
                                <a href="javascript:void(0);">
                                    Mega
                                    <i className="ti-angle-down"></i>
                                </a>
                                <ul className="show-notification row" style={{display: 'none'}}>
                                    <li className="col-sm-3">1</li>
                                    <li className="col-sm-3">1</li>
                                    <li className="col-sm-3">1</li>
                                    <li className="col-sm-3">1</li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav-right">
                            <li className="header-notification dropdown">
                                <a href="javascript:void(0);" className="dropdown-active-item">
                                    <img src={require('#/images/flags/GB.png')} alt=""/>
                                    English
                                </a>
                                <ul className="show-notification">
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-active-item">
                                            <img src={require('#/images/flags/GB.png')} alt=""/>
                                            English
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-active-item">
                                            <img src={require('#/images/flags/ES.png')} alt=""/>
                                            Spanish
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-active-item">
                                            <img src={require('#/images/flags/PT.png')} alt=""/>
                                            Portuguese
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-active-item">
                                            <img src={require('#/images/flags/FR.png')} alt=""/>
                                            French
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-active-item">
                                            <img src={require('#/images/flags/CN.png')} alt=""/>
                                            China
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="header-notification">
                                <a href="javscript:void(0)">
                                    <i className="ti-bell"></i>
                                    <span className="badge bg-c-pink"></span>
                                </a>
                                <ul className="show-notification">
                                    <li>1</li>
                                    <li>1</li>
                                    <li>1</li>
                                    <li>1</li>
                                </ul>
                            </li>
                            <li className="header-notification">
                                <a href="javascript:void(0);" className="displayChatbox">
                                    <i className="ti-comments"></i>
                                    <span className="badge bg-c-green"></span>
                                </a>
                            </li>
                            <li className="user-profile header-notification">
                                <a href="javascript:void(0);">
                                    <img src="http://html.codedthemes.com/guru-able/files/assets/images/avatar-4.jpg" className="img-radius" alt=""/>
                                    <span>Shining Yao</span>
                                    <i className="ti-angle-down"></i>
                                </a>
                                <ul className="show-notification profile-notification">
                                    <li>
                                        <a href="javascript: void(0)">
                                            <i className="ti-settings"></i>Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0)">
                                            <i className="ti-user"></i>Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0)">
                                            <i className="ti-email"></i>My Messages
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0)">
                                            <i className="ti-lock"></i>Lock Screen
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0)">
                                            <i className="ti-layout-sidebar-left"></i>Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </Navbar>
        )

    }
    
}