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
import { RouteComponentProps } from 'react-router';
import Http from '@/shared/utils/http';
import client from '@/shared/utils/gql-client';
import gql from 'graphql-tag';

interface ComposePageProps extends RouteComponentProps<any, any> {
    [key: string]: any
}

interface ComposePageStates {
    article: Article
}

class ComposePage extends Component<ComposePageProps, any> {

    private article = {
        state: PostState.OFFLINE
    };
    private http: Http;

    constructor(props) {
        super(props);
        this.http = new Http();
        this.state = {
            article: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        const articleId = this.props.match.params.articleId;
        if(articleId) {
            this.fetchData(articleId).then((article) => {
                this.setState({
                    article
                });
            });
        }
    }

    fetchData(articleId): Promise<Article> {
        
        return new Promise<Article>((resolve, reject) => {
            client.query<{
                article: Article
            }>({
                query: gql`
                    query fetchArticle($id: String) {
                        article(id: $id) {
                            title,
                            content,
                            publishDate,
                            author {
                                login
                            }
                        }
                    }
                `,
                variables: {
                    id: articleId
                }
            }).then((result) => {
                if(result.errors) {
                    reject(result.errors);
                }
                this.article = result.data.article;
                resolve(result.data.article);
            }, (reason) => {
                reject(reason);
            });
        });
    }

    onChange(article: Article) {
        Object.assign(this.article, article);
    }

    onSubmit() {
        const articleId = this.props.match.params.articleId;
        if(articleId) {
            this.edit(this.article as Article);
        } else {
            this.save(this.article as Article);
        }
    }

    edit(article: Article){
        alert('edit');
    }

    save(article: Article) {
        const { history } = this.props;
        this.http.post<Article, Article>('/api/articles', 
            (article), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).subscribe((res) => {
                history.push('/articles/management');
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
                            <HeaderEditor onChange={this.onChange} article={this.state.article}></HeaderEditor>
                            <WidgetEditor onChange={this.onChange} type={WidgetEditorType.Image}></WidgetEditor>
                            <ArticleEditor onChange={this.onChange} article={this.state.article} className="body-editor">
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