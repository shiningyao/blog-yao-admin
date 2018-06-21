import * as React from 'react';
import { Component } from "react";
import { isAuthenticated, authenticate } from '@/actions'
import { connect } from 'react-redux';

export class LoginPage extends Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.login}>Sign in{isAuthenticated + ''}</button>
        );
    }

    login() {
        authenticate();
    }
}

const mapStateToProps = state => ({
    todos: []
  })
  
  const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(id)
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);