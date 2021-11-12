import styled from 'styled-components'
import { motion } from "framer-motion";

export const ContentWrapper = styled.div`
    position: absolute;
    top: -10px;
    width: 80px;
    height: 95px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 440px){
        width: 70px;
        height: 85px;
    }
    @media screen and (max-width: 340px){
        width: 50px;
        height: 65px;
    }

    /* border: 1px dotted red; */
`
export const BarContainer = styled.div`
    position:absolute;
    display: flex;
    bottom: 0px;
    flex-direction: column;
    align-items: center;

    /* border: 1px solid red; */
`

export const ImgButton = styled(motion.a)`
    position: relative;
    --scalefactor: ${({scale}) => scale};
    width: var(--scalefactor);
    color: red;
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-weight: bold;

    /* border: 1px solid violet; */
`
export const Label = styled.label`
    --text2: ${props => props.theme.t2};
    --text4: ${props => props.theme.t4};

    position: relative;
    color:  ${({lightcolor}) => (lightcolor ? 'var(--text4)' : 'var(--text2)')};
    font-size: 16px;
    text-align: center;
    width: 140%;
    margin: 2px 0px;

    @media screen and (max-width: 600px){
        font-size: 13px;
    }
    @media screen and (max-width: 400px){
        font-size: 11px;
    }

    /* border: 1px solid blue; */
`

export const Img = styled.img`
    position: relative;
    width: 100%;
`