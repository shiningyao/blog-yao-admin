import * as React from "react";
import { Component } from "react";
import { } from 'sweetalert';
import { SwalOptions } from "sweetalert/typings/modules/options";

interface SweetAlertProps {
    title?: string
}

export class SweetAlert extends Component<SweetAlertProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="swal-modal">
                <div className="swal-text">asdasdasd</div>
                <div className="swal-footer">
                    <button className="btn btn-primary">Success</button>
                </div>
            </div>
        )
    }
}