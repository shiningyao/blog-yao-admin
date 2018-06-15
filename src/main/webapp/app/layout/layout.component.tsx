import * as React from 'react';
import { Route } from 'react-router-dom';
import { AppLayout as Layout } from './styles';
import { Topbar } from '@/components/topbar/topbar.component';
import { Sidebar } from '@/components/sidebar/sidebar.component';
import { Home } from '@/pages/home/home.component';

const { Component } = React;

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
                        <Route exact path="/" component={Home}></Route>
                    </div>
                </main>
            </Layout>
        )
    }

}