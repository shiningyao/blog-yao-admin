import styled from 'styled-components';

export const LoginWrapper = styled.section`
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: url(${require('#/images/login-bg.jpg')}) no-repeat center center fixed;
    .login-card {
        width: 450px;
        margin: 0 auto;
        padding: 1.25em;
    }
`;

export const LoginForm = styled.form`
    display: block;
    .auth-box {
        margin: 20px 0 0 0;
        background-color: #FFFFFF;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 18px -2px black;
        & > .row {
            margin-bottom: 20px;
        }
        & > .input-group {
            margin-bottom: 1.25em;
        }
    }

    h3 {
        color: #666666;
        font-size: 24px;
        font-weight: 600;
        margin-top: 20px;
    }

`;

export default {
    LoginWrapper,
    LoginForm
};