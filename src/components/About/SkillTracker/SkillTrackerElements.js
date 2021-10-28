import styled from 'styled-components'
import { motion } from "framer-motion";

export const ContentWrapper = styled.div`
    position: relative;
    top: -10px;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid yellow; */
`

export const StyledBarWrapper = styled.div`
    position: relative;
    top: 70px;
    display: flex;
    flex-direction: row;
    --width: 60px;
    --height: 8px;

    progress {

    }

    progress[value]{
        -webkit-appearance: none;
        appearance: none;
        width: var(--width);
        height: var(--height);
        /* border: 1px solid green; */
    }

    progress[value]::-webkit-progress-bar{
        height: var(--height);
        border-radius: 30px;
        background-color: ${props => props.theme.bg1};;
    }

    progress[value]::-webkit-progress-value{
        height: var(--height);
        border-radius: 30px;
        background-color: #01bf71;
    }
`

export const ImgButton = styled(motion.a)`
    position: absolute;
    --scalefactor: ${({scale}) => scale};
    width: var(--scalefactor);
    color: red;
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-weight: bold;
`
export const Label = styled.label`
    --text2: ${props => props.theme.t2};
    --text4: ${props => props.theme.t4};

    position: relative;
    top: 70px;
    color:  ${({lightcolor}) => (lightcolor ? 'var(--text4)' : 'var(--text2)')};
    font-size: 16px;
    text-align: center;
`

export const Img = styled.img`
    position: relative;
    width: 100%;
    /* width: 50%; */
    /* margin: 0 0 10px 0; */
    /* padding-right: 0; */
`
export const StarsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    position: relative;
    height: 10px;
    width: 92%;
    top: 72px;
    /* border: 1px solid red; */
`

export const StarContainer = styled.div`
    --left: ${({left}) => left};
    --right: ${({right}) => right};
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: "#d4af37";
    left: var(--left);
    height: 15px;
    width: 15px;
    /* top: 72px; */
    /* border: 1px solid green; */
`