import styled from "styled-components";

/**
 * Container
 */
export const SkillsContainer = styled.div`
    /* border: 1px solid green; */
    background-color: ${props => props.theme.bg1};


    display: flex;
    justify-content: left;
    align-items: center;
    /* padding: 30px 30px; */
    height: 1200px;
    position: relative;
    top: -220px;
    padding-top: 220px;
    z-index: 5;

    @media screen and (max-width: 700px){
        height: 300px;
        padding-top: 50px;
    }
`

export const SkillsBackground = styled.div`
    border: 1px solid red;

    background-color: ${props => props.theme.bg1};
    position: absolute;
    top: 220px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 5;
`

export const BannerContainer = styled.div`
    /* border: 3px solid pink; */
    position: absolute;
    transform: skewY(11deg);
    top: 220px;
    /* margin: 20px 20px; */
    width: 100%;
    height: 50px;
    z-index: 6;
`


export const BannerText = styled.h1`
    color: ${props => props.theme.t3};
    text-align: center;
    font-size: 65px;

    @media screen and (max-width: 700px){
        font-size: 73px;
        width: 80vw;
    }

    @media screen and (max-width: 500px){
        font-size: 48px;
        width: 80vw;
    }
`
