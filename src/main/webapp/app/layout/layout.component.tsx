import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '@/shared/auth/route/private-route';
import * as Loadable from 'react-loadable';
import { AppLayout as Layout } from './styles';
import Topbar from '@/components/topbar/topbar.container';
import { Sidebar } from '@/components/sidebar/sidebar.component';
import { Home } from '@/pages/home/home.component';
import LoginPage from '@/shared/login/login.container';

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

export interface LayoutProps {
    compiler: string,
    framework: string
};

export class AppLayout extends Component<LayoutProps, {}> {

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
                            <Route exact path="/" component={Home}></Route>
                            <Route path="/login" component={LoginPage}></Route>
                            <PrivateRoute path="/editor" component={EditorPage}></PrivateRoute>
                        </Switch>
                    </div>
                </main>
            </Layout>
        )
    }

}