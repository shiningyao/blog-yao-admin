import * as React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '@/shared/auth/route/private-route';
import * as Loadable from 'react-loadable';
import { ApolloProvider } from "react-apollo";
import { AppLayout as Layout } from '@/layout/styles';
import Topbar from '@/components/topbar/topbar.container';
import { Sidebar } from '@/components/sidebar/sidebar.component';
import { Home } from '@/pages/home/home.component';
import ArticleManagementPage from '@/pages/articles/management.component';
import ComposePage from '@/pages/articles/compose.component';
import client from '@/shared/utils/gql-client';

const { Component } = React;

const EditorPage = Loadable({
    loader: () => import(/* webpackChunkName: "vendors.async" */ '@/pages/articles/editor.component'),
    loading() {
       return <div>Loading...</div>;
    },
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props}/>;
    }
});

export class RootLayout extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout className="app-layout">
                {this.props.children}
            </Layout>
        );
    }

}

export class DefaultLayout extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout className="app-layout">
                <header className="app-header">
                    <Topbar></Topbar>
                </header>
                <main className="main-container">
                    <Sidebar></Sidebar>
                    <div className="main-content">
                        {this.props.children}
                    </div>
                </main>
            </Layout>
        );
    }
}

export default class AppLayout extends Component<{}, {}> {

    render() {
        return (
            <ApolloProvider client={client}>
                <Switch>
                    <PrivateRoute exact path="/" render={
                        props => (
                            <Redirect to={{
                                pathname: '/dashboard'
                            }}></Redirect>
                        )
                    }></PrivateRoute>
                    <PrivateRoute path="/dashboard" component={Home} layout={DefaultLayout}></PrivateRoute>
                    <PrivateRoute path="/articles/compose/:articleId?" component={ComposePage} layout={RootLayout}></PrivateRoute>
                    <PrivateRoute path="/articles/editor" component={EditorPage} layout={DefaultLayout}></PrivateRoute>
                    <PrivateRoute path="/articles/management" forceRefresh={true} component={ArticleManagementPage} layout={DefaultLayout}></PrivateRoute>
                </Switch>
                {/* <Switch>
                    <Route>
                        <Layout className="app-layout">
                            <header className="app-header">
                                <Topbar></Topbar>
                            </header>
                            <main className="main-container">
                                <Sidebar></Sidebar>
                                <div className="main-content">
                                    
                                </div>
                            </main>
                        </Layout>
                    </Route>
                </Switch> */}
            </ApolloProvider>
        )
    }

}