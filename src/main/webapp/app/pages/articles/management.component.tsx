import * as React from 'react';
import { Component } from "react";
import { PageHeader, PageBody, PageWrapper } from '@/pages/styles';

export class ArticleManagementPage extends Component<any, any> {

    render() {
        return (
            <PageWrapper>
                <PageHeader className="card">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="page-header-title">
                                <i className="icofont icofont-edit bg-blue"></i>
                                <div className="title-text">
                                    <h4>Article Management</h4>
                                    <span>Manage the whole site's articles from the list below.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="page-header-breadcrumb">
                                <ul className="breadcrumb-title">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">
                                            <i className="icofont icofont-home"></i>
                                        </a>
                                    </li>
                                    {
                                        this.props.location.state.breadcrumbs.map(breadcrumb => (
                                            <li key={breadcrumb.name} className="breadcrumb-item">
                                                <a href="javascript:void(0)">
                                                    {breadcrumb.name}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </PageHeader>
                <PageBody>
                    <div className="card">
                        {/* <div className="card-header">
                            Article Editor
                        </div> */}
                        <div className="card-body">
                            asdasd
                        </div>
                    </div>
                </PageBody>
            </PageWrapper>
        );
    }

}