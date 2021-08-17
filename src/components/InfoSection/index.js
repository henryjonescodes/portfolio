import React from 'react'
import { Button } from '../ButtonElements'
import { 
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img
 } from './InfoSectionElements'


const InfoSection = ({lightBg,id,imgStart,topLine,lightText,heading,
                    lightTextDesc,description,buttonLabel,img,alt,
                    buttonLarge, buttonLightBg,buttonLightText,buttonLargeText}) => {
    return (
        <>
            {/* <InfoContainer id={id}> */}
            <InfoContainer lightBg = {lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart = {imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText = {lightText}>{heading}</Heading>
                                <Subtitle darkText = {lightTextDesc}>{description}</Subtitle>
                                <BtnWrap>
                                    <Button 
                                        smooth ={true}
                                        duration ={500}
                                        spy={true}
                                        exact ="true"
                                        offset={-80}
                                        to="home"
                                        primary = {buttonLightBg}
                                        big = {buttonLarge}
                                        dark = {!buttonLightText}
                                        fontBig = {buttonLargeText}
                                    >{buttonLabel}</Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src ={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>

        </>
    )
}

export default InfoSection
