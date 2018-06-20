import * as React from 'react';
import { Component, RefObject } from 'react';
import { Wrapper } from '@/components/editor/styles';

export class ArticleEditor extends Component {
    
    private editorRef: RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
    }

    componentDidMount() {
        require.ensure([
             '@ckeditor/ckeditor5-build-classic'], (require) => {
            const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
            ClassicEditor.create(this.editorRef.current);
        }, null, 'ckeditor');
        // import(
        //     /* webpackChunkName: "vendors.async" */
        //     /* webpackMode: "lazy" */
        //     '@ckeditor/ckeditor5-build-classic').then(ClassicEditor => {
        //     ClassicEditor.create(this.editorRef.current);
        // });
    }

    render() {
        return (
            <Wrapper>
                <div ref={this.editorRef}>
                    asdasdas
                </div>
            </Wrapper>
        );
    }

}