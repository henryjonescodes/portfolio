import styled from "styled-components";
import {BiExpand} from "react-icons/bi"
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
    border: 2px solid red;

    position: absolute;
    width: 100%;
    /* height: 100vh; */
    padding-top: 80px;
    display: flex;
`
export const Container = styled.div`
    border: 4px solid violet;

    background-color: #eee;
    width: 100%;
    max-width: 90rem;
    padding: 0 1.5rem;
    margin: auto;
`

export const ExpandIcon = styled(BiExpand)`
    color: rgba(255,255,255, .6);
    font-size: 3rem;
    position: relative;
    z-index: 5;
    padding: 1rem 1rem; 
    /* padding: 1px 1px;  */
    border: 2px solid rgba(255,255,255,.6);
    border-radius: .4rem;
    opacity: 0;
    transition: opacity .5s;
    &:hover{
        opacity: 1;
        transition: opacity .5s;
    }
    /* border: 4px solid yellow; */
`
export const ImageDetails = styled(Link)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgba(0,0,0,.8);
    opacity: 0;
    transition: opacity .5s;
    &:hover{
        opacity: 1;
    } 
`
export const Img = styled.img`
    /* border: 4px solid yellow; */
    --aspect: ${({aspect}) => (aspect ? `${aspect}%` : "100%")};
    
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-width: 100%;
    padding-bottom: var(--aspect);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &:before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.8);
        opacity: 0;
        transition: opacity .5s;
    }

    &:hover{
        &:before {opacity: 1;}
        ${ExpandIcon}{
            opacity: 1;
        }
    } 

    background-image: url(${({href}) => (href ? href : 'images/default.jpg')}); 
`

export const ImageGallery = styled(Masonry)`

`
export const MotionCard = styled(motion.div)`
`
export const CardOpenLink = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    pointer-events: auto;
    background-color: rgba(0,0,0,.8);
    opacity: 0;
    transition: opacity .5s;

    &.open{
        z-index: 7;
    }

    border: 1px solid yellow;
`
export const MotionCard2 = styled(motion.div)`
    min-width: 100%;
    min-height: 100%;

    &.open{
        /* top: 100px; */
        min-width: 50%;
        min-height: 50%;
        /* height: 500px;
        width: 500px; */
        position: absolute;
        z-index: 2;
        overflow: hidden;
        padding: 40px 0;
        
        @media only screen and (max-width: 700px) {
            padding: 0;
            top: 20%;
            width: 90%;
            transform: translateX(6%);
            align-self: center;
        }
    }
`