import React from 'react'
import { ThemeProvider } from 'styled-components'
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'
import { 
    CSSVariables, 
    DiagonalContent, 
    DiagonalDiv, 
    SocialButton, 
    SocialContainer, 
    SocialGrid, 
    SocialLabel 
} from './SocialPanelElements'

const SocialPanel = ({theme}) => {
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
                                    href="https://www.upwork.com/freelancers/~01257598b098bc7dc8?viewMode=1" 
                                    target="_black" 
                                    aria-label="UpWork"
                                    whileHover={{ scale: 1.2, rotate: 5 }}>
                                    <SiUpwork/>
                                </SocialButton>
                                <SocialLabel>UpWork</SocialLabel>
                            </SocialContainer>
                        </SocialGrid>
                    </DiagonalContent>
                </DiagonalDiv>
            </ThemeProvider>
        </CSSVariables>
    )
}

export default SocialPanel
