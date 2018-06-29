import styled from "styled-components";

export const Wrapper = styled.div`

    font-size: 16px;
    font-family: 'Roboto Slab',serif;

    .ck-content {
        margin-bottom: 1rem;
        p {
            margin: 0 0 1.23em;
        }
        blockquote {
            padding: 20px 30px;
        }
    }

    &.header-editor .ck-content {
        min-height: 50px;
    }
    &.body-editor {

        .ck-content {
            min-height: 300px;
            font-weight: 300;
        }

        .ck.ck-editor__editable_inline {
            padding: 0 2.5em 0;
        }
    }
    .ck.ck-editor__editable_inline {
        border: 1px solid rgba(0,0,0,.15);
    }
`;

export default {
    Wrapper
}