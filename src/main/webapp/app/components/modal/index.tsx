import * as React from 'react';
import { ComponentType, ComponentClass, Component, DOMElement, ComponentState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { StaticContext, Omit } from "react-router";
import hoistStatics = require("hoist-non-react-statics");
import { canUseDOM } from '@/shared/utils/exenv';
import { Subject, Observable } from 'rxjs';
import isFunction = require('lodash/isFunction');

export interface ModalComponentProps<P, C extends StaticContext = StaticContext> {
    modal: Modal,
    [key: string]: any
}

export interface ModalPromise<T> extends Promise<T> {
    result?: Observable<any>;
};

const ModalContext = React.createContext<any>({
    Component: null
});

class Modal {
    
    private backdrop: HTMLDivElement;
    
    constructor() {
        this.destroy = this.destroy.bind(this);
    }

    open(options: any = {
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
            modal: this
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
    private resultSubject = new Subject<any>();

    constructor({elementRender, modal}: {
        elementRender: (any) => DOMElement<any, any>,
        modal: Modal
    }) {
        this.modal = modal;
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

    close() {
        unmountComponentAtNode(this.container);
        this.container.remove();
        this.modal.destroy();
        this.resultSubject.next({});
        this.resultSubject.complete();
    }

    dismiss() {
        unmountComponentAtNode(this.container);
        this.container.remove();
        this.modal.destroy();
        this.resultSubject.error({});
    }

    get result() {
        return this.resultSubject.asObservable();
    }

}

class ModalComponent extends Component<ModalComponentProps<any>, StaticContext> {
    
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

export function withModal<P extends ModalComponentProps<any>>(Component: ComponentType<Omit<P, keyof ModalComponentProps<any>>>): ComponentClass<Omit<P, keyof ModalComponentProps<any>>> {

    function C(props) {
        return (
            <ModalContext.Provider value={{Component: Component}}>
                <ModalComponent {...props} modal={new Modal()}>
                </ModalComponent>
            </ModalContext.Provider>
        )
    }
    
    return hoistStatics<Omit<P, keyof ModalComponentProps<any>>, StaticContext>(C, Component) as ComponentClass<Omit<P, keyof ModalComponentProps<any>>>;
}