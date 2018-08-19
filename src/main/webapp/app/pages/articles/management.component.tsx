import * as React from 'react';
import { Component } from "react";
import * as Observable from 'rxjs';
import { flatMap, delay, catchError } from 'rxjs/operators';
import { List } from 'react-virtualized';
import { PageBody } from '@/pages/styles';
import { ManagementPageWrapper, ManagementPageHeader } from '@/pages/articles/management.styles';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import * as classNames from 'classnames';
import gql from 'graphql-tag';
import * as moment from 'moment';
import { PostStatus, Article } from '@/domain/article';
import { withModal, ModalProps, ModalInstance } from '@/components/modal';
import { compose } from 'redux';
import { Dialog, DialogButtonType } from '@/components/modal/dialog.component';
import { SweetAlert } from '@/components/modal/swal.component';
import Http from '@/shared/utils/http';
import { SERVER_API_URL } from '@/app.constants';

interface ArticleManagementPageStates {
    listWidth: number,
    listHeight: number,
    showSearchBar: boolean,
    filters: {
        status: PostStatus
    }
}

interface ArticleManagementPageProps extends ModalProps<{}> {
    [key: string]: any
}

class ArticleManagementPage extends Component<ArticleManagementPageProps, ArticleManagementPageStates> {

    private listContainerRef: React.RefObject<HTMLDivElement>;
    private refetchListData: (variables?: {}) => Promise<{}> = () => new Promise((resolve) => resolve());
    private http: Http;

    constructor(props) {
        super(props);
        this.state = {
            listWidth: 300,
            listHeight: 300,
            showSearchBar: false,
            filters: {
                status: PostStatus.ONLINE
            }
        };
        this.listContainerRef = React.createRef<HTMLDivElement>();
        this.filter = this.filter.bind(this);
        this.http = new Http();
        this.moveToTrash = this.moveToTrash.bind(this);
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

    filter(condition: ArticleManagementPageStates["filters"]) {
        Object.assign(this.state.filters, condition);
        this.setState(this.state);
        // this.refetchListData();
    }
    
    moveToTrash(article: Article) {
        const params = Object.assign({}, article);
        params.status = PostStatus.TRASHED;
        this.http.put<any, any>(`${SERVER_API_URL}/api/articles/${article.id}`, params, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).subscribe(() => {
            this.refetchListData();
        }, () => {
            alert('error');
        });
    }

    delete(article: Article) {
        this.props.modal.open({
            closeModal: [true, false],
            render: ({modalInstance}) => {
                return (
                    <SweetAlert modalInstance={modalInstance} 
                        icon="warning"
                        title="Move to trash!" 
                        text="Are you sure to move this article to trash?"
                        dangerMode={true}
                        buttons={{
                            cancel: true,
                            confirm: true
                        }}></SweetAlert>
                    // <Dialog modalInstance={modalInstance} 
                    //     title="asdasdasdasd"
                    //     footer={[{
                    //         text: 'Close',
                    //         type: DialogButtonType.CANCEL
                    //     }, {
                    //         text: 'custom submit',
                    //         type: DialogButtonType.CONFIRM
                    //     }]}>
                    //     body
                    // </Dialog>
                )
            }
        }).result.pipe(flatMap(() => {
            const params = Object.assign({}, article);
            params.status = PostStatus.TRASHED;
            return this.http.delete(`${SERVER_API_URL}/api/articles/${article.id}`).pipe(catchError((error) => {
                return Observable.of({
                    error
                });
            })).pipe(delay(2000));
        })).pipe(flatMap(({modalInstance, payload, value}) => {
            if(payload) {
                switch (payload.source) {
                    case 'confirm':
                        if(!value.error) {
                            this.refetchListData();
                        }
                        modalInstance.open({
                            render({modalInstance}) {
                                return <SweetAlert 
                                    modalInstance={modalInstance}
                                    icon={value.error ? 'error': 'success'}
                                    title={value.error ? 'Error' : 'Deleted'}
                                    text={value.error ? value.error.message || 'Unknown error!' : 'Already moved to trash.'}
                                    buttons={[false, true]}></SweetAlert>
                            }
                        });
                        break;
                    default:;
                }
            }
            return Observable.of();
        })).subscribe();
    }

    componentDidUpdate() {
        this.refetchListData();
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
                        <div className={classNames(["card-header", {'show-search-bar': this.state.showSearchBar}])}>
                            <ReactCSSTransitionGroup
                                transitionName="accordion-dropdown"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}
                                component="form"
                                className="search-bar">
                                {this.state.showSearchBar ? (
                                    <div className="input-group">
                                        <input type="text" autoFocus={true} className="form-control" placeholder="Search..." />
                                        <div className="input-group-append" onClick={() => this.setState({showSearchBar: false})}>
                                            <span className="input-group-text ti-close"></span>
                                        </div>
                                    </div>
                                ) : null}
                            </ReactCSSTransitionGroup>
                            <div className="btn-group pull-left" role="group">
                                <a href="javascript:void(0)" className="search-btn btn btn-danger" onClick={() => this.setState({showSearchBar: true})}>
                                    <i className="ti-search"></i>
                                </a>
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
                                <li>
                                    <a href="javascript: void(0)">
                                        <i className="ti-angle-down"></i>
                                    </a>
                                </li>
                            </ul>
                            <div className="text-center">
                                <div className="btn-group" role="group">
                                    <a href="javascript:void(0)" 
                                        className={classNames(['btn btn-primary btn-outline-primary', {active: this.state.filters.status === PostStatus.ONLINE}])}
                                        onClick={() => this.filter({status: PostStatus.ONLINE})}>
                                        Published
                                    </a>
                                    <a href="javascript:void(0)" 
                                        className={classNames(['btn btn-primary btn-outline-primary', {active: this.state.filters.status === PostStatus.OFFLINE}])}
                                        onClick={() => this.filter({status: PostStatus.OFFLINE})}>
                                        Drafts
                                    </a>
                                    <a href="javascript:void(0)" 
                                        className={classNames(['btn btn-primary btn-outline-primary', {active: this.state.filters.status === PostStatus.TRASHED}])}
                                        onClick={() => this.filter({status: PostStatus.TRASHED})}>
                                        Trashed
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="article-list" ref={this.listContainerRef} style={{height: '100%'}}>
                                <Query query={gql`
                                    query articlesByStatus($status: ArticleStatus, $pageable: Pageable) {
                                        articles(status: $status, pageable: $pageable) {
                                            content {
                                                ... on Article {
                                                    id,
                                                    title,
                                                    status,
                                                    author {
                                                        id
                                                        login
                                                    },
                                                    publishDate
                                                }
                                            },
                                            totalPages,
                                            totalElements,
                                            size,
                                            numberOfElements,
                                            first,
                                            last
                                        }
                                    }
                                `} variables={{
                                    status: this.state.filters.status,
                                    pageable: {
                                        page: 0,
                                        size: 10
                                    }
                                }}>
                                    {({loading, error, data, refetch}) => {
                                        if(loading) return <p>Loading...</p>;
                                        if(error) return <p>{error.message}</p>;

                                        const articles = data.articles.content || [];
                                        this.refetchListData = refetch;
                                        
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
                                                <div className={classNames(['article-list-item'])}
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
                                                            <NavLink to={{
                                                                pathname: `/articles/compose/${articles[index].id}`,
                                                                state: {
                                                                    refresh: true
                                                                }
                                                            }}>
                                                                <i className="action-icon icofont icofont-edit-alt"></i>
                                                                Edit
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <a href="javascript: void(0)">
                                                                <i className="action-icon icofont icofont-eye-alt"></i>
                                                                View
                                                            </a>
                                                        </li>
                                                        {
                                                            this.state.filters.status === PostStatus.TRASHED ? 
                                                            <li className="move-to-trash">
                                                                <a href="javascript: void(0)" onClick={() => this.delete(articles[index])}>
                                                                    <i className="action-icon icofont icofont-trash"></i>
                                                                    Delete
                                                                </a>
                                                            </li> : 
                                                            <li className="move-to-trash">
                                                                <a href="javascript: void(0)" onClick={() => this.moveToTrash(articles[index])}>
                                                                    <i className="action-icon icofont icofont-garbage"></i>
                                                                    Trash
                                                                </a>
                                                            </li>
                                                        }
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
                                                rowHeight={80}
                                                rowRenderer={rowRenderer.bind(this)}>
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

export default compose(
    withModal,
    connect<{}, {}, {}, ArticleManagementPageStates>(
        mapStateToProps
    )
)(ArticleManagementPage);;