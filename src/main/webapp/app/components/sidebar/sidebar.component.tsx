import * as React from 'react';
import { Component, RefObject } from "react";
import PerfectScrollbar from 'perfect-scrollbar';
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
                    <ul>
                        <li>adasd</li>
                    </ul>
                </div>
            </Wrapper>
        )
    }

}