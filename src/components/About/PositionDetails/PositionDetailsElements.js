import styled from "styled-components";

import { motion } from "framer-motion";
export const PositionWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    /* border: 1px solid blue; */
`
export const PositionContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 10%;
    padding: 5px 0;
    --background: ${props => props.theme.bg};
    --background2: ${props => props.theme.bg1};
    --color: ${({lightcolor}) => (!lightcolor ? 'var(--background2)' : 'var(--background)')};
    border: 4px dashed var(--color);
    overflow: hidden;

    @media screen and (max-width: 700px){
        width: 70%;
        height: 80%;
        margin: 20px 20px;
    }
    @media screen and (max-width: 500px){
        width: 90%;
        height: 90%;
        margin: 20px 20px;
    }
    /* background: ${({lightcolor}) => (lightcolor ? 'var(--background2)' : 'var(--background)')}; */
`

export const Gradient = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events:none;
    background: ${({lightcolor}) => (!lightcolor ? 
        'linear-gradient(to bottom, rgba(255,255,255,.1) 0%,rgba(255,255,255,1) 80%)' : 
        'linear-gradient(to bottom, rgba(0,0,0,.1) 0%,rgba(0,0,0,.8) 80%)')};

    /* background: linear-gradient(to bottom, rgba(0,0,0,.1) 0%,rgba(0,0,0,.8) 100%); */
    z-index: 2;

`

export const Img = styled.img`
    /* position: relative; */
    /* border: 1px solid red; */
    position: absolute;
    top: -5px;
    width: 150%;
    /* height: 150%; */
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    z-index: 1;
    &:hover{
        opacity: 60%;
        transition: opacity 0.5s ease-in-out;
    }
`

export const TextContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid green; */
    width: 100%;
    pointer-events:none;
    z-index: 2;
`

export const UpperCaseLine = styled.p`
    /* border: 1px solid violet; */
    --text: ${props => props.theme.t1};
    --text2: ${props => props.theme.t3};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 18px;
    line-height: 19px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: left;
    margin: 2px 0px;

    @media screen and (max-width: 700px){
        font-size: 30px;
        line-height: 32px;
    }

    @media screen and (max-width: 500px){
        font-size: 24px;
        line-height: 25px;
    }

    @media screen and (max-width: 450px){
        font-size: 20px;
        line-height: 21px;   
        letter-spacing: 0.7px; 
    }
`

export const SubtitleUpperCase = styled.p`
    /* border: 1px solid violet; */
    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 12px;
    line-height: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    /* margin: 2px 0px; */

    @media screen and (max-width: 700px){
        font-size: 15px;
        line-height: 15px;
    }

    @media screen and (max-width: 500px){
        font-size: 13px;
        line-height: 13px;
    }

    @media screen and (max-width: 450px){
        font-size: 11px;
        line-height: 11px;   
        letter-spacing: 0.7px; 
    }
`
export const SubtitleItalic = styled.p`
    /* border: 1px solid violet; */
    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 10px;
    line-height: 10px;
    font-weight: 700;
    letter-spacing: 1.4px;
    font-style: italic;
    /* margin: 2px 0px; */

    @media screen and (max-width: 700px){
        font-size: 15px;
        line-height: 15px;
    }
    @media screen and (max-width: 500px){
        font-size: 13px;
        line-height: 13px;
    }
`

export const List = styled.ol`
    list-style: none;
    padding: 0px 25px;
    width: 100%;
    /* background-color: #fff; */
    /* border-bottom-left-radius: 4px; */
    /* border-bottom-right-radius: 4px; */
    /* bordxer-top: 3px solid ${props => props.theme.bg1}; */
    /* box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16); */
    /* border: 1px solid violet; */

    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text2)' : 'var(--text)')}; 
    list-style-type: circle;
    list-style-position: outside;

`

export const ListItem = styled.li`
    display: list-item;

    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')}; 
    /* display: flex;
    flex-direction: column;
    align-items: left; */
    /* padding: 10px 0px; */
    /* border-top: 1px solid ${props => props.theme.fg1}; */
    :first-of-type {
        border-top: 1px solid ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
        margin-top: 5px;
        padding-top: 5px;
    }
`

export const Title = styled.span`
    font-size: 16px;
    --text: ${props => props.theme.t1};
    --text2: ${props => props.theme.t3};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')}; 
    margin-bottom: 5px;
    margin-right: 5px;
    font-weight: 700;

    @media screen and (max-width: 700px){
        font-size: 18px;
    }

    @media screen and (max-width: 500px){
        font-size: 13px;
        line-height: 12px;
    }
`
export const ListText = styled.span`
    font-size: 16px;
    letter-spacing: 0.01px;
    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')}; 
    margin-bottom: 5px;

    @media screen and (max-width: 700px){
        font-size: 18px;
    }

    @media screen and (max-width: 500px){
        font-size: 13px;
        line-height: 12px;
    }
`