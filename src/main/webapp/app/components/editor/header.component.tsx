import * as React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { HeaderWrapper } from '@/components/editor/styles';

interface HeaderEditorProps {
    value?: string,
    onChange?: Function,
    [key: string]: any
}

interface HeaderEditorStates {
    value?: string,
    focused: boolean
}

class HeaderEditor extends Component<HeaderEditorProps, HeaderEditorStates> {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            focused: false
        };
    }

    componentDidMount () {
        
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
                    onBlur={() => this.setState({focused: false})}
                    contentEditable={true} spellCheck={false}
                    suppressContentEditableWarning={true}
                    placeholder="Enter article title here.">
                    {this.state.value}
                </h2>
                <ul className="entry-meta">
                    <li className="publish-date">
                        POSTED ON <time className="entry-date">JAN, 2015</time>
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
        userInfo: state.userInfo
    };
}

export default connect<any, {}, HeaderEditorProps, {}>(
    mapStateToProps
)(HeaderEditor);