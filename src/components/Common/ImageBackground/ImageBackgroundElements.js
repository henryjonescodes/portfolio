import styled from "styled-components";
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'


export const PageWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 1;
    overflow: hidden;

    :before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%),
                    linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
        z-index: 2;
    }
`

export const TextWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: center;

    /* border: 1px solid red; */
 `

export const ImageContainer = styled.img`
    position: relative;
    width:100%;
    object-fit: fill;
    -o-object-fit: fill;
    `

export const ImageText = styled.h1`
    position: relative;
    font-size: 68px;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
    z-index: 4;
    
    @media screen and (max-width: 700px){
        font-size: 58px;
    }
    `
export const ImageSubtitle = styled.h2`
    position: relative;
    font-size: 20px;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
    z-index: 4;
    
    @media screen and (max-width: 700px){
        font-size: 18px;
    }
    `
export const Blurb = styled.p`
    /* border: 1px solid red; */
    width: 400px;
    text-align: center;
    color: #fff;
    font-size: 18px;
`

export const Button = styled.a`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 20px 40px;
    margin: 20px 10%;
    color: #000;
    font-size: 20px;
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
        color: #fff;
        background: #000;
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