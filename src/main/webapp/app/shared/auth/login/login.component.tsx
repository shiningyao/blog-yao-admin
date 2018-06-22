import * as React from 'react';
import { Component } from "react";
import { authenticate } from '@/shared/actions';
import { Redirect } from 'react-router';

interface LoginPageProps {
    [key: string]: any
}

export class LoginPage extends Component<LoginPageProps, {}> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        if(this.props.isAuthenticated) {
            return (
                <Redirect
                    to={from}></Redirect>
            );
        } else {
            return (
                <button onClick={this.props.authenticate}>Sign in{': ' + this.props.isAuthenticated}</button>
            );
        }
    }

}