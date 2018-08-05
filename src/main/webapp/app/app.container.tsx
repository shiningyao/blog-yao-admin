import * as React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as en from "react-intl/locale-data/en.js";
import * as zh from "react-intl/locale-data/zh.js";
import LoginPage from '@/shared/login/login.container';
import PrivateRoute from '@/shared/auth/route/private-route';
import AppLayout from '@/layout/layout.component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withModal } from '@/components/modal';
import { SweetAlert } from '@/components/modal/swal.component';
import { flatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

addLocaleData([...en, ...zh]);

export interface AppProps {
    compiler: string,
    framework: string,
    [key: string]: any
};

class BlogApp extends Component<AppProps, {}> {

    constructor(props) {
        super(props);
        this.getUserConfirmation = this.getUserConfirmation.bind(this);
    }

    getUserConfirmation(messages, callback) {
        this.props.modal.open({
            render: ({modalInstance}) => {
                return (
                    <SweetAlert modalInstance={modalInstance} 
                        icon="warning"
                        title="Leave current page?" 
                        text={messages}
                        dangerMode={true}
                        buttons={{
                            cancel: true,
                            confirm: true
                    }}></SweetAlert>
                )
            }
        }).result.pipe(catchError((error) => {
            callback(false);
            return of();
        })).pipe(flatMap(({modalInstance, payload, value}) => {
            if(payload) {
                switch (payload.source) {
                    case 'confirm':
                        callback(true);
                        break;
                    default:;
                }
            }
            return of();
        })).subscribe();
    }

    render() {
        
        return (
            <IntlProvider locale={this.props.locale.language} messages={this.props.locale.messages}>
                <Router getUserConfirmation={this.getUserConfirmation}>
                    <Route path="*" render={
                        props => {
                            if(props.match.url === '/login') {
                                return (
                                    <LoginPage {...props}></LoginPage>
                                );
                            } else {
                                return (
                                    <PrivateRoute title="Home" {...props} component={AppLayout} />
                                );
                            }
                        }
                    }>
                    </Route>

                </Router>
            </IntlProvider>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        locale: state.locale
    };
}

export default compose(
    connect<any, {}, AppProps, {}>(
        mapStateToProps
    ),
    withModal
)(BlogApp);