import styled from "styled-components";
import { PageWrapper } from "@/pages/styles";

export const ManagementPageWrapper = styled(PageWrapper)`
    display: flex;
    flex-direction: column;

    .article-list {
        margin: 0 -1.25rem;
    }

    .article-list-item {
        border-bottom: 1px solid rgba(178,186,194,.15);
        padding: 1.167rem 2rem;
    }
`;

export default {
    ManagementPageWrapper
};