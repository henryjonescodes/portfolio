import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
`

export const ModalImage = styled(motion.img)`
    display: block;
    max-width: 60%;
    max-height: 80%;
    margin: 60px auto;
    box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
    border: 1px solid black;
`