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
                font-size: 1em;
            }
            p {
                font-size: .75em;
                .category-badge {
                    margin-right: 10px;
                    cursor: pointer;
                    padding: 1px 4px;
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
        
        &:hover {
            ul.operations-col {
                visibility: visible;
                opacity: 1;
            }
        }

        ul.operations-col {
            list-style: none;
            margin: 0 20px 0 10px;
            visibility: hidden;
            opacity: 0;
            transition: opacity .5s ease-in;
            & > li {
                display: inline-block;
                margin: 0 15px;
                & > a {
                    color: #999999;
                    text-decoration: none;
                    font-size: 14px;
                    &:hover {
                        color: #478FCA;
                    }
                }

                i {
                    margin-right: 8px;
                }

                &.move-to-trash {
                    & > a {
                        color: rgba(221, 90, 67, .7);
                        &:hover {
                            color: #DD5A43;
                        }
                    }
                }
            }
        }

        .article-thumb {
            max-width: 80px;
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
                padding: 0.375rem;
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
        position: relative;

        .search-btn {
            &:focus {
                box-shadow: none;
            }
        }
        
        &.show-search-bar {
            & > .search-bar {
                visibility: visible;
            }
        }

        .search-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            padding: inherit;
            background-color: #FFFFFF;
            visibility: hidden;
            
            .input-group-text {
                background-color: transparent;
                border-color: transparent;
                color: #999999;
                cursor: pointer;
            }

            .input-group-prepend {
                visibility: hidden;
            }

            input {
                border-color: transparent;
                &:focus {
                    outline: none;
                    box-shadow: none;
                }
            }
        }
    }

    .card-body {
        padding: 0;
    }

    .card-footer {
        border-top: 1px solid rgba(178,186,194,.15);
        background-color: #FFFFFF;
        .pagination {
            margin-bottom: 0;
        }

        .page-link {
            &:focus {
                box-shadow: none;
            }
        }
    }
`;

export const ManagementPageHeader = styled(PageHeader)`
    min-height: 114px;
`;

export default {
    ManagementPageWrapper,
    ManagementPageHeader
};