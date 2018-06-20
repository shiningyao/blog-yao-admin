import * as React from "react";
import { Component } from "react";
import { ArticleEditor } from "@/components/editor/editor.component";
import { PageWrapper, PageHeader, PageBody } from "@/pages/styles";

export class EditorPage extends Component {

    render() {
        return (
            <PageWrapper>
                <PageHeader className="card">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="page-header-title">
                                <i className="icofont icofont-edit bg-blue"></i>
                                <div className="title-text">
                                    <h4>Article Editor</h4>
                                    <span>A classic WYSIWYG editor for publishing articles.</span>
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
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">
                                            Articles
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">
                                            Article Editor
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </PageHeader>
                <PageBody>
                    <div className="card">
                        <div className="card-header">
                            Article Editor
                        </div>
                        <div className="card-body">
                            <ArticleEditor></ArticleEditor>
                        </div>
                    </div>
                </PageBody>
            </PageWrapper>
        );
    }

}