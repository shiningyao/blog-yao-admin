import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '@/shared/auth/route/private-route';
import * as Loadable from 'react-loadable';
import { AppLayout as Layout } from './styles';
import Topbar from '@/components/topbar/topbar.container';
import { Sidebar } from '@/components/sidebar/sidebar.component';
import { Home } from '@/pages/home/home.component';

const { Component } = React;

const EditorPage = Loadable({
    loader: () => import(/* webpackChunkName: "vendors.async" */ '@/pages/editor/editor.component'),
    loading() {
       return <div>Loading...</div>;
    },
    render(loaded, props) {
        let Component = loaded.EditorPage;
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
                    <Sidebar></Sidebar>
                    <div className="main-content">
                        <Switch>
                            <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                            <PrivateRoute path="/editor" component={EditorPage}></PrivateRoute>
                        </Switch>
                    </div>
                </main>
            </Layout>
        )
    }

}