import styled from 'styled-components';

export const LoginWrapper = styled.section`
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: url(${require('#/images/login-bg.jpg')}) no-repeat center center fixed;
    .login-card {
        width: 450px;
        margin: 0 auto;
    }
`;

export const LoginForm = styled.form`
    display: block;
`;

export default {
    LoginWrapper,
    LoginForm
};