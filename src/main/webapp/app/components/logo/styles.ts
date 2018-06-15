import styled from 'styled-components';

export const Wrapper = styled.div`
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
    background-image: url(${require('../../../content/images/logo_bg.png')});
    background-size: cover;
`;

export default {
    Wrapper
};