import styled from "styled-components";
// import {Link} from 'react-router-dom';
import { motion } from "framer-motion";

export const DiagonalDiv = styled.div`
    background: var(--color);
    transform: skewY(-11deg);
    --height-base: 220px;
    --height: calc(var(--skew-padding) + var(--height-base));
    height: var(--height);
    box-shadow: inset 0px 25px 12px -9px #000;
    
    @media screen and (max-width: 700px){
        --height-base: 400px;
    }

    // border: 1px solid red;
`

export const DiagonalContent = styled.div`
    transform: skewY(11deg);
    max-width: 100uv;
	margin: 0 auto;
    height: 100%;
    // border: 1px solid green;
`
export const SocialContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    //Do translation fuckery, thanks:
    //https://9elements.com/blog/pure-css-diagonal-layouts/
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
    
    // border: 1px solid yellow;
`
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

    // border: 1px solid purple;
`

export const CSSVariables = styled.div`
    --color: #111;
    --magic-number: 0.09719; /* tan(11°)/2 */
    // --magic-number: 0.08; /* tan(11°)/2 */
	--content-width: 100vw;
	--skew-padding: calc(var(--content-width) * var(--magic-number));
`



export const SocialButton = styled(motion.a)`
    color: #fff;
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
    color: #fff;
    font-size: 24px;
    text-align: center;
`
