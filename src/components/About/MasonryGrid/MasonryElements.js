import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'

export const Container = styled.div`
  position: relative;
  width: 1200px;
  left: 50%;
  transform: translateX(-50%);
  /* height: 100vh; */
  flex: 1 1 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  /* border: 1px dashed orange; */
  top: -15px;

    @media only screen and (max-width: 1300px) {
        width: 90%;
    }     

    @media only screen and (max-width: 800px) {
        width: 100%;
    }     
`

export const Overlay = styled(motion.div)`
    z-index: 1;
    position: fixed;
    /* background: rgba(0, 0, 0, 0.8); */
    /* will-change: opacity; */
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 990px;
    /* border: 1px solid red; */
`

export const CardContentContainer = styled.div`
    width: 100%;
    height: 240px;
    position: relative;
    display: block;

    /* display: flex;
    justify-content: center;
    align-items: center; */

    /* pointer-events: none; */
    /* border: 1px solid red; */
    
    &.open{
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        position: fixed;
        z-index: 2;
        overflow: hidden;
        padding: 40px 0;
        
        @media only screen and (max-width: 700px) {
            padding: 0;
            top: 20%;
            width: 85%;
            transform: translateX(8%);
            align-self: center;
        }
    }
`

export const CardContent = styled(motion.div)`
    pointer-events: auto;
    position: relative;
    border-radius: 20px;
    background: #1c1c1e;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    &.open{
        height: auto;
        max-width: 700px;
        overflow: hidden;
        /* pointer-events: none; */
        display: flex;
        flex-direction: column;
    }
    /* border: 1px solid blue; */
`

export const CardImageContainer = styled(motion.div)`
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden; 
    height: 100%;
    width: 400px;
/* 
    height: 420px;
    width: 100vw; */

    &.open{
        position: relative;
        z-index: 1;
        height: 300px;
        width: 100%;
    }
    /* border: 2px dashed pink; */
`

export const CardImage = styled.img`
    /* position: absolute; */
    /* border: 2px dashed yellow; */
    position: relative;
    overflow: hidden;
    object-fit: cover;
    width: 100%;
    height: 100%;
    /* max-width: 100%; */
    /* min-height: 100%; */
    bottom: 0;

    &.open{
        position: absolute;
        /* width: 100%; */
        /* height: 100%; */
        object-fit: cover;
        /* max-width: 100%; */
        /* min-height: 100%; */
    }
`

export const TitleContainer = styled(motion.div)`
    position: absolute;
    /* top: 15px; */
    bottom: 20px;
    left: 15px;
    max-width: 85%;
    z-index:2;
    /* border: 2px dashed purple; */

    /* @media only screen and (max-width: 700px) {
         max-width: 90%;
         left: 15px;
    } */
    &.open{
        position: relative;
        /* top: 50%; */
        left: 0;
        bottom: 0;
        padding: 10px 0;
        max-width: 60%;
        /* top: 53%; */
        /* bottom: 36%; */
        /* left: 40px; */
        padding-right: auto;
        z-index: 1;
    }
`

export const TitleTextWrapper = styled.div`
    /* border: 2px solid red; */
    margin-right: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`

export const Category = styled.span`
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
`

export const StyledH1 = styled.h1`
    font-weight: bold;
    color: white;
    margin: 6px 0 12px;
`
export const StyledH2 = styled.h2`
    color: #fff;
    margin: 4px 0;
    font-size: 33px;

    @media only screen and (max-width: 700px) {
        font-size: 24px;
    }
`

export const ContentContainer = styled(motion.div)`
    /* padding: 460px 35px 35px 35px; */
    /* margin-top: 460px; */
    padding: 0px 20px 15px 40px;
    max-width: 700px;
    /* width: 90vw; */
    width: 100%;
    /* border: 5px solid green; */
/* 
    &.open{
        position: absolute;
        z-index: 1;
        height: 50%;
        width: 100%;
    } */
`

export const Card = styled.li`
    list-style: none;
    padding: 10px 10px;
    margin: 0;

    /* &:nth-child(4n + 1) {
        flex: 0 0 60%;
        max-width: 60%;
    }
    &:nth-child(4n + 4) {
        flex: 0 0 60%;
        max-width: 60%;
    } */
    &:nth-child(odd) {
        /* padding-left: 0; */
    }
    &:nth-child(even) {
        /* padding-right: 0; */
    }
    /* border: 1px solid green; */
    overflow: hidden;
    
    @media only screen and (max-width: 1000px) {
        width: 300px;
    }
    @media only screen and (max-width: 700px) {
        /* width: 250px; */
        width: 50%;
    }
    @media only screen and (max-width: 600px) {
        width: 50%;
        padding: 10px 5px;
    }

`

export const CardList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  /* border: 1px solid violet; */
`

export const CardOpenLink = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    /* border: 1px solid yellow; */

    &.open{
        z-index: 2;
        /* border: 2px solid pink; */
    }
`

export const DetailList = styled.ul`
    width: 100%;
    /* border: 1px solid violet; */
    position: relative;
    top: 0;
    /* max-height: 200px; */
`

export const DetailListItem = styled.li`
    color: white;
    margin-bottom: 5px;
    font-size: 22px;

    @media only screen and (max-width: 700px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 15px;
    }
`

export const Gradient = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events:none;
    background: ${({lightcolor}) => (lightcolor ? 
        'linear-gradient(to bottom, rgba(255,255,255,.1) 0%,rgba(255,255,255,1) 80%)' : 
        'linear-gradient(to bottom, rgba(0,0,0,.1) 0%,rgba(0,0,0,.8) 80%)')};

    /* background: linear-gradient(to bottom, rgba(0,0,0,.1) 0%,rgba(0,0,0,.8) 100%); */
    z-index: 1;
    &.open{
        visibility: hidden;
        opacity: 0%;
        transition: opacity 4s, visibility 4s;
    }
`
// export const ButtonContainer = styled.div`
//     border: 1px solid violet;
//     width: auto;

// `
export const OverlayButton = styled.a`
    --highlight: ${props => props.theme.highlight};
    --foreground: ${props => props.theme.fg};
    --background: ${props => props.theme.bg};
    --text2: ${props => props.theme.t1};
    --text: ${props => props.theme.t3};
    border-radius: 50px;
    /* background: ${({lightbg}) => (lightbg ? 'var(--foreground)' : 'var(--background)')}; */
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
    z-index: 10;

    &:hover {
        transition: all 0.2 ease-in-out;
        background: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
    }
`

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 6px;
    font-size: 20px;
`

export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 6px;
    font-size: 20px;
`
