import styled from "styled-components";


export const PageWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 1;
    overflow: hidden;

    :before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%),
                    linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
        z-index: 2;
    }
`

export const TextWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
`

export const ImageContainer = styled.img`
    position: relative;
    width:100%;
    object-fit: fill;
    -o-object-fit: fill;
`

export const ImageText = styled.h1`
    position: relative;
    font-size: 68px;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
    z-index: 4;

    @media screen and (max-width: 700px){
        font-size: 58px;
    }
`
export const ImageSubtitle = styled.h2`
    position: relative;
    font-size: 20px;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
    z-index: 4;

    @media screen and (max-width: 700px){
        font-size: 18px;
    }
`