import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { AppLayout as Layout } from './styles';
import { Topbar } from '@/components/topbar/topbar.component';
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
                            <Route path="/editor" component={EditorPage}></Route>
                        </Switch>
                    </div>
                </main>
            </Layout>
        )
    }

}