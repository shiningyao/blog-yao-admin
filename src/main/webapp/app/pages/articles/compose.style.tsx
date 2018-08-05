import { Navbar } from '@/components/topbar/styles';
import styled from "styled-components";
import { PageWrapper } from "@/pages/styles";

export const Wrapper = styled.div`
    .main-container {
        margin-top: 0;
        height: calc(100vh - 60px);
        overflow: hidden;
    }
`;

export const ComposePageWrapper = styled(PageWrapper)`
    .card-body {
        font-size: 16px;
        font-family: 'Roboto Slab',serif;
        padding-left: 60px;
        padding-right: 60px;
    }
`;

export const ComposePageNavbar = styled(Navbar)`
    position: relative;
`;

export const Toolbar = styled.div`
    height: 60px;
    line-height: 60px;

    .btn {
        margin-right: 15px;
        min-width: 120px;
        svg {
            vertical-align: middle;
            fill: inherit;
            transition: all 200ms ease-in-out;
        }
    }

    .btn.publish-button {
        background-color: #00aadc;
        border-color: #008ab3;
        color: #FFFFFF;
        border-width: 1px 1px 2px;
    }

    .btn.preview-button {
        background-color: #FFFFFF;
        color: #2e4453;
        border-color: #c8d7e1;
        border-width: 1px 1px 2px;
    }

    .btn.sidebar-toggle {
        min-width: auto;
        fill: #537994;
        &:hover {
            fill: #2e4453;
            background-color: #f3f6f8;
        }

        &.active {
            background-color: #2e4453;
            fill: #FFFFFF;
            svg {
                transform: rotate(45deg);
            }
        }
    }
`;

export const ComposePageSidebar = styled.aside`
    float: right;
    position: relative;
    z-index: 1026;
    background-color: #e9eff3;
    height: 100%;
    width: 272px;
    box-shadow: 0 0 11px rgba(0,0,0,.13);
    transition: transform 150ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &.collapsed {
        transform: translateX(100%);
        margin-right: -272px;
    }
`;

export default {
    Toolbar,
    ComposePageWrapper,
    ComposePageNavbar,
    Wrapper,
    ComposePageSidebar
};