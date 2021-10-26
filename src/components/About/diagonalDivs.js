import styled from "styled-components";
import { motion } from "framer-motion";
import {Link as LinkS} from 'react-scroll'

export const ScrollLink = styled(LinkS)`
    /* color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem; */
    position: absolute;
    /* margin: auto auto; */
    height: 100%;
    width: 100%;
    cursor: pointer;
    /* border: 1px solid pink; */

    /* &.active {
        border-bottom: 3px solid #01bf71;
    } */
`

export const CSSVariables = styled.div`
    --width: 100vw;
    --height: 200px;
    --full-width: 100vw;
    
    @media (min-width: 42em) {
        --width: 42rem;
    }
    
    --angle: -11deg;
    /*-----------------
    Magic Number Alert:
    
    the 0.09719 is calculated by this formula:
    tan(11°) / 2
    11° is the current skewY value.
    ------------------*/
    --padded-height: calc(var(--skew-padding) + var(--height));
    --magic-number: 0.09719;
    --skew-padding: calc(var(--width) * var(--magic-number));
    --clip-padding: calc(var(--full-width) * var(--magic-number));

    --text: ${props => props.theme.t1};
    --text2: ${props => props.theme.t2};
    --text3: ${props => props.theme.t3};
    --text4: ${props => props.theme.t4};
    --background: ${props => props.theme.bg};
    --foreground: ${props => props.theme.fg};   
    --shadow: ${props => props.theme.shadow};   
    --highlight: ${props => props.theme.highlight};
`
export const BigOlDiv = styled.div`
    /* border: 2px dashed blue; */
    /* background-color: red; */
    position: relative;
    height: 300px;
    z-index: 100;
`

export const DiagonalDiv = styled(motion.div)`
    position: relative;
    padding: var(--skew-padding) 0;
    margin-top: -1px;
    /* z-index: ${({above}) => (above? '20' : '1')}; */
    z-index: ${({zPlane}) => zPlane + 1};
    /* border: 2px dashed purple; */


    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        --skewValue: ${({skewRight}) => (skewRight? 'calc(var(--angle) * -1)' : 'var(--angle)')};
        transform: skewY(var(--skewValue));
        transform-origin: 50% 0;
        outline: 1px solid transparent;
        backface-visibility: hidden;
        /* border: 2px dashed green; */
        background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
        box-shadow: ${({hasShadow}) => (hasShadow ? '0px -3px 15px 0px #000' : 'none')};
    }
`

export const FinalDiv = styled.div`
    position: relative;
    padding: var(--skew-padding) 0;
    margin-top: -1px;
    /* z-index: ${({above}) => (above? '20' : '1')}; */
    z-index: ${({zPlane}) => zPlane + 1};

    /* border: 2px dashed purple; */


    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        --skewValue: ${({skewRight}) => (skewRight? 'calc(var(--angle) * -1)' : 'var(--angle)')};
        transform: skewY(var(--skewValue));
        transform-origin: 50% 0;
        outline: 1px solid transparent;
        backface-visibility: hidden;
        /* border: 2px dashed green; */
        background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
        box-shadow: ${({hasShadow}) => (hasShadow ? '0px 12px 10px 0px var(--shadow) inset' : 'none')};
        /* z-index: 10; */
        /* z-index: ${({zPlane}) => zPlane}; */

    }
`

export const Content = styled.div`
    max-width: var(--width);
    margin: 0 auto;
    padding: 1.5em;
    position: relative;
    /* border: 2px dashed pink; */
`

export const Boxes = styled.div`
    display: grid;
    grid-template-columns: repeat(${({boxCount}) => boxCount}, 1fr);
    grid-gap: 3%;
    /* margin: 2em 0; */
    margin-top: -100px;
    margin-bottom: 4em;
    /* border: 1px solid yellow;  */

    @media screen and (max-width: 700px){
        grid-template-columns: repeat(${({boxCount}) => boxCount/2}, 1fr);;
    }
`

export const FourBoxes = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3%;
    /* margin: 2em 0; */
    margin-top: 0px;
    margin-bottom: 4em;
    /* border: 1px solid yellow;  */
    
`

export const TwoBoxes = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3%;
    margin-top: 0px;
    margin-bottom: 4em;
    /* border: 1px solid yellow;  */
`
export const EightBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    /* border: 1px solid red; */
    /* background: red; */
    --translation: 0;
    &:nth-child(1) { --translation: calc(var(--skew-padding) * 1.75)}
    &:nth-child(2) { --translation: calc(var(--skew-padding) * 1.5)}
    &:nth-child(3) { --translation: calc(var(--skew-padding) * 1.25)}
    &:nth-child(4) { --translation: calc(var(--skew-padding) * 1)} 
    &:nth-child(5) { --translation: calc(var(--skew-padding) * 0.75)}
    &:nth-child(6) { --translation: calc(var(--skew-padding) * 0.5)}
    &:nth-child(7) { --translation: calc(var(--skew-padding) * 0.25)}
    &:nth-child(8) { --translation: calc(var(--skew-padding) * 0)} 
    transform: translateY( var(--translation) ); 

    @media screen and (max-width: 700px){
        &:nth-child(1) {margin-top: 15px}
        &:nth-child(2) {margin-top: 15px}
        &:nth-child(3) {margin-top: 15px}
        &:nth-child(4) {margin-top: 15px}
        &:nth-child(5) {margin-top: 70px}
        &:nth-child(6) {margin-top: 70px}
        &:nth-child(7) {margin-top: 70px}
        &:nth-child(8) {margin-top: 70px} 
       
    }
`
export const SixBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    /* border: 1px solid red; */
    /* background: red; */
    --translation: 0;
    &:nth-child(1) { --translation: calc(var(--skew-padding) * 2)}
    &:nth-child(2) { --translation: calc(var(--skew-padding) * 1.66)}
    &:nth-child(3) { --translation: calc(var(--skew-padding) * 1.33)}
    &:nth-child(4) { --translation: calc(var(--skew-padding) * 1)} 
    &:nth-child(5) { --translation: calc(var(--skew-padding) * 0.66)}
    &:nth-child(6) { --translation: calc(var(--skew-padding) * 0.33)}
    transform: translateY( var(--translation) ); 

    @media screen and (max-width: 700px){
        &:nth-child(1) {margin-top: 15px}
        &:nth-child(2) {margin-top: 15px}
        &:nth-child(3) {margin-top: 15px}
        &:nth-child(4) {margin-top: 70px}
        &:nth-child(5) {margin-top: 70px}
        &:nth-child(6) {margin-top: 70px}  
    }
`
export const FourBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    /* border: 1px solid red; */
    /* background: red; */
    --translation: 0;
    &:nth-child(1) { --translation: calc(var(--skew-padding) * 1.5)}
    &:nth-child(2) { --translation: calc(var(--skew-padding) * 1)}
    &:nth-child(3) { --translation: calc(var(--skew-padding) * 0.5)}
    &:nth-child(4) { --translation: calc(var(--skew-padding) * 0)} 
    transform: translateY( var(--translation) ); 

    @media screen and (max-width: 700px){
        justify-self: center;
        width: 80%;
        &:nth-child(3) {margin-top: 50px}
        &:nth-child(4) {margin-top: 50px} 
    }
`
export const TwoBox = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    /* border: 1px solid #fff; */
    /* background: red; */
    --translation: 0;
    &:nth-child(1) { --translation: calc(var(--skew-padding) * 2)}
    &:nth-child(2) { --translation: calc(var(--skew-padding)) }
    transform: translateY( var(--translation) ); 

    @media screen and (max-width: 700px){
        justify-self: center;
        margin-bottom: 40px;
    }
`

export const TopLine = styled.p`
    color: ${({lightcolor}) => (lightcolor ? 'var(--text4)' : 'var(--text2)')};
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 16px;
`

export const PageHeading = styled.h1`
    /* margin-bottom: 5px; */
    font-size: 68px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text3)' : 'var(--text1)')};
    margin-bottom: 70px;

    @media screen and (max-width: 480px){
        font-size: 42px;
    }
`

export const Heading = styled.h1`
    /* border: 1px solid #fff; */
    margin-bottom: 5px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text3)' : 'var(--text1)')};
    backface-visibility:hidden;
    /* transform:skewY(var(--angle)); */
    /* transform: translateY(calc(var(--skew-padding) * -1));  */

    @media screen and (max-width: 480px){
        /* font-size: 32px; */
    }
`

export const HeaderSkew = styled.div`
    transform:rotate(var(--angle)) translateY(calc(var(--skew-padding) * -1));
`
export const Subtitle = styled.p`
    max-width: 440px;
    /* margin-bottom: 0px; */
    font-size: 18px;
    line-height: 24px;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text4)' : 'var(--text2)')};
`

export const WiggleBox = styled(motion.div)`
    color: var(--text1);
    /* border: 1px solid pink; */
    justify-self: start;
    /* cursor: pointer; */
    text-decoration: none;
    font-size: 100px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`

export const StyledLabel = styled.label`
    color: var(--highlight);
    text-transform: uppercase;
    font-size: 16px;
    /* transform: skewY(var(--angle)); */
    text-align: center;
`

export const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
`