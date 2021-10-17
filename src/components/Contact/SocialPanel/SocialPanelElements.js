import styled from "styled-components";
import { motion } from "framer-motion";

/**
 * Container
 */

//Skews background
export const DiagonalDiv = styled.div`
    /* background: ${props => props.theme.bg1}; */
    background: linear-gradient(169deg, ${props => props.theme.bg1} 0%, #333333 100%);
    transform: skewY(-11deg);
    --height-base: 220px;
    --height: calc(var(--skew-padding) + var(--height-base));
    height: var(--height);
    
    box-shadow: inset 0px 25px 12px -9px ${props => props.theme.shadow};

    @media screen and (max-width: 700px){
        --height-base: 400px;
    }
`

//Corrects alignment for content
export const DiagonalContent = styled.div`
    transform: skewY(11deg);
    max-width: 100uv;
	margin: 0 auto;
    height: 100%;
`

//Grid formatting for icons
export const SocialGrid = styled.div`
    max-width: 100vw; 
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px; 

    
    @media screen and (max-width: 700px){
        grid-template-columns: 1fr 1fr;
    }
`

//Translated container for label/icon
export const SocialContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    /**
    *   Do translation fuckery, thanks:
    *   https://9elements.com/blog/pure-css-diagonal-layouts/
    *   Adjust factor for even padding by # of elements
    */
    --translation: 0;
    &:nth-child(1) { --translation: calc(var(--skew-padding) * 1.5)}
    &:nth-child(2) { --translation: calc(var(--skew-padding) * 1)}
    &:nth-child(3) { --translation: calc(var(--skew-padding) * 0.5)}
    &:nth-child(4) { --translation: calc(var(--skew-padding) * 0)} 
    transform: translateY( var(--translation) );

    @media screen and (max-width: 700px){
        &:nth-child(3) { padding-top: 70px}
        &:nth-child(4) { padding-top: 70px} 
    }
`

/**
 * Content
 */

//Uses framer motion for hover
export const SocialButton = styled(motion.a)`
    color: ${props => props.theme.t3};
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 100px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`
export const SocialLabel = styled.label`
    color: ${props => props.theme.t4};
    font-size: 24px;
    text-align: center;
`

/** 
 * Utils
 */
export const CSSVariables = styled.div`
    --magic-number: 0.09719; /* tan(11°)/2 */
    --content-width: 100vw;
    --skew-padding: calc(var(--content-width) * var(--magic-number));
`