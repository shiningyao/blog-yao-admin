import * as React from 'react';
import { Component } from "react";
import classNames from 'classnames';
import HeaderEditor from '@/components/editor/header.component';
import { WidgetEditor, WidgetEditorType } from "@/components/editor/widget.component";
import { ComposePageWrapper, Wrapper, ComposePageSidebar, ComposePageNavbar } from '@/pages/articles/compose.style';
import { PageBody } from '@/pages/styles';
import { ArticleEditor } from '@/components/editor/editor.component';
import { connect } from 'react-redux';
import { Article, PostStatus } from '@/domain/article';
import { RouteComponentProps, Prompt } from 'react-router';
import Http from '@/shared/utils/http';
import client from '@/shared/utils/gql-client';
import gql from 'graphql-tag';
import { SERVER_API_URL } from '@/app.constants';
import { Toolbar } from '@/pages/articles/compose.style';

interface ComposePageProps extends RouteComponentProps<any, any> {
    [key: string]: any
}

interface ComposePageStates {
    article: any,
    showSidebar: boolean
}

class ComposePage extends Component<ComposePageProps, ComposePageStates> {

    private article = {
        status: PostStatus.OFFLINE
    };
    private http: Http;

    constructor(props) {
        super(props);
        this.http = new Http();
        this.state = {
            article: {},
            showSidebar: false
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

    componentWillUpdate() {
        
    }

    fetchData(articleId): Promise<Article> {
        
        return new Promise<Article>((resolve, reject) => {
            client.query<{
                article: Article
            }>({
                query: gql`
                    query fetchArticle($id: String) {
                        article(id: $id) {
                            id,
                            title,
                            content,
                            publishDate,
                            author {
                                id,
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
                this.article = Object.assign({}, result.data.article);
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
        this.article.status = PostStatus.ONLINE;
        if(articleId) {
            this.edit(this.article as Article);
        } else {
            this.save(this.article as Article);
        }
    }

    edit(article: Article){
        const { history } = this.props;
        this.http.put<Article, Article>(`${SERVER_API_URL}/api/articles/${article.id}`, article, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).subscribe(() => {
            history.push('/articles/management');
        }, () => {
            alert('error');
        });
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
            <Wrapper>
                <header className="app-header">
                    <ComposePageNavbar>
                        <div className="navbar-wrapper">
                            <div className="navbar-container container-fluid">
                                <Toolbar>
                                    <div className="pull-left">
                                        <a href="javascript:void(0)" className="btn btn-default" onClick={() => this.props.history.goBack()}>
                                            Close
                                        </a>
                                    </div>
                                    <div className="pull-right">
                                        <a href="javascript:void(0)" className={classNames("btn btn-default sidebar-toggle", {active: this.state.showSidebar})} onClick={() => this.setState({showSidebar: !this.state.showSidebar})}>
                                            <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g>
                                                    <path d="M20 12c0-.568-.06-1.122-.174-1.656l1.834-1.612-2-3.464-2.322.786c-.82-.736-1.787-1.308-2.86-1.657L14 2h-4l-.48 2.396c-1.07.35-2.04.92-2.858 1.657L4.34 5.268l-2 3.464 1.834 1.612C4.06 10.878 4 11.432 4 12s.06 1.122.174 1.656L2.34 15.268l2 3.464 2.322-.786c.82.736 1.787 1.308 2.86 1.657L10 22h4l.48-2.396c1.07-.35 2.038-.92 2.858-1.657l2.322.786 2-3.464-1.834-1.613c.113-.535.174-1.09.174-1.657zm-8 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
                                                </g>
                                            </svg>
                                        </a>
                                        <a href="javascript:void(0)" className="btn preview-button">
                                            Preview
                                        </a>
                                        <a onClick={this.onSubmit} href="javascript:void(0)" className="btn publish-button">
                                            Publish
                                        </a>
                                    </div>
                                </Toolbar>
                            </div>
                        </div>
                    </ComposePageNavbar>
                </header>
                <main className="main-container">
                    <ComposePageSidebar className={classNames([{'collapsed': !this.state.showSidebar}])}>
                        <div className="sidebar-inner">
                            asdasd
                        </div>
                    </ComposePageSidebar>
                    <ComposePageWrapper>
                        {/* <PageHeader className="card">
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
                        </PageHeader> */}
                        <PageBody>
                            <div className="card">
                                {/* <div className="card-header with-border">
                                    <a onClick={this.onSubmit} href="javascript:void(0)" className="btn btn-primary pull-right">
                                        Submit
                                    </a>
                                </div> */}
                                <div className="card-body">
                                    <article>
                                        <HeaderEditor onChange={this.onChange} article={this.state.article}></HeaderEditor>
                                        <WidgetEditor onChange={this.onChange} type={WidgetEditorType.Image}></WidgetEditor>
                                        <ArticleEditor onChange={this.onChange} article={this.state.article} className="body-editor">
                                        </ArticleEditor>
                                    </article>
                                </div>
                            </div>
                        </PageBody>
                    </ComposePageWrapper>
                    <Prompt when={true} message="System may not save your modification.">
                    </Prompt>
                </main>
            </Wrapper>
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