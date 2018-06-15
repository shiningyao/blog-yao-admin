import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    float: left;
    left: 0;
    top: 80px;
    width: 270px;
    height: 100%;
    background-color: #FFFFFF;
    z-index: 1027;
    box-shadow: 0 0 11px rgba(0,0,0,.13);
    
    .sidebar-inner {
        position: relative;
        height: 100%;
    }
    
    & + .main-content {
        margin-left: 270px;
    }
`;

export default {
    Wrapper
};