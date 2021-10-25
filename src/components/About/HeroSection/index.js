import React from 'react'
import { ThemeProvider } from 'styled-components'
import{
    HeroBackground,
    HeroContainer,
    HeroContent,
    HeroH1
} from './HeroSectionElements'

const HeroSection = ({theme, title}) => {
    return (
        <ThemeProvider theme ={theme}>
            <HeroContainer>
                <HeroBackground/>
                <HeroContent>
                    <HeroH1>{title}</HeroH1>
                </HeroContent>
            </HeroContainer>
        </ThemeProvider>
    )
}

export default HeroSection
