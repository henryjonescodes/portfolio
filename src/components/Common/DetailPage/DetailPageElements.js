import styled from "styled-components";
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'

export const PageWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100vw;
    overflow-y: scroll;

    /* border: 6px dashed pink; */
`

export const TitleContainer = styled.div`
    height: 70%;
    max-height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    /* padding-top: 100px; */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    z-index: -1;
    min-height: 400px;

    /* border: 6px dashed purple; */
`

export const TextRow = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: 100%;
    max-width: 1000px;
    padding: 0 10px 0 40px;

    &:last-of-type {
        padding: 0 40px 0 10px;
        justify-content: flex-end;
    }

    /* border: 6px dashed red; */
`

export const TextBox = styled.div`
    --background: ${props => props.theme.bg};
    --background2: ${props => props.theme.bg1};  

    position: relative;
    width: 350px;
    height: 150px;
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--background2)')};    
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding: 20px 0 0 15px;
    box-shadow: -4px 4px 10px 0px #000;

    @media only screen and (max-width: 700px){
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
    --background: ${props => props.theme.bg};
    --background2: ${props => props.theme.bg1};    

    position: relative;
    box-shadow: 4px 4px 10px 0px #000;
    width: 300px;
    height: 70px;
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--background2)')};     
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 33px;
    
    @media only screen and (max-height: 1000px) {
        height: 40px;
        top: 0;
        transition: width 1s ease-in-out, height 1s ease-in-out;
    }

    @media only screen and (max-height: 700px) {
        top: 0;
        transition: top 1s ease-in-out;
    }

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

    @media only screen and (max-width: 700px),  (max-height: 1000px)  {
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

    @media only screen and (max-width: 700px),  (max-height: 1000px)  {
        font-size: 34px;
    }
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
    height: auto;
    min-height: 60%;
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
    --text2: ${props => props.theme.t2};
    --text: ${props => props.theme.t4};
    
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};
    margin-right: 0;
    margin-bottom: 30px;
    font-size: 22px;
    line-height: 23px;
    letter-spacing: .3px;

    @media only screen and (max-width: 700px) {
        font-size: 20px;
        line-height: 21px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 18px;
        line-height: 19px;
    }

    /* border: 4px dashed red; */
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
        font-size: 20px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 18px;
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
    padding: 20px 0px;
    margin: 50px 20%;
    color: var(--text2);
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
