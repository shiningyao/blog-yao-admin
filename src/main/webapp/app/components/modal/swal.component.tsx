import * as React from "react";
import { Component } from "react";
import * as classNames from 'classnames';
import { SwalOptions } from "sweetalert/typings/modules/options";
import { ButtonList, ButtonOptions } from "sweetalert/typings/modules/options/buttons";
import { ModalInstance } from "@/components/modal";
import isFunction = require('lodash/isFunction');
import isArray = require('lodash/isArray');
import isString = require('lodash/isString');
import isBoolean = require('lodash/isBoolean');
import isObject = require('lodash/isObject');
import { Subscription } from "rxjs";

const CONFIRM_KEY = "confirm";
const CANCEL_KEY = "cancel";

interface SweetAlertProps {
    modalInstance: ModalInstance;
    title?: string;
    text?: string;
    icon?: string;
    dangerMode?: boolean,
    buttons?: ButtonList | Array<string | boolean> | boolean;
    beforeSubmit?: () => Promise<any> | boolean;
}

interface SweetAlertStates {
    show: boolean,
    hide: boolean,
    loading: boolean
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
    private completeSubscription: Subscription;

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            hide: false,
            loading: false
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

    componentWillUnmount() {
        if(this.completeSubscription) {
            this.completeSubscription.unsubscribe();
        }
    }

    onButtonClick(key: string) {
        
        if(key === CANCEL_KEY) {
            this.dismiss();
            return false;
        }

        this.close(key);
    }

    render() {

        const renderButtons = () => {

            const focusKey = this.props.dangerMode ? CANCEL_KEY : CONFIRM_KEY;

            if(this.buttons) {
                return (
                    Object.keys(this.buttons).map((key, index) => {
                        return (
                            <div key={index} className={classNames(['swal-button-container', {loading: this.state.loading}])}>
                                <button disabled={this.state.loading} className={`swal-button swal-button--${key === CONFIRM_KEY ? (this.props.dangerMode ? 'danger' : key) : key}`} autoFocus={key === focusKey} onClick={() => this.onButtonClick(key)}>
                                    {this.buttons[key].text}
                                </button>
                                {key === CONFIRM_KEY ?
                                    <div className={classNames(['swal-button__loader', {loading: this.state.loading}])}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div> : null
                                }
                            </div>
                        );
                    })
                )
            }
            return null;
        };

        const renderIcon = () => {
            if(this.props.icon === 'warning') {
                return (
                    <div className="swal-icon swal-icon--warning">
                        <span className="swal-icon--warning__body">
                            <span className="swal-icon--warning__dot"></span>
                        </span>
                    </div>
                )
            }

            if(this.props.icon === 'success') {
                return (
                    <div className="swal-icon swal-icon--success">
                        <span className="swal-icon--success__line swal-icon--success__line--long"></span>
                        <span className="swal-icon--success__line swal-icon--success__line--tip"></span>
                        <span className="swal-icon--success__ring"></span>
                        <span className="swal-icon--success__hide-corners"></span>
                    </div>
                )
            }

            if(this.props.icon === 'error') {
                return (
                    <div className="swal-icon swal-icon--error">
                        <div className="swal-icon__x-mark">
                            <span className="swal-icon--error__line swal-icon--error__line--left"></span>
                            <span className="swal-icon--error__line swal-icon--error__line--right"></span>
                        </div>
                    </div>
                )
            }

            if(this.props.icon === 'info') {
                return (
                    <div className="swal-icon swal-icon--info">
                    </div>
                )
            }

            return null;
        };

        return (
            <div onAnimationEnd={this.onAnimationEnd} className={classNames(['swal-modal', {show: this.state.show}, {hide: this.state.hide}])}>
                {this.props.icon ? renderIcon() : null}
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

    close<T = any>(key: string, data?: T) {

        this.props.modalInstance.beforeClose<string, T>({
            source: key,
            data
        });

        this.setState({
            loading: true
        });

        this.completeSubscription = this.props.modalInstance.completeObservable.subscribe((value) => {
            this.setState({
                show: false,
                hide: true,
                loading: false
            });
    
            this.onAnimationEnd = () => {
                if(this.state.hide) {
                    setTimeout(() => {
                        this.props.modalInstance.close();
                    }, 0);
                }
            }
        }, () => {
        }, () => {
            this.setState({
                show: false,
                hide: true,
                loading: false
            });
    
            this.onAnimationEnd = () => {
                if(this.state.hide) {
                    setTimeout(() => {
                        this.props.modalInstance.close();
                    }, 0);
                }
            }
        });

    }

    onAnimationEnd() {
    }
}