import styled from "styled-components";
import { motion } from "framer-motion";

export const ProgressContainer = styled.div`
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ProgressBarSlider = styled(motion.div)`
    max-width: 75%;
    height: 8px;
    background: #efb6b2;
    margin-top: 20px;
`