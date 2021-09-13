import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalContainer = styled(motion.div)`
// border: 1px solid red;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    overflow-y: scroll;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // padding: 24px 24px;
`

export const ModalImage = styled(motion.img)`
    display: block;
    max-width: 60%;
    max-height: 60%;
    margin: 40px auto;
    box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
    border: 1px solid black;
`

export const ModalTextFrame = styled(motion.div)`
    // border: 1px solid red;
    // height: 300px;
    // top: 50px;
    // align-items: center;
    
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.42);
    background-color: rgba(65, 65, 65, 0.3);
    border: 4px dashed #6d6d6d;
    position: relative;
    max-width: 60%;
    min-width: 50%;
    display: flex;
    flex-direction: column;
    text-align:left;
`

export const ModalCols = styled.div`
    // border: 1px solid pink;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;


    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
        padding: 0 20px; 
    }

`

export const TextColumn = styled.div`
    // border: 1px solid blue;
    padding: 10px 10px;
    width: 100%;
    height: 100%;
    text-align: left;
`

export const InfoColumn = styled(TextColumn)`
    text-align: right;
`

export const ModalLabel = styled.label`
    color: #565656;
    font-size: 15px;
    font-style: italic;
`
export const ModalH1 = styled.h1`
    color: #6d6d6d;
    font-size:30px;
    font-weight: bold;
    padding-left: 10px;
`
export const ModalP = styled.p`
    color: #6d6d6d;
    font-size:20px;
`

export const ModalPanel = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;
`