import styled from "styled-components";

/**
 * Container
 */
export const HeroContainer = styled.div`
    /* border: 1px solid green; */

    /* background: ${props => props.theme.bg}; */
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 30px 30px;
    height: 400px;
    position: relative;
    z-index: 1;

    @media screen and (max-width: 700px){
        height: 300px;
        padding-top: 50px;
    }
`


/**
 * Content
 */
export const HeroBackground = styled.div`
    background: ${props => props.theme.bg};
    transform: skewY(-11deg);
    position: absolute;
    top: -10%;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110%;
    overflow: hidden;
`


export const HeroContent = styled.div`
    z-index: 3; 
    max-width: 1200px;
    position: absolute;
    /* padding: 8px 24px; */
    left: 10%;
    display: flex;
    flex-direction: comumn;
    align-items: center;
`

/**
 * Text
 */
export const HeroH1 = styled.h1`
    color: ${props => props.theme.t1};
    text-align: left;
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
