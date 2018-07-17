import * as React from "react";
import { Component } from "react";
import * as classNames from 'classnames';
import { ModalInstance } from "@/components/modal";

interface DialogComponentProps {
    title?: string,
    modalInstance: ModalInstance
}

export class Dialog extends Component<DialogComponentProps, any> {

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
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.props.modalInstance.dismiss()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}