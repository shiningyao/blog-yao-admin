import * as React from 'react';
import { Component } from "react";
import { List } from 'react-virtualized';
import { PageBody, PageWrapper } from '@/pages/styles';
import range = require('lodash/range');
import { ManagementPageWrapper, ManagementPageHeader } from '@/pages/articles/management.styles';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import * as moment from 'moment';

const list = range(0, 10);

class ArticleManagementPage extends Component<any, any> {

    private listContainerRef: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.state = {
            listWidth: 300,
            listHeight: 300,
            list
        };
        this.listContainerRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        const resetSize = () => {
            this.setState({
                listWidth: this.listContainerRef.current.clientWidth,
                listHeight: this.listContainerRef.current.clientHeight
            });
        };
        resetSize();
        window.addEventListener('resize', function() {
            resetSize();
        });
    }

    render() {
        return (
            <ManagementPageWrapper>
                <ManagementPageHeader className="card" style={{display: 'none'}}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="page-header-title">
                                <i className="icofont icofont-wheel bg-blue"></i>
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
                                        <NavLink to="/" href="javascript:void(0)">
                                            <i className="icofont icofont-home"></i>
                                        </NavLink>
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
                </ManagementPageHeader>
                <PageBody>
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-group pull-left" role="group">
                                <NavLink to="/articles/compose" className="btn btn-primary">
                                    <i className="icofont icofont-quill-pen"></i> Compose
                                </NavLink>
                            </div>
                            <ul className="pull-right category-list">
                                <li>
                                    <a className="active" href="javascript: void(0)">All</a>
                                </li>
                                <li>
                                    <a href="javascript: void(0)">Fashion</a>
                                </li>
                                <li>
                                    <a href="javascript: void(0)">Health</a>
                                </li>
                                <li>
                                    <a href="javascript: void(0)">Technology</a>
                                </li>
                            </ul>
                            <div className="text-center">
                                <div className="btn-group" role="group">
                                    <a href="javascript:void(0)" className="btn btn-primary btn-outline-primary">
                                        Published
                                    </a>
                                    <a href="javascript:void(0)" className="btn btn-primary btn-outline-primary">
                                        Drafts
                                    </a>
                                    <a href="javascript:void(0)" className="btn btn-primary btn-outline-primary">
                                        Trashed
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="article-list" ref={this.listContainerRef} style={{height: '100%'}}>
                                <Query query={gql`
                                    query {
                                        articles {
                                            title,
                                            author {
                                                login
                                            },
                                            publishDate
                                        }
                                    }
                                `} variables={{
                                    
                                }}>
                                    {({loading, error, data}) => {
                                        if(loading) return <p>Loading...</p>;
                                        if(error) return <p>{error.message}</p>;

                                        const articles = data.articles || [];

                                        function rowRenderer({
                                            key,         // Unique key within array of rows
                                            index,       // Index of row within collection
                                            isScrolling, // The List is currently being scrolled
                                            isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                                            style        // Style object to be applied to row (to position it)
                                          }) {

                                            function renderDuration(instant: moment.Moment) {
                                                const duration = moment.duration(instant.diff(moment.now()));
                                                return (
                                                    <span>
                                                        {duration.humanize(true)}
                                                    </span>
                                                )
                                            }

                                            return (
                                                <div className="article-list-item"
                                                    key={key}
                                                    style={style}
                                                >
                                                    <div className="article-summary">
                                                        <h4>{articles[index].title}</h4>
                                                        <p>
                                                            <span className="category-badge label label-warning">BLOG</span>
                                                            <span className="article-meta">{articles[index].author.login}</span>
                                                            <span className="article-meta">{renderDuration(moment.parseZone(articles[index].publishDate))}</span>
                                                            <span className="article-meta">4325 Reading</span>
                                                        </p>
                                                    </div>
                                                    <ul className="operations-col">
                                                        <li>
                                                            <a href="javascript: void(0)">
                                                                <i className="action-icon icofont icofont-edit-alt"></i>
                                                                Edit
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript: void(0)">
                                                                <i className="action-icon icofont icofont-eye-alt"></i>
                                                                View
                                                            </a>
                                                        </li>
                                                        <li className="move-to-trash">
                                                            <a href="javascript: void(0)">
                                                                <i className="action-icon icofont icofont-garbage"></i>
                                                                Trash
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript: void(0)">
                                                                <i className="action-icon ti-more-alt"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div>
                                                        <img className="article-thumb" src="http://themewing.com/wordpress/easyblog/wp-content/uploads/2015/01/demo2-1024x539.jpg" alt=""/>
                                                    </div>
                                                </div>
                                            );;
                                        }

                                        return (
                                            <List width={this.state.listWidth}
                                                height={this.state.listHeight}
                                                rowCount={articles.length}
                                                rowHeight={97}
                                                rowRenderer={rowRenderer}>
                                            </List>
                                        );
                                    }}
                                </Query>
                            </div>
                        </div>
                    </div>
                </PageBody>
            </ManagementPageWrapper>
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
)(ArticleManagementPage);