import styled from 'styled-components';

export const Navbar = styled.nav`
    position: fixed;
    z-index: 1028;
    width: 100%;
    top: 0;
    left: 0;
    box-shadow: 0 0 11px rgba(0,0,0,.13);

    .navbar-logo {
        background-color: #303549;
        float: left;
        display: flex;
        height: 80px;
        width: 270px;
        padding: 20px;
        position: relative;
    }

    .mobile-menu {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: 50%;
        right: 20px;
        width: 2em;
        height: 2em;
        top: 50%;
        margin-top: -1em;
        text-decoration: none;
    }

    .logo-text {
        flex: 1 1 0%;
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: #FFFFFF;
        text-decoration: none;
        font-weight: 400;
        letter-spacing: 2px;
    }

    .navbar-container {
        width: auto;
    }

    ul.nav-left, ul.nav-right {
        list-style: none;
        padding: 0;
        margin: 0;
        height: 80px;
        line-height: 79px;

        & > li {
            float: left;
            padding: 0 10px;
        }

        a {
            color: #353c4e;
            font-size: 16px;
            text-decoration: none;
            padding: 0 .6rem;
        }
    }

    ul.nav-left {
        float: left;       
    }

    ul.nav-right {
        float: right;
    }

    .mega-menu-top {
        .ti-angle-down {
            margin-left: 10px;
            font-size: 12px;
        }
    }

    .header-notification {

        a > img {
            margin-right: 10px;
            width: 25px;
        }

        .show-notification {
            display: none;
            list-style: none;
            padding: 0;
            margin: 0;
        }

    }

    .user-profile {

        a > img {
            width: 40px;
            margin-right: 10px;
        }

        .img-radius {
            border-radius: 5px;
        }

        span {
            margin-right: 10px;
        }

        .ti-angle-down {
            font-size: 12px;
        }

    }
`;

export default {
    Navbar
};