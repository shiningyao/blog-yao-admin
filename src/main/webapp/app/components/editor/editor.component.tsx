import * as React from 'react';
import { Component, RefObject } from 'react';
import * as classNames from 'classnames';
import { EditorWrapper } from '@/components/editor/styles';

import isFunction = require('lodash/isFunction');
import { Subject } from 'rxjs';

interface ArticleEditorProps {
    className?: string,
    onChange?: Function
};

interface ArticleEditorStates {
    editorLoaded: boolean,
    isEmpty: boolean
}

export class ArticleEditor extends Component<ArticleEditorProps, ArticleEditorStates> {
    
    private editorRef: RefObject<HTMLDivElement>;
    private editor: any;

    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
        this.state = {
            editorLoaded: false,
            isEmpty: true
        };
        this.onEditorBlur = this.onEditorBlur.bind(this);
    }

    componentDidMount() {
        require.ensure([
            '@ckeditor/ckeditor5-editor-classic/src/classiceditor',
            '@ckeditor/ckeditor5-editor-inline/src/inlineeditor',
            '@ckeditor/ckeditor5-essentials/src/essentials',
            '@ckeditor/ckeditor5-autoformat/src/autoformat',
            '@ckeditor/ckeditor5-heading/src/heading',
            '@ckeditor/ckeditor5-basic-styles/src/bold',
            '@ckeditor/ckeditor5-basic-styles/src/italic',
            '@ckeditor/ckeditor5-font/src/font',
            '@ckeditor/ckeditor5-highlight/src/highlight',
            '@ckeditor/ckeditor5-link/src/link',
            '@ckeditor/ckeditor5-list/src/list',
            '@ckeditor/ckeditor5-image/src/image',
            '@ckeditor/ckeditor5-image/src/imagecaption',
            '@ckeditor/ckeditor5-image/src/imagestyle',
            '@ckeditor/ckeditor5-image/src/imagetoolbar',
            '@ckeditor/ckeditor5-image/src/imageupload',
            '@ckeditor/ckeditor5-block-quote/src/blockquote',
            '@ckeditor/ckeditor5-alignment/src/alignment',
            '@ckeditor/ckeditor5-paragraph/src/paragraph'
        ], (require) => {
            const ClassicEditor = require('@ckeditor/ckeditor5-editor-classic/src/classiceditor').default;
            const InlineEditor = require('@ckeditor/ckeditor5-editor-inline/src/inlineeditor').default;
            const Essentials = require('@ckeditor/ckeditor5-essentials/src/essentials').default;
            const Autoformat = require('@ckeditor/ckeditor5-autoformat/src/autoformat').default;
            const Heading = require('@ckeditor/ckeditor5-heading/src/heading').default;
            const Bold = require('@ckeditor/ckeditor5-basic-styles/src/bold').default;
            const Italic = require('@ckeditor/ckeditor5-basic-styles/src/italic').default;
            const Font = require('@ckeditor/ckeditor5-font/src/font').default;
            const Hight = require('@ckeditor/ckeditor5-highlight/src/highlight').default;
            const Link = require('@ckeditor/ckeditor5-link/src/link').default;
            const List = require('@ckeditor/ckeditor5-list/src/list').default;
            const Image = require('@ckeditor/ckeditor5-image/src/image').default;
            const ImageCaption = require('@ckeditor/ckeditor5-image/src/imagecaption').default;
            const ImageStyle = require('@ckeditor/ckeditor5-image/src/imagestyle').default;
            const ImageToolbar = require('@ckeditor/ckeditor5-image/src/imagetoolbar').default;
            const ImageUpload = require('@ckeditor/ckeditor5-image/src/imageupload').default;
            const Blockquote = require('@ckeditor/ckeditor5-block-quote/src/blockquote').default;
            const Alignment = require('@ckeditor/ckeditor5-alignment/src/alignment').default;
            const Paragraph = require('@ckeditor/ckeditor5-paragraph/src/paragraph').default;
            
            InlineEditor.create(this.editorRef.current, {
                plugins: [ 
                    Heading,
                    Essentials,
                    Autoformat,
                    Bold,
                    Italic,
                    Font,
                    Hight,
                    Link,
                    List,
                    Image,
                    ImageCaption,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    Blockquote,
                    Alignment,
                    Paragraph
                ],
                fontSize: {
                    options: [
                        8,
                        10,
                        12,
                        'default',
                        16,
                        18,
                        20,
                        24,
                        36,
                        40
                    ]
                },
                toolbar: [  
                    'heading', '|', 
                    'bold', 'italic', 'fontSize', 'fontFamily', 'highlight', '|', 
                    'link', 'bulletedList', 
                    'numberedList', 'imageUpload', 'blockquote',
                    'alignment:left', 'alignment:center', 'alignment:right', '|',
                    'undo', 'redo'
                ]
            }).then((editor) => {
                this.editor = editor;
                if(!this.isEmpty()) {
                    this.setState({
                        isEmpty: false
                    });
                }
                editor.ui.view.editable.editableElement.setAttribute('spellcheck', 'false');
                // editor.model.document.on('change', () => {
                    
                // });
                this.setState({
                    editorLoaded: true
                });
            });
        }, null, 'ckeditor');
    }

    isEmpty() {
        if(!this.editor) {
            return true;
        }
        return this.editor.getData() === '<p>&nbsp;</p>'
    }

    onEditorBlur() {

        if(!this.editor) {
            return false;
        }
        
        if(this.isEmpty()) {
            this.setState({
                isEmpty: true
            });
            return false;
        } else {
            this.setState({
                isEmpty: false
            });
            if(isFunction(this.props.onChange)) {
                this.props.onChange({
                    content: this.editor.getData()
                });
            }
        }
    }

    render() {
        return (
            <EditorWrapper 
                className={classNames([
                    this.props.className, 
                    {'hidden': !this.state.editorLoaded},
                    {'empty': this.state.isEmpty}
                ])}>
                <div ref={this.editorRef} placeholder="Write article content from here..." onBlur={this.onEditorBlur}>
                    {this.props.children}
                </div>
            </EditorWrapper>
        );
    }

}