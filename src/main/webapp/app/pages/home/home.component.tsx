import * as React from 'react';
import { Component } from "react";
import { FormattedMessage } from 'react-intl';

export class Home extends Component<{}, {}> {

    render() {
        return (
            <FormattedMessage id="Weather.message" defaultMessage="Because it is sunny!" />
        );
    }

}