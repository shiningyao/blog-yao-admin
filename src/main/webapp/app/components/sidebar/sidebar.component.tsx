import * as React from 'react';
import { Component, RefObject } from "react";
import PerfectScrollbar from 'perfect-scrollbar';
import SidebarNav from './navigation.component';
import { Wrapper } from './styles';

export class Sidebar extends Component<{}, {}> {

    scrollContainer: RefObject<HTMLDivElement>

    constructor(props) {
        super(props);
        this.scrollContainer =  React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        new PerfectScrollbar(this.scrollContainer.current);
    }

    render() {
        return (
            <Wrapper>
                <div ref={this.scrollContainer} className="sidebar-inner main-menu">
                    <div>
                        <div className="main-menu-header">
                            <img className="image-radius" src="http://html.codedthemes.com/guru-able/files/assets/images/avatar-4.jpg" alt=""/>
                            <div className="user-details">
                                <span>Shining Yao</span>
                                <span id="more-details">
                                    Software Developer
                                    <i className="ti-angle-down"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="search-box-wrapper">
                        <div className="search-box">
                            <input type="text" placeholder="Search" />
                            <span className="search-icon">
                                <i className="ti-search"></i>
                            </span>
                        </div>
                    </div>
                    <SidebarNav {...this.props}></SidebarNav>
                </div>
            </Wrapper>
        )
    }

}