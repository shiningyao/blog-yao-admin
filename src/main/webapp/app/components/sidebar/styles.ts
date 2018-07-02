import styled, { css, InterpolationValue } from "styled-components";

const colors = [
    '#4680ff',
    '#fc6180',
    '#93be52',
    '#ffb64d',
    '#ab7967',
    '#39adb5',
    '#7c4dff',
    '#ff5370',
    '#4680ff',
    '#fc6180',
    '#93be52',
    '#ffb64d',
    '#ab7967',
    '#39adb5',
    '#7c4dff',
    '#ff5370'
];

export const Wrapper = styled.div`
    position: fixed;
    float: left;
    left: 0;
    top: 80px;
    bottom: 0;
    width: 270px;
    /* height: calc(100vh - 80px); */
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

    .main-menu-header {
        padding: 30px 20px 15px;
        -webkit-box-align: center;
        -moz-box-align: center;
        display: flex;
        align-items: center;
        & > img {
            width: 40px;
            border-radius: 5px;
        }

        & > .user-details {
            margin: 0 15px;
            & > span {
                color: #000;
                margin-bottom: 5px;
                font-weight: 600;
                display: block;
                font-size: 14px;
                text-transform: capitalize;
            }

            & > #more-details {
                color: #000;
                font-size: 12px;
                cursor: pointer;
                font-weight: 400;
                i {
                    font-size: 10px;
                    margin-left: 10px;
                }
            }
        }
    }

    .search-box-wrapper {
        padding: 20px 20px 5px;
        input[type=text] {
            display: block;
            width: 100%;
            border-radius: 4px;
            padding: 6px 22px 6px 10px;
            border: 1px solid #ddd;
            box-shadow: none;
            outline: none;
            color: #666;
            &::-webkit-input-placeholder {
                color: #ccc;
            }
        }

        .search-icon {
            color: #ccc;
            cursor: pointer;
            position: absolute;
            right: 25px;
            margin-top: -33px;
            padding: 6px;
        }
    }

    @media only screen and (max-width: 993px) {
        display: none;
        & + .main-content {
            margin-left: 0;
        }
    }
`;

const menuIconColors = (size: number = 16) => {
    let styles: InterpolationValue[] = [];
    for(let i = 0;i < size;i++) {
        const index = i % size;
        const color = colors[index];
        const style = css`
            & > li:nth-child(${i + 1}) > a > .menu-icon > i {
                color: ${color};
            }
        `;
        styles.push(...style);
    }
    return styles;
} 

export const NavMenu = styled.div`

    user-select: none;

    & > ul {
        margin: 0;
        padding: 0;
        display: block;

        & > li {

            &.hasMenus {
                & > a {
                    &:after {
                        content: "\\E649";
                        font-family: 'themify';
                        position: absolute;
                        right: 10px;
                        font-size: 10px;
                        top: 50%;
                        transform: translateY(-50%) rotate(0);
                        transition: transform .1s ease-out;
                        transition-delay: .3s;
                    }
                }
                &.open {
                    & > a:after {
                        transform: translateY(-50%) rotate(90deg);
                        transition-duration: .1s;
                        transition-timing-function: ease-in-out;
                        transition-delay: 0s;
                    }
                }
            }

            & > a {
                padding: 10px 20px;
                &.active {
                    font-weight: bold;
                }
                .menu-badge {
                    top: 18px;
                    right: 30px;
                }
            }
        }
    }

    ul {
        list-style: none;
        position: relative;
        
        ${menuIconColors(24)}

        & > li {
            display: block;
            position: relative;
            > a {
                display: block;
                color: #000;
                text-decoration: none;
                position: relative;
                
                .menu-badge {
                    position: absolute;
                    text-align: center;
                    padding: 1px 7px;
                    vertical-align: middle;
                    white-space: nowrap;
                }

            }
        }

        .menu-icon {
            margin-right: 10px;
            font-size: 15px;
            padding: 4px;
            color: #ffffff;
            border-radius: 4px;
            width: 30px;
            display: inline-block;
            height: 30px;
            text-align: center;
        }
    }

    .nav-category {
        color: #8c8c8c;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 1px;
        padding: 20px 20px 10px;
        width: 100%;
        text-transform: capitalize;
        border-bottom: 2px solid transparent;
    }
`;

export const NavSubMenu = styled.ul`
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;

    & > li {
        & > a {
            padding: 8.7px 10px;
        }
    }

    li {
        &.hasMenus {
            & > a {
                .menu-text:before {
                    visibility: visible;
                    transform: rotate(0);
                    transition: transform .1s ease-out;
                    transition-delay: .3s;
                }

            }
            &.open {
                & > a {
                    .menu-text:before {
                        transform: rotate(90deg);
                        transition-duration: .1s;
                        transition-timing-function: ease-in-out;
                        transition-delay: 0s;
                    }
                }
            }
        }
        & > a {
            .menu-icon {
                display: none;
            }
            
            &.active {
                font-weight: bold;
                color: #4680ff;
            }

            .menu-text {
                &:before {
                    content: "\\E649";
                    font-family: 'themify';
                    margin-right: 10px;
                    font-size: 8px;
                    display: inline-block;
                    visibility: hidden;
                }
            }

            & > .menu-badge {
                top: 10px;
                right: 2px;
            }
        }
    }
`;

export default {
    Wrapper,
    NavMenu,
    NavSubMenu
};