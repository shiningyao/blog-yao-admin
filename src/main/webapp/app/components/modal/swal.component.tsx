import * as React from "react";
import { Component } from "react";
import * as classNames from 'classnames';
import { SwalOptions } from "sweetalert/typings/modules/options";
import { ButtonList, ButtonOptions } from "sweetalert/typings/modules/options/buttons";
import { ModalInstance } from "@/components/modal";
import isArray = require('lodash/isArray');
import isString = require('lodash/isString');
import isBoolean = require('lodash/isBoolean');
import isObject = require('lodash/isObject');

const CONFIRM_KEY = "confirm";
const CANCEL_KEY = "cancel";

interface SweetAlertProps {
    modalInstance: ModalInstance;
    title?: string;
    text?: string;
    icon?: string;
    buttons?: ButtonList | Array<string | boolean> | boolean;
}

interface SweetAlertStates {
    show: boolean,
    hide: boolean
}

const defaultButtonList: ButtonList = {
    cancel: {
      text: "Cancel",
      value: null,
      visible: false,
      className: "",
      closeModal: true,
    },
    confirm: {
      text: "OK",
      value: true,
      visible: true,
      className: "",
      closeModal: true
    }
};

export class SweetAlert extends Component<SweetAlertProps, SweetAlertStates> {

    private buttons: ButtonList | Array<string | boolean> | boolean;

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            hide: false
        };
        this.buttons = this.formatButtons();
        this.onAnimationEnd = this.onAnimationEnd.bind(this);
    }

    formatButtons(): ButtonList | boolean {

        function elementToButtonOptions(element: string | boolean | ButtonList, defaultOptions: ButtonOptions = {}): ButtonOptions {
            const options = Object.assign({}, defaultOptions);

            if(element === undefined) {
                return null;
            }

            if(isString(element)) {
                options.text = element;
                return options;
            }

            if(isBoolean(element)) {
                if(element) {
                    return options;
                } else {
                    return null;
                }
            }

            if(isObject(element)) {
                return Object.assign(options, element);
            }

            return null;
        }

        if(this.props.buttons === undefined || this.props.buttons === true) {
            return defaultButtonList;
        }

        if(this.props.buttons === false) {
            return false;
        }

        const defaultCancelOptions = defaultButtonList.cancel as ButtonOptions;
        const defaultConfirmOptions = defaultButtonList.confirm as ButtonOptions;
        const buttonList: ButtonList = {};

        if(isArray(this.props.buttons)) {
            const cancelOptions = elementToButtonOptions(this.props.buttons[0], defaultCancelOptions), 
                confirmOptions = elementToButtonOptions(this.props.buttons[1], defaultConfirmOptions);

            if(cancelOptions) {
                buttonList.cancel = cancelOptions;
            }

            if(confirmOptions) {
                buttonList.confirm = confirmOptions;
            }

            return buttonList;
        }

        if(isObject(this.props.buttons)) {
            Object.keys(this.props.buttons).forEach((key) => {
                let options;

                if(key === CONFIRM_KEY) {
                    options = elementToButtonOptions(this.props.buttons[key], defaultConfirmOptions);
                } else if(key === CANCEL_KEY) {
                    options = elementToButtonOptions(this.props.buttons[key], defaultCancelOptions);
                } else {
                    options = elementToButtonOptions(this.props.buttons[key]);
                }

                if(options) {
                    buttonList[key] = options;
                }
            });

            return buttonList;
        }

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true,
                hide: false
            });
        }, 150);
    }

    onButtonClick(key: string, button: ButtonOptions) {
        
        if(key === CANCEL_KEY) {
            this.dismiss();
            return false;
        }

        this.close(key);
    }

    render() {

        const renderButtons = () => {
            if(this.buttons) {
                return (
                    Object.keys(this.buttons).map((key, index) => {
                        return (
                            <div key={index} className="swal-button-container">
                                <button className={`swal-button swal-button--${key}`} onClick={() => this.onButtonClick(key, this.buttons[key])}>
                                    {this.buttons[key].text}
                                </button>
                                <div className="swal-button__loader">
                                </div>
                            </div>
                        );
                    })
                )
            }
            return null;
        };

        return (
            <div onAnimationEnd={this.onAnimationEnd} className={classNames(['swal-modal', {show: this.state.show}, {hide: this.state.hide}])}>
                {this.props.title ? <div className="swal-title">{this.props.title}</div> : null}
                {this.props.text ? <div className="swal-text">{this.props.text}</div> : null}
                <div className="swal-footer">
                    {renderButtons()}
                </div>
            </div>
        )
    }

    dismiss() {
        this.setState({
            show: false,
            hide: true
        });

        this.onAnimationEnd = () => {
            if(this.state.hide) {
                setTimeout(() => {
                    this.props.modalInstance.dismiss();
                }, 0);
            }
        }

    }

    close(key: string) {
        this.setState({
            show: false,
            hide: true
        });

        this.onAnimationEnd = () => {
            if(this.state.hide) {
                setTimeout(() => {
                    this.props.modalInstance.close<string>({
                        source: key
                    });
                }, 0);
            }
        }

    }

    onAnimationEnd() {
    }
}