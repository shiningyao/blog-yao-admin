import * as React from 'react';
import { Component } from "react";
import { ImageWidget } from '@/components/editor/widgets/image.component';

export enum WidgetEditorType {
    Image
}

interface WidgetEditorProps {
    type: WidgetEditorType,
    onChange?: Function
}

export class WidgetEditor extends Component<WidgetEditorProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.type) {
            case WidgetEditorType.Image:
                return (
                    <ImageWidget></ImageWidget>
                );
            default:
                return null;
        }
    }

}