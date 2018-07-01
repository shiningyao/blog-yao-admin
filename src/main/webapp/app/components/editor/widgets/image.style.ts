import styled from 'styled-components';

export const ImageWidgetWrapper = styled.div`
    position: relative;
    padding: 0 2.5em 0;

    .featured-image {
        margin-bottom: 40px;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.15);
        
        & > a {
            display: block;
            outline: none;
            overflow: hidden;
            position: relative;

            &:hover {
                &:before {
                    background-color: rgba(0, 0, 0, 0.5);
                }

                img {
                    transform: scale(1.03);
                }
            }

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
            }
        }

        img {
            float: left;
            display: block;
            width: 100%;
            height: auto;
            transition: transform 0.35s linear;
        }

        .post-icon {
            position: absolute;
            left: 50%;
            display: inline-block;
            width: 45px;
            height: 45px;
            line-height: 45px;
            bottom: -20px;
            z-index: 999999;
            background: #fff;
            text-align: center;
            margin-left: -22px;
            border-radius: 100%;
            z-index: 2;
            font-size: 20px;
            color: #000;
        }

    }

`;

export default {
    ImageWidgetWrapper
};