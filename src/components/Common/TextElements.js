import styled from "styled-components"

export const StyledH1 = styled.h1`
    font-size: 85px;
    width: 600px;

    @media screen and (max-width: 900px){
        font-size: 75px;
        width: 80vw;
    }

    @media screen and (max-width: 600px){
        font-size: 48px;
        width: 80vw;
    }
`


export const Paragraph = styled.p`
    font-size: 24px;
    max-width: 600;

    @media screen and (max-width: 768px){
        font-size: 24px;
    }

    @media screen and (max-width: 600px){
        font-size: 18px;
    }
`