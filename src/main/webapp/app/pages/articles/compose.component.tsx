import * as React from 'react';
import { Component } from "react";
import HeaderEditor from '@/components/editor/header.component';
import { WidgetEditor, WidgetEditorType } from "@/components/editor/widget.component";
import { EditorPageWrapper } from '@/pages/articles/editor.styles';
import { PageHeader, PageBody } from '@/pages/styles';
import { ArticleEditor } from '@/components/editor/editor.component';
import { connect } from 'react-redux';
import { Article, PostState } from '@/domain/article';
import { NavLink } from 'react-router-dom';
import Http from '@/shared/utils/http';

class ComposePage extends Component<any, any> {

    private article = {
        state: PostState.OFFLINE
    };
    private http: Http;

    constructor(props) {
        super(props);
        this.http = new Http();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(article: Article) {
        Object.assign(this.article, article);
    }

    onSubmit() {
        this.http.post<Article, Article>('/api/articles', 
            (this.article as Article), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).subscribe((res) => {
                console.log(res);
        });
    }

    render() {
        return (
            <EditorPageWrapper>
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
                                    {
                                        this.props.breadcrumbs.map(breadcrumb => (
                                            <li key={breadcrumb.id} className="breadcrumb-item">
                                                {
                                                    breadcrumb.to ? 
                                                    <NavLink to={breadcrumb.to}>
                                                        {breadcrumb.title}
                                                    </NavLink> : 
                                                    <a href="javascript:void(0)">
                                                        {breadcrumb.title}
                                                    </a>
                                                }
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
                        <div className="card-header with-border">
                            <a onClick={this.onSubmit} href="javascript:void(0)" className="btn btn-primary pull-right">
                                Submit
                            </a>
                        </div>
                        <div className="card-body">
                            <HeaderEditor onChange={this.onChange}></HeaderEditor>
                            <WidgetEditor onChange={this.onChange} type={WidgetEditorType.Image}></WidgetEditor>
                            <ArticleEditor onChange={this.onChange} className="body-editor">
                            </ArticleEditor>
                        </div>
                    </div>
                </PageBody>
            </EditorPageWrapper>
        );
    }

}

function mapStateToProps(state) {
    return {
        breadcrumbs: state.breadcrumbs
    };
}

export default connect(
    mapStateToProps
)(ComposePage);