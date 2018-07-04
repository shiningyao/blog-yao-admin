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

addLocaleData([...en, ...zh]);

export interface AppProps {
    compiler: string,
    framework: string,
    [key: string]: any
};

class BlogApp extends Component<AppProps, {}> {

    render() {
        
        return (
            <IntlProvider locale={this.props.locale.language} messages={this.props.locale.messages}>
                <Router>
                    <Route path="*" render={
                        props => {
                            if(props.match.url === '/login') {
                                return (
                                    <LoginPage {...props}></LoginPage>
                                );
                            } else {
                                return (
                                    <div>
                                        <PrivateRoute title="Home" {...props} component={AppLayout} />
                                    </div>
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

export default connect<any, {}, AppProps, {}>(
    mapStateToProps
)(BlogApp);