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
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types';


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
        buttonLargeText,
        buttonDestination,
        theme
    }) => {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <InfoContainer lightBg = {+lightBg} id={id}>
                        <InfoWrapper>
                            <InfoRow imgStart = {+imgStart}>
                                <Column1>
                                    <TextWrapper>
                                        <TopLine>{topLine}</TopLine>
                                        <Heading lightBg = {+lightBg}>{heading}</Heading>
                                        <Subtitle lightBg = {+lightBg}>{description}</Subtitle>
                                        <BtnWrap>
                                            <RouteButton 
                                                smooth ='true'
                                                duration ={500}
                                                spy='true'
                                                exact ="true"
                                                offset={-80}
                                                to = {buttonDestination}
                                                lightbg = {+lightBg}
                                                big = {+buttonLarge}
                                                fontbig = {+buttonLargeText}
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
                </ThemeProvider>
            </>
        )
}

InfoSection.propTypes = {
    lightBg: PropTypes.bool,
    id: PropTypes.string,
    imgStart: PropTypes.bool,
    topLine: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
    buttonLabel: PropTypes.string,
    alt: PropTypes.string,
    buttonLarge: PropTypes.bool, 
    buttonLargeText: PropTypes.bool,
    buttonDestination: PropTypes.string,
}

export default InfoSection
