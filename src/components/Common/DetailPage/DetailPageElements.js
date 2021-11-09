import styled from "styled-components";
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'

export const PageWrapper = styled.div`
    
    position: absolute;
    /* top: 0; */
    /* display: flex; */
    /* flex-direction: column; */
    /* height: 100vh; */
    height: 100%;
    width: 100vw;
    /* align-items: center; */
    /* @media only screen and (max-width: 700px) { */
        /* height: 150vh; */
    /* } */
    /* border: 6px dashed pink; */
`

export const TitleContainer = styled.div`
    height: 40%;
    width: 100%;
    /* padding-top: 80px; */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding-top: 100px;
    /* border: 6px dashed purple; */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    z-index: -1;
    /* &:before {
        content: "";
        position: absolute;
        border: 6px dashed purple;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: -1;
        background: linear-gradient(to right, rgba(0,0,0,.1) 0%,rgba(0,0,0,.8) 80%);
    } */
`

export const TextRow = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100vw;
    max-width: 1000px;
    padding: 0 10px 0 40px;
    &:last-of-type {
        margin-top: 100px;
        padding: 0 40px 0 10px;
        justify-content: flex-end;
    }

    /* border: 6px dashed red; */

`

export const TextBox = styled.div`
    position: relative;
    /* top: 120px; */
    width: 350px;
    height: 150px;
    
    --background: ${props => props.theme.bg};
    --background2: ${props => props.theme.bg1};    
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--background2)')};    
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding: 20px 0 0 15px;
    box-shadow: -4px 4px 10px 0px #000;


    @media only screen and (max-width: 700px) {
        width: 275px;
        height: 100px;
        transition: width 1s ease-in-out, height 1s ease-in-out;
    }
    &:after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 0;
        backface-visibility: hidden;
        box-shadow: -4px 4px 10px 0px #000;
        top: 15px;
        left: -15px;
        height: 100%;
        width: 100%;
        background-color: ${({highlight}) => (highlight ? highlight : '#01bf71')};
    }

`
export const DateBox = styled.div`
    position: relative;
    /* top: 75%; */
    /* bottom:-60px; */
    box-shadow: 4px 4px 10px 0px #000;
    width: 300px;
    height: 70px;
    --background: ${props => props.theme.bg};
    --background2: ${props => props.theme.bg1};    
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--background2)')};     
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 33px;

    &:after {
        content: "";
        z-index: -1;
        position: absolute;
        box-shadow: 4px 4px 10px 0px #000;
        left: 0;
        top: 15px;
        left: 15px;
        height: 100%;
        width: 100%;
        background-color: ${({highlight}) => (highlight ? highlight : '#01bf71')};
    }

`

export const TopLine = styled.p`
    --text2: ${props => props.theme.t1};
    --text: ${props => props.theme.t3};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 16px;
    border-bottom: 1px solid #ffffff;

    @media only screen and (max-width: 700px) {
        font-size: 14px;
        letter-spacing: .1px;
    }
    /* @media only screen and (max-width: 500px) {
        font-size: 12px;
    } */
`
export const Heading = styled.h1`
    --text2: ${props => props.theme.t1};
    --text: ${props => props.theme.t3};
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};

    @media only screen and (max-width: 700px) {
        font-size: 34px;
    }
    /* @media only screen and (max-width: 500px) {
        font-size: 24px;
    } */
`
export const Dateline = styled.p`
    --text2: ${props => props.theme.t2};
    --text: ${props => props.theme.t4};
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};

    @media only screen and (max-width: 700px) {
        font-size: 16px;
    }
`

export const Content = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: center;
    --background: ${props => props.theme.bg};
    --background2: ${props => props.theme.bg1};    
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--background2)')}; 
    box-shadow: 0px -5px 10px 1px #000;

    /* border: 4px dashed green; */
`

export const TextContainer = styled.div`
    padding: 40px 40px 0 40px;
    width: 100vw;
    max-width: 1000px;

    /* border: 4px dashed red; */

`

export const Blurb = styled.p`
    /* max-width: 800px; */
    --text2: ${props => props.theme.t2};
    --text: ${props => props.theme.t4};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};
    margin-right: 0;
    margin-left: 1px;
    margin-bottom: 30px;
    font-size: 20px;
    line-height: 22px;
`

export const DetailList = styled.ul`
    width: 100%;
    position: relative;
    top: 0;
`

export const DetailListItem = styled.li`
    --text2: ${props => props.theme.t2};
    --text: ${props => props.theme.t4};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};    margin-bottom: 5px;
    font-size: 22px;
    list-style-position: outside;
    margin-left: 20px;
    padding: 5px 0;
    @media only screen and (max-width: 700px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 15px;
    }
`

export const Button = styled.a`
    --highlight: ${({highlight}) => (highlight ? highlight : '#01bf71')};
    --foreground: ${props => props.theme.fg};
    --background: ${props => props.theme.bg};
    --text2: ${props => props.theme.t1};
    --text: ${props => props.theme.t2};
    border-radius: 50px;
    background: var(--highlight);
    white-space: nowrap;
    padding: 20px 30px;
    margin: 50px 100px;
    color: var(--text2);
    font-size: 15px;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2 ease-in-out;
    z-index: 10;

    @media only screen and (max-width: 700px) {
        margin: 50px 50px;
    }
    @media only screen and (max-width: 500px) {
        margin: 50px 10px;
    }

    &:hover {
        transition: all 0.2 ease-in-out;
        color: var(--text);
        background: var(--foreground);
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
