import styled from "styled-components";
import { motion } from "framer-motion";
import { Link as LinkS } from "react-scroll";

export const ScrollLink = styled(LinkS)`
    position: absolute;
    height: 100%;
    width: 100%;
    cursor: pointer;

    /* border: 1px solid pink; */
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


export const DiagonalDiv = styled(motion.div)`
    position: relative;
    padding: var(--skew-padding) 0;
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
        background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
        box-shadow: ${({hasShadow}) => (hasShadow ? '0px -3px 15px 0px #000' : 'none')};

        /* border: 2px dashed green; */
    }
`
export const FinalDiv = styled(motion.div)`
    position: relative;
    padding: var(--skew-padding) 0;
    z-index: ${({zPlane}) => zPlane + 1};
    --skewValue: ${({skewRight}) => (skewRight? 'calc(var(--angle) * -1)' : 'var(--angle)')};
    
    /* border: 2px dashed purple; */

    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        transform: skewY(var(--skewValue));
        transform-origin: 50% 0;
        outline: 1px solid transparent;
        backface-visibility: hidden;
        background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};

        /* border: 2px dashed green; */
    }

    &:after {
        content: "";
        position:absolute;
        transform: skewY(var(--skewValue));
        width:100%;
        top:-1px;
        z-index:-1;
        box-shadow: 0px -5px 15px 2px #000000;
    }
`

export const DiagonalBreak = styled(motion.div)`
    position: relative;
    --skewValue: ${({skewRight}) => (skewRight? 'calc(var(--angle) * -1)' : 'var(--angle)')};
    transform: skewY(var(--skewValue));
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
    border-radius: 5px;
    margin-bottom: calc(var(--skew-padding) * 1.5);
    z-index: -10;

    @media screen and (max-width: 700px){
        margin-top: 75px;
    }
    @media screen and (max-width: 500px){
        margin-top: 100px;
    }
    
    border: 1px solid transparent;
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
    grid-gap: ${({gridGap}) => (gridGap ? gridGap : '3%')};
    margin-top: -100px;
    margin-bottom: ${({marginBot}) => (marginBot ? marginBot : '4em')};;
    
    @media screen and (max-width: 700px){
        margin-top: -120px;
        grid-template-columns: repeat(${({boxCountMobile}) => boxCountMobile}, 1fr);
    }

    /* border: 1px solid yellow;  */
`

export const EightBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    
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
        &:nth-child(5) {margin-top: 100px}
        &:nth-child(6) {margin-top: 100px}
        &:nth-child(7) {margin-top: 100px}
        &:nth-child(8) {margin-top: 100px} 
    }

    /* border: 1px dashed green; */
`
export const SixBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    
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

    /* border: 1px dashed green; */
`

export const FourBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    
    --translation: 0;
    &:nth-child(1) { --translation: calc(var(--skew-padding) * 1.5)}
    &:nth-child(2) { --translation: calc(var(--skew-padding) * 1)}
    &:nth-child(3) { --translation: calc(var(--skew-padding) * 0.5)}
    &:nth-child(4) { --translation: calc(var(--skew-padding) * 0)} 
    transform: translateY( var(--translation) ); 
    
    @media screen and (max-width: 700px){
        justify-self: center;
        width: 50%;
        &:nth-child(1) {margin-top: -60px;}
        &:nth-child(2) {margin-top: -60px; } 
        &:nth-child(3) {margin-bottom: -50px;}
        &:nth-child(4) {margin-bottom: -50px;} 
    }
    @media screen and (max-width: 600px){
        &:nth-child(1) {margin-top: -20px;}
        &:nth-child(2) {margin-top: -20px;} 
        &:nth-child(3) {margin-bottom: -60px;}
        &:nth-child(4) {margin-bottom: -60px;} 
    }
    @media screen and (max-width: 540px){
        &:nth-child(1) {margin-top: 40px; margin-bottom: 50px;}
        &:nth-child(2) {margin-top: 40px; margin-bottom: 50px;} 
        &:nth-child(3) {margin-bottom: -10px;}
        &:nth-child(4) {margin-bottom: -10px;} 
    }
    @media screen and (max-width: 400px){
        &:nth-child(1) {margin-top: 130px; margin-bottom: 40px;}
        &:nth-child(2) {margin-top: 130px; margin-bottom: 40px;} 
        &:nth-child(3) {margin-bottom: 0px;}
        &:nth-child(4) {margin-bottom: 0px;} 
    }

    /* border: 1px solid red; */
`
export const TwoBox = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: ${({padTop}) => (padTop ? padTop : '100%')};
    display: flex;
    flex-direction: column;
    align-items: center;
    
    --translation: 0;
    &:nth-child(1) { --translation: calc(var(--skew-padding) * 2)}
    &:nth-child(2) { --translation: calc(var(--skew-padding))}
    transform: translateY( var(--translation) ); 
    
    @media screen and (max-width: 700px){
        justify-self: center;
        margin-bottom: 40px;
        &:nth-child(2) { margin-bottom: -30px;}
    }
    
    @media screen and (max-width: 500px){
        margin-top: 20px;
        &:nth-child(2) { margin-bottom: 0px;}
    }
        
    /* border: 1px solid #fff; */
`

export const DetailContainer = styled.div`
    margin-top: ${({topMargin}) => (topMargin ? topMargin : '0px')};
    position: absolute;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: left;
    justify-content: center;

    /* border: 2px solid red; */
`


export const TopLine = styled.p`
    color: ${({lightcolor}) => (lightcolor ? 'var(--text4)' : 'var(--text2)')};
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 16px;

    @media screen and (max-width: 400px){
        margin-bottom: 50px;
    }
`

export const HeadingBox = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    justify-content: left;

    /* border: 2px dashed green; */
`

export const Sepparator = styled.div`
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
    border-radius: 9px;
    margin: auto 10px;
    position: relative;
    height: 50px;
    width: 5px;

    /* border: 2px dashed green; */
`
export const HeadingSideBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: auto 0;
    position: relative;

    /* border: 2px dashed red; */
`



export const PageHeading = styled.h1`
    font-size: 68px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text3)' : 'var(--text1)')};

    @media screen and (max-width: 700px){
        font-size: 42px;
    }

    @media screen and (max-width: 500px){
        font-size: 28px;
    }
    @media screen and (max-width: 400px){
        font-size: 22px;
    }
    @media screen and (max-width: 320px){
        font-size: 18px;
    }
`

export const HeadingSideText = styled.p`
    max-width: 440px;
    font-size: 18px;
    line-height: 24px;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text4)' : 'var(--text2)')};

    @media screen and (max-width: 700px){
        font-size: 16px;
        line-height: 20px;
    }

    @media screen and (max-width: 500px){
        font-size: 14px;
        line-height: 18px;
    }
    @media screen and (max-width: 400px){
        font-size: 12px;
        line-height: 16px;
    }
    @media screen and (max-width: 320px){
        font-size: 10px;
        line-height: 14px;
    }
`

export const Heading = styled.h1`
    margin-bottom: 5px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text3)' : 'var(--text1)')};
    backface-visibility:hidden;
    
    /* border: 1px solid #fff; */
`

export const HeaderSkew = styled.div`
    transform:rotate(var(--angle)) translateY(calc(var(--skew-padding) * -1));
    
    @media screen and (max-width: 700px){
        margin-bottom: 40px;    
    }

`
export const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-right: 20px;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.8px;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text3)' : 'var(--text1)')};

    @media screen and (max-width: 700px){
        font-size: 14px;
        line-height: 20px;    
    }

    @media screen and (max-width: 620px){
        font-size: 13px;
        line-height: 18px;    
    }
    @media screen and (max-width: 450px){
        font-size: 12px;
        line-height: 14px;    
    }
    @media screen and (max-width: 375px){
        font-size: 11px;
        line-height: 13px;    
    }

    /* border: 2px dashed green; */
`


export const DiagonalButton = styled.a`
    --highlight: ${props => props.theme.highlight};
    --foreground: ${props => props.theme.fg};
    --background: ${props => props.theme.bg};
    --text2: ${props => props.theme.t1};
    --text: ${props => props.theme.t3};

    border-radius: 50px;
    background: var(--highlight);
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: ${({fontbig}) => (fontbig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2 ease-in-out;
    margin-top: 50px;
    margin-bottom: -100px;
    &:hover {
        transition: all 0.2 ease-in-out;
        background: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
    }
`