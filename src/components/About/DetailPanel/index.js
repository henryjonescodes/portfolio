import React from 'react'
import { ThemeProvider } from 'styled-components'
import {  Img, ImgWrap, DetailWrapper, TextWrapper, UpperCaseLine, SubtitleUpperCase, SubtitleItalic } from './DetailPanelElements'

const DetailPanel = ({theme, src, header, subtitle, subsubtitle}) => {
    return (
        <ThemeProvider theme={theme}>
            <DetailWrapper>
                <ImgWrap>
                    <Img src ={src}/>
                </ImgWrap>
                <TextWrapper>
                    <UpperCaseLine>{header}</UpperCaseLine>
                    <SubtitleUpperCase>{subtitle}</SubtitleUpperCase>
                    <SubtitleItalic>{subsubtitle}</SubtitleItalic>
                </TextWrapper>
            </DetailWrapper>
        </ThemeProvider>
    )
}

export default DetailPanel
