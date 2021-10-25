import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
    BannerContainer,
    BannerText,
    SkillsBackground,
    SkillsContainer
} from './SkillsSectionElements.js'

const SkillsSection = ({theme,title}) => {
    return (
        <ThemeProvider theme ={theme}>
            <SkillsContainer>
                <BannerContainer>
                    <BannerText theme={theme}>{title}</BannerText>
                </BannerContainer>
                <SkillsBackground>
                    
                </SkillsBackground>
            </SkillsContainer>
        </ThemeProvider>
    )
}

export default SkillsSection
