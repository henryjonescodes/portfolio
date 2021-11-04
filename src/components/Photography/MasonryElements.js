import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    height: 100%;
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
        position: fixed;
        z-index: 1;
        overflow: hidden;
        padding: 40px 0;
        
        @media only screen and (max-width: 600px) {
            padding: 0;
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
        position: absolute;
        z-index: 1;
        height: 50%;
        width: 100%;
    }
    /* border: 2px dashed pink; */
`

export const CardImage = styled.img`
    /* position: absolute; */
    /* border: 2px dashed yellow; */
    position: relative;
    overflow: hidden;
    max-width: 100%;
    min-height: 100%;
    bottom: 0;

    &.open{
        position: absolute;
        width: 100%;
        height: 100%;
    }
`

export const TitleContainer = styled(motion.div)`
    position: absolute;
    top: 15px;
    left: 15px;
    max-width: 300px;
    /* border: 2px dashed purple; */

    &.open{
        top: 30px;
        left: 30px;
        z-index: 1;
    }
`

export const Category = styled.span`
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
`

export const StyledH1 = styled.h1`
    font-weight: bold;
    color: white;
    margin: 6px 0 12px;
`
export const StyledH2 = styled.h2`
    color: #fff;
    margin: 8px 0;
`

export const ContentContainer = styled(motion.div)`
    padding: 460px 35px 35px 35px;
    max-width: 700px;
    width: 90vw;
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
    border: 1px solid green;
    overflow: hidden;
`

export const CardList = styled.ul`
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