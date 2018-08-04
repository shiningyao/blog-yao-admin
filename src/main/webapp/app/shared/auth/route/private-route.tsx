import * as React from 'react';
import { Component, createElement } from 'react';
import { Route, RouteProps, Redirect } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { identity } from '@/shared/actions';
import { DefaultLayout } from '@/layout/layout.component';

interface PrivateRouteProps extends RouteProps {
    [key: string]: any
}

interface PrivateRouteStates {
    isIdentity: boolean
}

class PrivateRoute<T extends PrivateRouteProps, S = any> extends Component<PrivateRouteProps, PrivateRouteStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isIdentity: false
        };
    }

    componentDidMount() {
        this.props.identity().then((account) => {
            this.setState({
                isIdentity: true
            });
        });
    }

    render() {
        const {component: Component, layout, ...rest} = this.props;
        return (
            <Route
            {...rest}
            render={
                props => {
                    if(this.state.isIdentity) {
                        if(this.props.isAuthenticated) {
                            if(this.props.render) {
                                return this.props.render(props);
                            } else if (layout) {
                                return createElement(layout, {}, <Component {...props} />);
                            } else {
                                return (<Component {...props} />);
                            }
                        } else {
                            return <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        }
                    }
                    return null;
                }
            }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    };
}

const mapDispatchToProps = (dispath) => {
    return {
        identity: bindActionCreators(identity, dispath)
    };
}

export default connect<PrivateRouteProps, {}, PrivateRouteProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute);