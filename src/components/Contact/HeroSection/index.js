import React from 'react'
import { ThemeProvider } from 'styled-components'
import { 
    HeroContainer,
    HeroBackground,
    HeroContent,
    HeroH1,
    } from './HeroSectionElements'


const HeroSection = ({theme}) => { 
    return (
        <ThemeProvider theme={theme}>
            <HeroContainer id ="contact">
                <HeroBackground/>
                <HeroContent>
                    <HeroH1>Hi! Lets get in touch.</HeroH1>
                </HeroContent> 
            </HeroContainer>
        </ThemeProvider>
    )
}

export default HeroSection