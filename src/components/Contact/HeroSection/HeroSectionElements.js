import styled from 'styled-components'
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'


export const HeroContainer = styled.div`
    // background: #0c0c0c;
    // border: 1px solid red;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    height: 400px;
    position: relative;
    z-index: 1;

`
export const HeroBackground = styled.div`
    // border: 1px solid pink;
    box-shadow:  inset 0px -10px 12px -7px #000;

    background: #fff;
    transform: skewY(-11deg);


    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const VideoBackground = styled.video`
    // border: 1px solid green;
    
    width: 100%;
    position: center;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    // background: #232a34;
`

export const HeroContent = styled.div`
    // border: 1px solid green;

    z-index: 3; 
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    left: 10%;
    display: flex;
    flex-direction: comumn;
    align-items: center;
`

export const HeroH1 = styled.h1`
    color: #000;
    font-size: 85px;
    text-align: left;
    width: 600px;

    @media screen and (max-width: 900px){
        font-size: 75px;
        width: 500px;
    }

    @media screen and (max-width: 580px){
        font-size: 48px;
    }
`


export const HeroP = styled.p`
    margin-top: 24px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    max-width: 600;

    @media screen and (max-width: 768px){
        font-size: 24px;
    }

    @media screen and (max-width: 580px){
        font-size: 18px;
    }
`

export const HeroBtnWrapper = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 6px;
    font-size: 20px;
`

export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 6px;
    font-size: 20px;
`

export const DiagonalBox = styled.div`
    position: absolute;
    top: 0px;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    // transform: skewY(-11deg);
    height: 100px;
    z-index:2;

`