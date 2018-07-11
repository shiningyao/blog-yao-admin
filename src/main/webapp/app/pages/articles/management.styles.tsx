import styled from "styled-components";
import { PageWrapper, PageHeader } from "@/pages/styles";

export const ManagementPageWrapper = styled(PageWrapper)`
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .article-list-item {
        border-bottom: 1px solid rgba(178,186,194,.15);
        padding: 1.167rem 2rem;
        display: flex;
        align-items: center;
        .article-summary {
            flex: 1 1 0%;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
            h4 {
                cursor: pointer;
            }
            p {
                .category-badge {
                    margin-right: 10px;
                    cursor: pointer;
                }
                .article-meta {
                    &:last-child {
                        &:after {
                            content: '';
                        }
                    }
                    &:after {
                        content: '·';
                        margin: 0 5px;
                    }
                }
            }
            h4, p {
                margin: 0;
            }
        }

        .article-thumb {
            max-width: 100px;
        }
    }

    ul.category-list {
        list-style: none;
        padding: 0;
        margin: 0;
        & > li {
            display: inline-block;
            margin: 0 5px;
            & > a {
                display: inline-block;
                font-weight: 400;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                text-decoration: none;
                color: #919aa3;
                &.active {
                    color: #4680ff;
                }
            }
        }
    }

    .card-header {
        border-bottom: 1px solid rgba(178,186,194,.15);
    }

    .card-body {
        padding: 0;
    }
`;

export const ManagementPageHeader = styled(PageHeader)`
    min-height: 114px;
`;

export default {
    ManagementPageWrapper,
    ManagementPageHeader
};