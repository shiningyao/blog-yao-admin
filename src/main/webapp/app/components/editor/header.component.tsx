import * as React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { HeaderWrapper } from '@/components/editor/styles';

import isFunction = require('lodash/isFunction');
import moment, { defineLocale } from '@/shared/utils/moment/moment';
import {Moment} from 'moment';
import { Article } from '@/domain/article';

interface HeaderEditorProps {
    article?: Article,
    onChange?: Function,
    [key: string]: any
}

interface HeaderEditorStates {
    article?: any,
    focused: boolean,
    postDateFormated: string
}

class HeaderEditor extends Component<HeaderEditorProps, HeaderEditorStates> {
    
    private postDate: Moment

    constructor(props) {
        super(props);
        this.postDate = moment();
        defineLocale(this.props.locale.language);
        this.postDate.locale(this.props.locale.language);
        this.state = {
            article: {},
            focused: false,
            postDateFormated: this.postDate.format('ll')
        };
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(!(prevProps.locale === this.props.locale)) {
            defineLocale(this.props.locale.language);
            this.postDate.locale(this.props.locale.language);
            this.setState({
                postDateFormated: this.postDate.format('ll')
            });
        }
        if(prevProps.article !== this.props.article) {
            this.setState({
                article: this.props.article
            });
        }
    }

    componentDidMount () {
        
    }

    onBlur (event) {
        this.setState({
            focused: false
        });
        const publishDate = this.postDate.toISOString();
        const author = {
            id: this.props.userInfo.id,
            login: this.props.userInfo.login
        }
        const title = event.target.innerText.trim();
        if(title !== '') {
            if(isFunction(this.props.onChange)) {
                this.props.onChange({
                    title,
                    publishDate,
                    author
                });
            }
        }
    }

    render() {
        return (
            <HeaderWrapper className={classNames({focused: this.state.focused})}>
                <div className="category-chooser">
                    <span>
                        <a href="javascript:void(0)">
                            BLOG
                        </a>
                    </span>
                </div>
                <h2 className="article-title" 
                    onFocus={() => this.setState({focused: true})} 
                    onBlur={this.onBlur}
                    contentEditable={true} spellCheck={false}
                    suppressContentEditableWarning={true}
                    placeholder="Enter article title here.">
                    {this.state.article.title}
                </h2>
                <ul className="entry-meta">
                    <li className="publish-date">
                        POSTED ON <time className="entry-date">{this.state.postDateFormated}</time>
                    </li>
                    <li className="author">
                        BY <a href="javascript:void(0)">{this.props.userInfo.login}</a>
                    </li>
                    <li className="comments-link">
                        <a href="javascript:void(0)">0 COMMENTS</a>
                    </li>
                </ul>
            </HeaderWrapper>
        );
    }

}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        locale: state.locale
    };
}

export default connect<any, {}, HeaderEditorProps, {}>(
    mapStateToProps
)(HeaderEditor);