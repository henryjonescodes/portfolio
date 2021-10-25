import styled from "styled-components";

/**
 * Container
 */
export const HeroContainer = styled.div`
    /* border: 1px solid green; */

    display: flex;
    justify-content: left;
    align-items: center;
    padding: 30px 30px;
    height: 600px;
    position: relative;
    z-index: 11;

    @media screen and (max-width: 700px){
        height: 300px;
        padding-top: 50px;
    }
`

export const HeroBackground = styled.div`
    /* border: 1px solid red; */
    box-shadow: 0px 12px 10px 0px #000;

    background: ${props => props.theme.bg};
    transform: skewY(11deg);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const HeroContent = styled.div`
    border: 1px solid blue;

    z-index: 12; 
    max-width: 1200px;
    position: absolute;
    /* padding: 8px 24px; */
    right: 10%;
    display: flex;
    flex-direction: comumn;
    align-items: center;
`

/**
 * Text
 */
export const HeroH1 = styled.h1`
    color: ${props => props.theme.t1};
    text-align: center;
    font-size: 85px;
    width: 600px;

    @media screen and (max-width: 700px){
        font-size: 73px;
        width: 80vw;
    }

    @media screen and (max-width: 500px){
        font-size: 48px;
        width: 80vw;
    }
`