import * as React from "react";
import { Component, ReactElement, SyntheticEvent } from "react";
import * as classNames from 'classnames';
import { ModalInstance } from "@/components/modal";
import isFunction = require('lodash/isFunction');
import isString = require('lodash/isString');
import isArray = require('lodash/isArray');

export enum DialogButtonType {
    CONFIRM,
    CANCEL,
    CUSTOM
}

interface DialogButton {
    text: string,
    type: DialogButtonType,
    handler?: (event: SyntheticEvent) => void
}

interface DialogComponentProps {
    title?: string | Function,
    size?: 'large' | 'small' | 'normal',
    footer?: DialogButton[] | Function,
    modalInstance: ModalInstance
}

export class Dialog extends Component<DialogComponentProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true
            });
        }, 150);
    }

    renderHeader(): ReactElement<any> {
        if(this.props.title) {

            if(isFunction(this.props.title)) {
                return this.props.title();
            }

            if(isString(this.props.title)) {
                return (
                    <div className="modal-header">
                        <h5 className="modal-title">
                            { this.props.title || 'Modal title' }    
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.dismiss()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }
        }
        return null;
    }

    renderFooter() {

        function onButtonClick(event: SyntheticEvent, button: DialogButton) {
            if(button.type === DialogButtonType.CUSTOM && button.handler) {
                button.handler(event);
            }
            if(button.type === DialogButtonType.CONFIRM) {
                this.close();
            }
            if(button.type === DialogButtonType.CANCEL) {
                this.dismiss();
            }
        }

        if(this.props.footer) {

            if(isFunction(this.props.footer)) {
                return this.props.footer();
            }

            if(isArray(this.props.footer) && this.props.footer.length > 0) {
                return (
                    <div className="modal-footer">
                        {
                            this.props.footer.map((button, index) => {
                                return (
                                    <button key={index} type="button" className={
                                        classNames(
                                            ['btn'], 
                                            {'btn-primary': button.type === DialogButtonType.CONFIRM},
                                            {'btn-secondary': button.type === DialogButtonType.CANCEL},
                                            {'btn-default': button.type === DialogButtonType.CUSTOM}
                                        )
                                    } onClick={(event) => onButtonClick.apply(this, [event, button])}>
                                        {button.text}
                                    </button>
                                )
                            })
                        }
                    </div>
                )
            }
        }
        return null;
    }

    render() {

        return (
            <div onTransitionEnd={this.onTransitionEnd} onClick={() => this.dismiss()} className={classNames(["modal fade", {show: this.state.show}])} role="dialog" style={{display: 'block'}}>
                <div className={classNames(['modal-dialog', {'modal-lg': this.props.size === 'large'}, {'modal-sm': this.props.size === 'small'}])} role="document" onClick={(event) => event.stopPropagation()}>
                    <div className="modal-content">
                        {this.renderHeader()}
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        {this.renderFooter()}
                    </div>
                </div>
            </div>
        );
    }

    dismiss() {
        this.setState({
            show: false
        });

        this.onTransitionEnd = () => {
            if(!this.state.show) {
                setTimeout(() => {
                    this.props.modalInstance.dismiss();
                }, 150);
            }
        }
    }

    close() {
        this.setState({
            show: false
        });

        this.onTransitionEnd = () => {
            if(!this.state.show) {
                setTimeout(() => {
                    this.props.modalInstance.close();
                }, 150);
            }
        }
    }

    onTransitionEnd() {
    }

}