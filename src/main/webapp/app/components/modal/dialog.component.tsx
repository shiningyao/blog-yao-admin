import * as React from "react";
import { Component } from "react";
import * as classNames from 'classnames';

interface DialogComponentProps {
    title?: string
}

export class DialogComponent extends Component<DialogComponentProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true
            });
        }, 10);
    }

    render() {
        return (
            <div className={classNames(["modal fade", {show: this.state.show}])} role="dialog" style={{display: 'block'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}