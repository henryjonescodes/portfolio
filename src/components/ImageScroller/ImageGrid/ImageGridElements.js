import styled from "styled-components";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

export const ImageContainer = styled.div`
    padding: 40px 40px;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

`

export const ImageWrap = styled(motion.div)`
    opacity: 0.8;
`
export const GalleryImage = styled(motion.img)`
    // border: 1px solid red;
    max-width: 100%;
    min-width: 100%;


    // min-height: 100%;
    // position: absolute;
    // top: 0;
    // left: 0;
`
export const StyledMasonry = styled(Masonry)`
    display: flex;
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    margin-left: -30px; /* gutter size offset */
    width: auto;
`