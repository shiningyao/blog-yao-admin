import * as React from 'react';
import { ComponentType, ComponentClass, Component, ReactElement, ComponentState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { StaticContext, Omit } from "react-router";
import hoistStatics = require("hoist-non-react-statics");
import { canUseDOM } from '@/shared/utils/exenv';
import { Subject, Observable, from, OperatorFunction, Subscription, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Dialog } from '@/components/modal/dialog.component';
import { SweetAlert } from '@/components/modal/swal.component';
import isArray = require('lodash/isArray');

export interface ModalProps<P, C extends StaticContext = StaticContext> {
    modal: Modal,
    [key: string]: any
}

export interface ModalObserable<T> extends Observable<T> {
    result?: ModalResultSubject;
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
    }): ModalObserable<ModalInstance> {
        if(!canUseDOM) {
            return from(Promise.reject(new Error('Can not manipulate DOM in current environment.')));
        }
        
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add('modal-backdrop');
        this.backdrop.classList.add('fade');

        const modalInstance = new ModalInstance({
            elementRender: options.render,
            modal: this,
            closeModal: options.closeModal
        });

        const promise = new Promise<ModalInstance>((resolve, reject) => {
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

        const observable = from(promise) as ModalObserable<ModalInstance>;

        observable.result = modalInstance.result;

        return observable;
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
    private completeSubject: Subject<any>;
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

    close() {
        unmountComponentAtNode(this.container);
        this.container.remove();
        if(this.closeModalAfterClose) {
            this.modal.destroy();
        }
    }

    beforeClose<S = any, T = any>(payload?: ModalResultPayload<T, S>) {
        
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
        if(!this.completeSubject) {
            this.completeSubject = new Subject<any>();
        }
        const modalResultSubject = new ModalResultSubject(this.resultSubject.asObservable(), this.completeSubject);
        return modalResultSubject;
    }

    get completeObservable() {
        const completeObservable = this.completeSubject || Observable.create(observer => observer.next());
        return completeObservable;
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

class ModalResultSubject {

    private resultObservable: Observable<ModalResult>;
    private completeSubject = new Subject<any>();
    private observables: Observable<any>[] = [];
    private subscribed = false;
    private modalResult: ModalResult;

    constructor(resultObservable: Observable<ModalResult>, completeSubject: Subject<any>) {
        this.resultObservable = resultObservable.pipe(flatMap((value) => {
            this.modalResult = value;
            return of(value);
        }));
        this.completeSubject = completeSubject;
        this.observables.push(this.resultObservable);
    }

    pipe<A>(op1: OperatorFunction<ModalResult | any, A>): ModalResultSubject {
        const source = this.observables[this.observables.length - 1];
        this.observables.push(source.pipe(flatMap((value) => {
            return of(Object.assign({
                value
            }, this.modalResult));
        })).pipe(op1));
        return this;
    }

    subscribe(): Subscription {
        const source = this.observables[this.observables.length - 1];
        const subscription = source.subscribe(this.completeSubject);
        this.subscribed = true;
        return subscription;
    }

    get observable() {
        return this.resultObservable;
    }

    get isSubscribed() {
        return this.subscribed;
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