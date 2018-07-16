import * as React from 'react';
import { ComponentType, ComponentClass, Component, DOMElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { StaticContext, Omit } from "react-router";
import hoistStatics = require("hoist-non-react-statics");
import { canUseDOM } from '@/shared/utils/exenv';

export interface ModalComponentProps<P, C extends StaticContext = StaticContext> {
    modal: Modal,
    [key: string]: any
}

const ModalContext = React.createContext<any>({
    Component: null
});

class Modal {
    
    private backdrop: HTMLDivElement;

    constructor() {
        if(canUseDOM) {
            this.backdrop = document.createElement('div');
            this.backdrop.classList.add('modal-backdrop');
            this.backdrop.classList.add('fade');
        }
    }

    open(options: any = {
        render() {
            return null; 
        }
    }): Promise<ModalInstance> {
        if(!canUseDOM) {
            return Promise.reject(new Error('Can not manipulate DOM in current environment.'));
        }
        
        return new Promise((resolve, reject) => {
            document.body.appendChild(this.backdrop);

            setTimeout(() => {
                this.backdrop.classList.add('show');
                this.backdrop.addEventListener('transitionend', () => {
                    const modalInstance = new ModalInstance({
                        elementRender: options.render,
                        modal: this
                    });
                    resolve(modalInstance);
                });
            }, 10);
        });
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
}

class ModalInstance {

    private container: HTMLDivElement;

    constructor({elementRender, modal}: {
        elementRender: (any) => DOMElement<any, any>,
        modal: Modal
    }) {
        if(canUseDOM) {
            this.container = document.createElement('div');
            this.container.classList.add('modal-container');
            document.body.appendChild(this.container);
            render(elementRender({
                modalInstance: this
            }), this.container, () => {
    
            });
        }
    }

    dismiss() {
        unmountComponentAtNode(this.container);
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