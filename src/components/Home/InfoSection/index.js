import React from 'react'
import {InfoContainer,
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
        Img,
    } from './InfoSectionElements'

import { RouteButton } from '../../Common/ButtonElements'

const InfoSection = ({
        lightBg,
        id,
        imgStart,
        topLine,
        heading,
        description,
        buttonLabel,
        img,
        alt,
        buttonLarge, 
        buttonLightBg,
        buttonLightText,
        buttonLargeText,
        buttonDestination
    }) => {
        return (
            <>
                <InfoContainer lightBg = {lightBg} id={id}>
                    <InfoWrapper>
                        <InfoRow imgStart = {imgStart}>
                            <Column1>
                                <TextWrapper>
                                    <TopLine>{topLine}</TopLine>
                                    <Heading lightBg = {lightBg}>{heading}</Heading>
                                    <Subtitle lightBg = {lightBg}>{description}</Subtitle>
                                    <BtnWrap>
                                        <RouteButton 
                                            smooth ={true}
                                            duration ={500}
                                            spy={true}
                                            exact ="true"
                                            offset={-80}
                                            to={buttonDestination}
                                            primary = {buttonLightBg}
                                            big = {buttonLarge}
                                            dark = {!buttonLightText}
                                            fontBig = {buttonLargeText}
                                        >{buttonLabel}</RouteButton>
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
