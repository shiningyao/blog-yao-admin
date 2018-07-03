import styled from "styled-components";
import { PageWrapper, PageHeader } from "@/pages/styles";

export const ManagementPageWrapper = styled(PageWrapper)`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .article-list {
        margin: 0 -1.25rem;
    }

    .article-list-item {
        border-bottom: 1px solid rgba(178,186,194,.15);
        padding: 1.167rem 2rem;
    }
`;

export const ManagementPageHeader = styled(PageHeader)`
    min-height: 114px;
`;

export default {
    ManagementPageWrapper,
    ManagementPageHeader
};