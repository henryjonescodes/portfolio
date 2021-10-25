import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
    BannerContainer,
    BannerText,
    ArtsBackground,
    ArtsContainer
} from './ArtsSectionElements.js'

const ArtsSection = ({theme, title}) => {
    return (
        <ThemeProvider theme ={theme}>
            <ArtsContainer>
                <BannerContainer>
                    <BannerText theme={theme}>{title}</BannerText>
                </BannerContainer>
                <ArtsBackground>
                    
                </ArtsBackground>
            </ArtsContainer>
        </ThemeProvider>
    )
}

export default ArtsSection
