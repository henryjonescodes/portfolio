import React from 'react'
import { ThemeProvider } from 'styled-components'
import {  Img, ImgWrap, DetailWrapper, TextWrapper, UpperCaseLine, SubtitleUpperCase, SubtitleItalic } from './DetailPanelElements'

const DetailPanel = ({theme, src, header, subtitle, subsubtitle, lightcolor}) => {
    return (
        <ThemeProvider theme={theme}>
            <DetailWrapper>
                <ImgWrap>
                    <Img src ={src}/>
                </ImgWrap>
                <TextWrapper>
                    <UpperCaseLine lightcolor={lightcolor}>{header}</UpperCaseLine>
                    <SubtitleUpperCase lightcolor={lightcolor}>{subtitle}</SubtitleUpperCase>
                    <SubtitleItalic lightcolor={lightcolor}>{subsubtitle}</SubtitleItalic>
                </TextWrapper>
            </DetailWrapper>
        </ThemeProvider>
    )
}

export default DetailPanel
