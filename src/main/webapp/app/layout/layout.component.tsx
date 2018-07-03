import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '@/shared/auth/route/private-route';
import * as Loadable from 'react-loadable';
import { AppLayout as Layout } from './styles';
import Topbar from '@/components/topbar/topbar.container';
import { Sidebar } from '@/components/sidebar/sidebar.component';
import { Home } from '@/pages/home/home.component';
import { ArticleManagementPage } from '@/pages/articles/management.component';
import { ComposePage } from '@/pages/articles/compose.component';

const { Component } = React;

const EditorPage = Loadable({
    loader: () => import(/* webpackChunkName: "vendors.async" */ '@/pages/articles/editor.component'),
    loading() {
       return <div>Loading...</div>;
    },
    render(loaded, props) {
        let Component = loaded.ArticleEditorPage;
        return <Component {...props}/>;
    }
});

export default class AppLayout extends Component<{}, {}> {

    render() {
        return (
            <Layout className="app-layout">
                <header>
                    <Topbar></Topbar>
                </header>
                <main className="main-container">
                    <Sidebar {...this.props}></Sidebar>
                    <div className="main-content">
                        <Switch>
                            <Route exact path="/" render={
                                props => (
                                    <Redirect to={{
                                        pathname: '/dashboard'
                                    }}></Redirect>
                                )
                            }></Route>
                            <PrivateRoute path="/dashboard" component={Home}></PrivateRoute>
                            <PrivateRoute path="/articles/compose" component={ComposePage}></PrivateRoute>
                            <PrivateRoute path="/articles/editor" component={EditorPage}></PrivateRoute>
                            <PrivateRoute path="/articles/management" component={ArticleManagementPage}></PrivateRoute>
                        </Switch>
                    </div>
                </main>
            </Layout>
        )
    }

}