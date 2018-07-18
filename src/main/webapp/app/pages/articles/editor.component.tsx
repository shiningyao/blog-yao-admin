import * as React from "react";
import { Component } from "react";
import HeaderEditor from '@/components/editor/header.component';
import { ArticleEditor } from "@/components/editor/editor.component";
import { PageHeader, PageBody } from "@/pages/styles";
import { EditorPageWrapper } from "@/pages/articles/editor.styles";
import { WidgetEditor, WidgetEditorType } from "@/components/editor/widget.component";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class ArticleEditorPage extends Component<any, any> {

    constructor(props) {
        super(props);
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
                        {/* <div className="card-header">
                            Article Editor
                        </div> */}
                        <div className="card-body">
                            <HeaderEditor value="STANDARD POST FORMAT"></HeaderEditor>
                            <WidgetEditor type={WidgetEditorType.Image}></WidgetEditor>
                            <ArticleEditor className="body-editor">
                                <p>Bacon ipsum dolor amet leberkas ham hock cupim alcatra pancetta biltong, corned beef landjaeger swine rump shank meatloaf jowl frankfurter cow. Short ribs picanha chicken meatball pig tongue. Pig rump tri-tip ribeye, venison alcatra filet mignon drumstick shoulder swine tongue. Cow hamburger shoulder, brisket jowl bacon pork chop pig salami. Ball tip pork loin short loin brisket shank cow chuck ham boudin pork drumstick pig jowl pork chop doner.</p>
                                <blockquote>
                                    <p>
                                    Cow hamburger shoulder, brisket jowl bacon pork chop pig salami. Ball tip pork loin short loin brisket shank cow chuck ham boudin pork drumstick pig jowl pork chop doner. 
                                    </p>
                                </blockquote>
                                <p> Ham capicola bacon ribeye meatball chuck tail doner bresaola kevin drumstick shankle short loin. Short loin ball tip leberkas flank, ground round andouille prosciutto t-bone cow doner landjaeger hamburger shankle beef ribs. Frank furter capicola short ribs, shoulder chuck shankle </p>
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
)(ArticleEditorPage);