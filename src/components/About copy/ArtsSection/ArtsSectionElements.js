import styled from "styled-components";

/**
 * Container
 */
export const ArtsContainer = styled.div`
    /* border: 1px solid green; */
    background-color: ${props => props.theme.bg};


    display: flex;
    justify-content: left;
    align-items: center;
    /* padding: 30px 30px; */
    height: 1200px;
    position: relative;
    /* top: -220px; */
    /* padding-top: 220px; */
    z-index: 10;

    @media screen and (max-width: 700px){
        height: 300px;
        padding-top: 50px;
    }
`

export const ArtsBackground = styled.div`
    border: 1px solid red;

    background-color: ${props => props.theme.bg};
    position: absolute;
    /* top: 220px; */
    right: 0;
    top: -5%;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 105%;
    overflow: hidden;
    z-index: 14;
`

export const BannerContainer = styled.div`
    box-shadow: 0px -12px 10px 0px #000;
    /* border: 3px solid yellow; */
    background-color: ${props => props.theme.bg};
    position: absolute;
    transform: skewY(-11deg);
    top: -270px;
    /* margin: 20px 20px; */
    width: 100%;
    height: 500px;
    z-index: 11;
`


export const BannerText = styled.h1`
    color: ${props => props.theme.t1};
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
