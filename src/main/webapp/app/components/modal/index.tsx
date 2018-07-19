import * as React from 'react';
import { ComponentType, ComponentClass, Component, ReactElement, ComponentState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { StaticContext, Omit } from "react-router";
import hoistStatics = require("hoist-non-react-statics");
import { canUseDOM } from '@/shared/utils/exenv';
import { Subject, Observable } from 'rxjs';
import { Dialog } from '@/components/modal/dialog.component';
import { SweetAlert } from '@/components/modal/swal.component';
import isArray = require('lodash/isArray');

export interface ModalProps<P, C extends StaticContext = StaticContext> {
    modal: Modal,
    [key: string]: any
}

export interface ModalPromise<T> extends Promise<T> {
    result?: Observable<ModalResult>;
};

interface ModalResultPayload<T = any, S = any> {
    source?: S,
    data?: T
}

interface ModalResult {
    modalInstance: ModalInstance,
    payload?: ModalResultPayload
}

interface ModalAllowedComponent extends ReactElement<Dialog | SweetAlert> {

}

interface ModalInstanceRenderProps {
    modalInstance: ModalInstance
}

interface ModalOpenOptions {
    closeModal?: [boolean, boolean] | [boolean],
    render: (props: ModalInstanceRenderProps) => ModalAllowedComponent
}

const ModalContext = React.createContext<any>({
    Component: null
});

class Modal {
    
    private backdrop: HTMLDivElement;
    
    constructor() {
        this.destroy = this.destroy.bind(this);
    }

    open(options: ModalOpenOptions = {
        render() {
            return null; 
        }
    }): ModalPromise<ModalInstance> {
        if(!canUseDOM) {
            return Promise.reject(new Error('Can not manipulate DOM in current environment.'));
        }
        
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add('modal-backdrop');
        this.backdrop.classList.add('fade');

        const modalInstance = new ModalInstance({
            elementRender: options.render,
            modal: this,
            closeModal: options.closeModal
        });

        const promise: ModalPromise<ModalInstance> = new Promise<ModalInstance>((resolve, reject) => {
            document.body.appendChild(this.backdrop);

            setTimeout(() => {
                this.backdrop.classList.add('show');
                this.backdrop.addEventListener('transitionend', () => {
                    if(this.backdrop.classList.contains('show')) {
                        resolve(modalInstance);
                    } else {
                        this.backdrop.remove();
                        delete this.backdrop;
                    }
                });
            }, 150);
        });

        promise.result = modalInstance.result;

        return promise;
    }

    confirm() {
        return this.open({
            render: () => {
                return (
                    <div></div>
                );
            }
        });
    }

    destroy() {
        if(this.backdrop) {
            this.backdrop.classList.remove('show');
        }
    }
}

export class ModalInstance {

    private container: HTMLDivElement;
    private modal: Modal;
    renderedComponent: Component<any, ComponentState> | Element | void;
    private resultSubject = new Subject<ModalResult>();
    private closeModalAfterDismiss = true;
    private closeModalAfterClose = true;

    constructor({elementRender, modal, closeModal}: {
        elementRender: (props: ModalInstanceRenderProps) => ModalAllowedComponent,
        modal: Modal,
        closeModal?: [boolean, boolean] | [boolean]
    }) {
        this.modal = modal;
        if(isArray(closeModal)) {
            this.closeModalAfterDismiss = closeModal[0] === undefined ? true : closeModal[0];
            this.closeModalAfterClose = closeModal[1] === undefined ? true : closeModal[1];
        }
        if(canUseDOM) {
            this.container = document.createElement('div');
            this.container.classList.add('modal-container');
            document.body.appendChild(this.container);
            this.renderedComponent = render(elementRender({
                modalInstance: this
            }), this.container, () => {
    
            });
        }
    }

    close<S = any, T = any>(payload?: ModalResultPayload<T, S>) {
        unmountComponentAtNode(this.container);
        this.container.remove();
        if(this.closeModalAfterClose) {
            this.modal.destroy();
        }
        this.resultSubject.next({
            modalInstance: this,
            payload: payload
        });
        this.resultSubject.complete();
    }

    dismiss() {
        unmountComponentAtNode(this.container);
        this.container.remove();
        if(this.closeModalAfterDismiss) {
            this.modal.destroy();
        }
        this.resultSubject.error({
            modalInstance: this
        });
    }

    get result() {
        return this.resultSubject.asObservable();
    }

    open(options: ModalOpenOptions = {
        render() {
            return null; 
        }
    }): ModalInstance {
        unmountComponentAtNode(this.container);
        this.container.remove();
        const modalInstance = new ModalInstance({
            elementRender: options.render,
            modal: this.modal,
            closeModal: options.closeModal
        });
        return modalInstance;
    }
}

class ModalComponent extends Component<ModalProps<any>, StaticContext> {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ModalContext.Consumer>
                {({Component}) => {
                    if(!Component) {
                        return null;
                    } else {
                        return <Component {...this.props}></Component>
                    }
                }}
            </ModalContext.Consumer>
        );
    }

}

export function withModal<P extends ModalProps<any>>(Component: ComponentType<Omit<P, keyof ModalProps<any>>>): ComponentClass<Omit<P, keyof ModalProps<any>>> {

    function C(props) {
        return (
            <ModalContext.Provider value={{Component: Component}}>
                <ModalComponent {...props} modal={new Modal()}>
                </ModalComponent>
            </ModalContext.Provider>
        )
    }
    
    return hoistStatics<Omit<P, keyof ModalProps<any>>, StaticContext>(C, Component) as ComponentClass<Omit<P, keyof ModalProps<any>>>;
}