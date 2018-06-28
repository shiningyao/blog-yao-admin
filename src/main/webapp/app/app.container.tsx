import * as React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as en from "react-intl/locale-data/en.js";
import * as zh from "react-intl/locale-data/zh.js";
import LoginPage from '@/shared/login/login.container';
import PrivateRoute from '@/shared/auth/route/private-route';
import AppLayout from '@/layout/layout.component';

import { localeData } from '@/i18n';
import { connect } from 'react-redux';
import { changeLangKey } from '@/shared/actions';
import { bindActionCreators } from 'redux';

addLocaleData([...en, ...zh]);

export interface AppProps {
    compiler: string,
    framework: string,
    [key: string]: any
};

const language =
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        (navigator as any).userLanguage;

class BlogApp extends Component<AppProps, {}> {
    
    get lang() {
        let lang = language;
        if(this.props.userInfo && this.props.userInfo.langKey) {
            lang = this.props.userInfo.langKey;
        }
        return lang;
    }

    get messages() {
        const languageWithoutRegionCode = this.lang.toLowerCase().split(/[_-]+/)[0];

        const messages =
            localeData[languageWithoutRegionCode] ||
            localeData[this.lang] ||
            localeData.en;

        return messages;
    }

    render() {
        
        return (
            <IntlProvider locale={this.lang} messages={this.messages}>
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
                                        <PrivateRoute {...props} component={AppLayout} />
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
        userInfo: state.userInfo
    };
}

export default connect<any, {}, AppProps, {}>(
    mapStateToProps
)(BlogApp);