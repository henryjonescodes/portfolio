import React from 'react'

import { ThemeProvider } from 'styled-components'
import {FaLinkedin, FaInstagram, FaGithub} from 'react-icons/fa'
import { theme } from '../theme'
import { CSSVariables, DiagonalContent, DiagonalDiv, SocialButton, SocialContainer, SocialGrid, SocialLabel } from './SocialPanelElements'

const SocialPanel = () => {
    return (
        <CSSVariables>
            <ThemeProvider theme={theme}>
                <DiagonalDiv>
                    <DiagonalContent>
                        <SocialGrid>
                            <SocialContainer>
                                <SocialButton 
                                    href="//www.linkedin.com/in/henryjonescodes/" 
                                    target="_black" 
                                    aria-label="LinkedIn" 
                                    whileHover={{ scale: 1.2, rotate: 5 }}>
                                    <FaLinkedin/>
                                </SocialButton>
                                <SocialLabel>LinkedIn</SocialLabel>
                            </SocialContainer>
                            <SocialContainer>
                                <SocialButton
                                    href="//github.com/henryjonescodes" 
                                    target="_black" 
                                    aria-label="GitHub"
                                    whileHover={{ scale: 1.2, rotate: 5 }}>
                                    <FaGithub/>
                                </SocialButton>
                                <SocialLabel>GitHub</SocialLabel>
                            </SocialContainer>
                            <SocialContainer>
                                <SocialButton 
                                    href="//www.instagram.com/theycallmezonez/" 
                                    target="_black" 
                                    aria-label="Instagram"
                                    whileHover={{ scale: 1.2, rotate: 5 }}>
                                    <FaInstagram/>
                                </SocialButton>
                                <SocialLabel>Instagram </SocialLabel>
                            </SocialContainer>
                            <SocialContainer>
                                <SocialButton 
                                    href="//www.linkedin.com/in/henryjonescodes/" 
                                    target="_black" 
                                    aria-label="LinkedIn"
                                    whileHover={{ scale: 1.2, rotate: 5 }}>
                                    <FaLinkedin/>
                                </SocialButton>
                                <SocialLabel>LinkedIn</SocialLabel>
                            </SocialContainer>
                        </SocialGrid>
                    </DiagonalContent>
                </DiagonalDiv>
            </ThemeProvider>
        </CSSVariables>
    )
}

export default SocialPanel
