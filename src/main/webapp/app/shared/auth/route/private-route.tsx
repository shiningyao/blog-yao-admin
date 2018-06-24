import * as React from 'react';
import { Component } from 'react';
import { Route, RouteProps, Redirect } from "react-router";
import { connect } from 'react-redux';

interface PrivateRouteProps extends RouteProps {
    [key: string]: any
}

class PrivateRoute<T extends PrivateRouteProps, S = any> extends Component<PrivateRouteProps, any> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {component: Component, ...rest} = this.props;
        return (
            <Route
            {...rest}
            render={
                props => {
                    if(this.props.isAuthenticated) {
                        return (<Component {...props} />);
                    } else {
                        return <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    }
                }
            }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, state);
}

const mapDispatchToProps = (dispath) => {
    return {

    };
}

export default connect<PrivateRouteProps, {}, PrivateRouteProps, {}>(
    mapStateToProps
)(PrivateRoute);