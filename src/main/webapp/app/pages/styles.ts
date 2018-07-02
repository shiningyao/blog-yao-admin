import styled from "styled-components";

export const PageWrapper = styled.div`
    padding: 1.8rem;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const PageHeader = styled.div`
    margin-bottom: 30px;
    background-color: #fff;
    padding: 30px;
    
    & > .row {
        align-items: flex-end;
    }

    .page-header-title {
        display: inline-flex;
        i {
            display: inline-flex;
            float: left;
            width: 50px;
            height: 50px;
            border-radius: 4px;
            -webkit-box-pack: center;
            -moz-box-pack: center;
            justify-content: center;
            font-size: 25px;
            color: #FFFFFF;
            box-shadow: 0 2px 12px -3px rgba(0, 0, 0, 0.5);
            margin-right: 20px;
            -moz-box-align: center;
            -webkit-box-align: center;
            align-items: center;
        }

        h4 {
            margin-bottom: 0;
            font-weight: 600;
            color: #303548;
            font-size: 20px;
            text-transform: capitalize;
        }

        span {
            font-size: 13px;
            color: #919aa3;
            display: inline-block;
            margin-top: 10px;
            text-transform: capitalize;
        }

    }

    .page-header-breadcrumb {
        float: right;
        ul.breadcrumb-title {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .breadcrumb-item {
            float: left;
        }

        a {
            font-size: 14px;
            color: #4a6076;
            text-decoration: none;
        }
    }
`;

export const PageBody = styled.div`
    flex: 1 1 0%;
    & > .card {
        height: 100%;
        .card-body {
            height: 100%;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export default {
    PageWrapper,
    PageHeader,
    PageBody
}