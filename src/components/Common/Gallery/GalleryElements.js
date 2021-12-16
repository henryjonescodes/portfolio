import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
    /* border: 2px solid red; */
    
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 80px;
`
export const GalleryContainer = styled(motion.div)`
    position: relative;
    height: auto;
    width: 90%;
    margin: auto;
    padding: 45px 0;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 2vh;
    grid-auto-flow: dense;
    
    @media screen and (max-width: 1500px){
        display: grid;
        grid-template-columns: auto auto auto;
    }
    @media screen and (max-width: 750px){
        display: grid;
        grid-template-columns: auto auto;
    }
    @media screen and (max-width: 350px){
        display: block;
    }
`
export const ImgContainer = styled(motion.div)`
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0px 2px 2px rgba(0,0,0,0.9);
    &:first-child { 
        grid-column-start: span 2;
        grid-row-start: span 2;
    }
    &:nth-child(2n+3){ 
        grid-column-start: span 2;
        grid-row-start: span 2;
    }
    &:nth-child(4n+5){ 
        grid-column-start: span 2;
        grid-row-start: span 2;
    }
    &:nth-child(6n+7){ 
        grid-row-start: span 1;
        grid-column-start: span 1;
    }
    &:nth-child(8n+9){ 
        grid-column-start: span 1;
        grid-row-start: span 1;
    }

    @media screen and (max-width: 350px){
        display: block;
        width: 100%;
        height: 100%;
        margin: 2% 0;
    }

    &.open{
        position: relative;
        grid-area: image;
    }
    pointer-events: none;
    
`
export const Heading = styled.h1`
    position: relative;
    height: auto;
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    margin: 5% 0 2% 0;
    text-align: center;
    font-size: 2.8em;
    font-weight: 650;
    letter-spacing: 1.5px;
    color: #00f;
    border-left: 5px solid #017bf5;
    border-right: 5px solid #017bf5;
    background: rgba(0,0,0,0.05);

    @media screen and (max-width: 768px){
        font-size: 2em;
        width: 150px;
    }
    @media screen and (max-width: 450px){
        font-size: 1.2em;
        width: 100px;
    }
`
export const Paragraph = styled.p`
    position: relative;
    height: auto;
    width: 100%;
    text-align: center;
    font-size: 1.8em;
    font-weight: 500;
    letter-spacing: 1px;
    color: #00d;

    @media screen and (max-width: 768px){
        font-size: 1.2em;
    }
    @media screen and (max-width: 450px){
        font-size: .8em;
    }
    
`

export const Img = styled(motion.img)`
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.3s ease-in-out;
    pointer-events: all;
    overflow: hidden;
    
    /* filter: brightness(0.5) grayscale(100); */
    /* &:hover{
        filter: brightness(1) grayscale(0);
    } */

    @media screen and (max-width: 350px){
        display: block;
        /* filter: brightness(1) grayscale(0); */
    }
    &.open{
        position: relative;
        object-fit: contain;
        /* width: auto; */
        /* max-height: 100%; */
    }
`

export const RouteLink = styled(Link)`
    
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: all;
 `

export const ModalContainer = styled(motion.div)`
    position: absolute;
    z-index: 4;
    top: 80px;
    /* margin: 0 2.5%; */
    height: 80vh;
    max-width: 95%;

    display: flex;
    flex-direction: column;
`

export const ModalInfoWrapper = styled.div`
    grid-area: sidebar;
    height: 100px;
    background-color: rgba(0,0,0,0.4);
    /* flex-grow: 1; */
`


export const Overlay = styled(motion.div)`
    z-index: 1;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalTitle = styled.h1`
    position: relative;
    height: auto;
    max-width: 80%;
    left: 50%;
    transform: translateX(-50%);
    /* margin: 5% 0 2% 0; */
    text-align: center;
    font-size: 2.8em;
    font-weight: 650;
    letter-spacing: 1.5px;
    color: #fff;

    @media screen and (max-width: 768px){
        font-size: 2em;
        /* width: 150px; */
    }
    @media screen and (max-width: 450px){
        font-size: 1.2em;
        /* width: 100px; */
    }
`
export const ModalDescription = styled.p`
    position: relative;
    height: auto;
    max-width: 100%;
    text-align: center;
    font-size: 1em;
    font-weight: 500;
    letter-spacing: 1px;
    color: #fff;

    @media screen and (max-width: 768px){
        font-size: 1.2em;
    }
    @media screen and (max-width: 450px){
        font-size: .8em;
    }
    
`