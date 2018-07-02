import * as React from 'react';
import { Component } from "react";
import { List } from 'react-virtualized';
import { PageHeader, PageBody, PageWrapper } from '@/pages/styles';
import range = require('lodash/range');

const list = range(0, 10);

function rowRenderer({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    return (
        <div
          key={key}
          style={style}
        >
          {list[index]}
        </div>
    );
}

export class ArticleManagementPage extends Component<any, any> {

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
        const resetWidth = () => {
            const width = this.listContainerRef.current.clientWidth;
            this.setState({
                listWidth: width
            });
        };
        resetWidth();
        window.addEventListener('resize', function() {
            resetWidth();
        });
    }

    render() {
        return (
            <PageWrapper>
                <PageHeader className="card">
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
                        <div ref={this.listContainerRef}>
                            <List width={this.state.listWidth}
                                height={this.state.listHeight}
                                rowCount={this.state.list.length}
                                rowHeight={20}
                                rowRenderer={rowRenderer}>
                            </List>
                        </div>
                        </div>
                    </div>
                </PageBody>
            </PageWrapper>
        );
    }

}