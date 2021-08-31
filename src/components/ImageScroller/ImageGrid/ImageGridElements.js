import styled from "styled-components";
import { motion } from "framer-motion";

export const ImageContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px; 

    @media screen and (max-width: 1000px){
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
        padding: 0 20px; 
    }
`
export const ImageWrap = styled(motion.div)`
    overflow: hidden;
    height: 0;
    padding: 50% 0;
    /* padding controls height, will always be perfectly square regardless of width */
    position: relative;
    opacity: 0.8;
`

export const GalleryImage = styled(motion.img)`
    min-width: 150%;
    min-height: 100%;
    max-width: 150%;
    position: absolute;
    top: 0;
    left: 0;
`
