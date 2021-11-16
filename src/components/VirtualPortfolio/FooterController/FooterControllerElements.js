import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'
import {MdKeyboardArrowLeft, MdArrowBack} from 'react-icons/md'
import styled from 'styled-components'

export const Button = styled.a`
    border-radius: 30px;
    background: #f22;
    white-space: nowrap;
    width: 100%;
    height: 40%;
    color: #fff;
    font-size: 15px;
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
        color: #000;
        background: #fff;
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
export const ArrowBack = styled(MdArrowBack)`
    margin-right: 6px;
    font-size: 20px;
`

export const ArrowLeft = styled(MdKeyboardArrowLeft)`
    margin-right: 6px;
    font-size: 20px;
`
export const ButtonContainer = styled.div`  
    /* border: 1px solid red; */
    margin: 0 20px;
    padding: auto auto;
    width: 300px;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 700px){
        width: 200px;
    }
`

export const Footer = styled.footer`
    background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,1));
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 100vw;
    height: 120px;
`
