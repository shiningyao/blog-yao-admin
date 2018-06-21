import * as React from 'react';
import {Component} from 'react';
import { Route, RouteProps, Redirect } from "react-router";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};

export default function PrivateRoute ({component: Component, ...rest}) {
    return (
        <Route
        {...rest}
        render={
            props => 
                fakeAuth.isAuthenticated ? 
                (<Component {...props} />) :
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
        }
        />
    );

}