import styled from "styled-components";

export const EditorWrapper = styled.div`

    .ck-content {
        margin-bottom: 1rem;
        line-height: 30px;
        font-size: 20px;
        color: #333;

        p {
            margin: 0 0 1.23em;
        }

        blockquote {
            padding: 20px 30px;
            border-left: none;
            & > p {
                &:before {
                    content: "\f10d";
                    font-family: FontAwesome;
                    margin-right: 10px;
                    font-size: 30px;
                }

                &:after {
                    content: "\f10e";
                    font-family: FontAwesome;
                    margin-left: 10px;
                    font-size: 30px;
                }
            }
        }
    }

    &.header-editor .ck-content {
        min-height: 50px;
    }
    &.body-editor {

        &.hidden {
            display: none;
        }
        
        .ck-content {
            min-height: 100px;
            font-weight: 300;
        }

        .ck.ck-editor__editable_inline {
            padding: 0 2.5em 0;
        }
    }
    .ck.ck-editor__editable_inline {
        /* border: 1px solid rgba(0,0,0,.15); */
    }

    &.empty .ck-content:before{
        content: attr(placeholder);
        display: block;
        font-family: 'Roboto Slab',serif;
        font-weight: 300;
        color: #bbbbbb;
    }

    .ck-content:focus:before{
        display: none;
    }
`;

export const HeaderWrapper = styled.header`
    text-align: center;
    /* border: 1px solid rgba(0,0,0,.15); */
    margin-bottom: 40px;
    padding: 1rem 40px;
    border: 1px solid transparent;

    &.focused {
        box-shadow: 2px 2px 3px rgba(0,0,0,.1) inset, 0 0;
        border-color: #47a4f5;
    }

    .category-chooser {

        span {
            border-bottom: 2px solid #000;
            & > a {
                color: #000000;
                text-transform: uppercase;
                font-size: .93em;
                padding-bottom: 5px;
                letter-spacing: 2px;
                font-weight: 700;
                transition: 300ms;
                text-decoration: none;
            }
        }

    }

    .article-title {
        color: #333333;
        outline: none;
        letter-spacing: 2px;
        margin-top: 20px;
        margin-bottom: 10px;
        text-transform: uppercase;
    }

    ul.entry-meta {
        list-style: none;
        margin: 0;
        padding: 0;
        color: #a2a2a2;
        font-size: 13px;
        font-weight: 300;
        text-transform: uppercase;
        display: block;
        font-style: italic;
        letter-spacing: 1px;

        & > li {
            display: inline-block;
            margin-right: 15px;
            box-sizing: border-box;
            line-height: 30px;

            & > a {
                color: #ff7a40;
                &:hover {
                    color: #000;
                }
            }
        }
    }

    a {
        text-decoration: none;
        outline: none;
    }

    [contenteditable=true]:empty:before{
        content: attr(placeholder);
        display: block;
        font-family: 'Roboto Slab',serif;
        font-weight: 300;
        color: #bbbbbb;
    }

    [contenteditable=true]:focus:before{
        display: none;
    }
`;
 
export default {
    EditorWrapper,
    HeaderWrapper
}