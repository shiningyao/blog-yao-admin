import * as React from 'react';
import { Component } from "react";
import { ImageWidgetWrapper } from '@/components/editor/widgets/image.style';

export class ImageWidget extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageWidgetWrapper>
                <div className="featured-image">
                    <a href="javascript:void(0)">
                        <img src="http://themewing.com/wordpress/easyblog/wp-content/uploads/2015/01/demo2-1024x539.jpg" alt=""/>
                    </a>
                    <div className="post-icon">
                        <i className="fa fa-thumb-tack"></i>
                    </div>
                </div>
            </ImageWidgetWrapper>
        );
    }
}