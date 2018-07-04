import * as React from 'react';
import { Component } from "react";
import { List } from 'react-virtualized';
import { PageBody, PageWrapper } from '@/pages/styles';
import range = require('lodash/range');
import { ManagementPageWrapper, ManagementPageHeader } from '@/pages/articles/management.styles';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const list = range(0, 10);

function rowRenderer({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    return (
        <div className="article-list-item"
          key={key}
          style={style}
        >
          {list[index]}
        </div>
    );
}

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
                <ManagementPageHeader className="card">
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
                            <div>
                                <NavLink to="/articles/compose" className="btn btn-primary">Compose</NavLink>
                            </div>
                            <div>Article Title</div>
                        </div>
                        <div className="card-body">
                            <div className="article-list" ref={this.listContainerRef} style={{height: '100%'}}>
                                <List width={this.state.listWidth}
                                    height={this.state.listHeight}
                                    rowCount={this.state.list.length}
                                    rowHeight={97}
                                    rowRenderer={rowRenderer}>
                                </List>
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