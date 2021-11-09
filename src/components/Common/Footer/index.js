import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import {FaLinkedin, FaInstagram, FaGithub} from 'react-icons/fa'
import { ThemeProvider } from 'styled-components'
import { 
    FooterContainer,
    FooterWrap,
    // FooterLinksContainer,
    // FooterLinksWrapper,
    // FooterLinkItems,
    // FooterLinkTitle,
    // FooterLink,
    SocialMedia,
    SocialMediaLogo,
    SocialMediaWrap,
    WebsiteRights,
    SocialIconLink,
    SocialIcons
    } from './FooterElements'

const Footer = ({padded, theme, lightcolor}) => {
    const toggleHome = () => {
        scroll.scrollToTop()
    }

    return (
        <ThemeProvider theme={theme}>
            <FooterContainer padded = {padded} lightcolor= {+lightcolor}>
                <FooterWrap>
                    {/* <FooterLinksContainer>
                        <FooterLinksWrapper>
                            <FooterLinkItems lightcolor= {lightcolor}>
                                <FooterLinkTitle>Some Title</FooterLinkTitle>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems lightcolor= {lightcolor}>
                                <FooterLinkTitle>Some Title2</FooterLinkTitle>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                        <FooterLinksWrapper>
                            <FooterLinkItems lightcolor= {lightcolor}>
                                <FooterLinkTitle>Some Title3</FooterLinkTitle>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems lightcolor= {lightcolor}>
                                <FooterLinkTitle>Some Title4</FooterLinkTitle>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                                <FooterLink lightcolor= {lightcolor} to="/signin">Some Text</FooterLink>
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                    </FooterLinksContainer> */}
                    <SocialMedia>
                        <SocialMediaWrap>
                            <SocialMediaLogo lightcolor= {+lightcolor} to='/' onClick={toggleHome}>Henry Jones</SocialMediaLogo>
                            <WebsiteRights lightcolor= {+lightcolor}>
                                Made 1hundo pa'cent by Henry Jones in {new Date().getFullYear()}
                            </WebsiteRights>
                            <SocialIcons>
                                <SocialIconLink lightcolor= {+lightcolor} href="//www.instagram.com/theycallmezonez/" target="_black" aria-label="Instagram">
                                    <FaInstagram />
                                </SocialIconLink>
                                <SocialIconLink lightcolor= {+lightcolor} href="//www.linkedin.com/in/henryjonescodes/" target="_black" aria-label="LinkedIn">
                                    <FaLinkedin />
                                </SocialIconLink>
                                <SocialIconLink lightcolor= {+lightcolor} href="//github.com/henryjonescodes" target="_black" aria-label="GitHub">
                                    <FaGithub />
                                </SocialIconLink>
                            </SocialIcons>
                        </SocialMediaWrap>
                    </SocialMedia>
                </FooterWrap>
            </FooterContainer>
            </ThemeProvider>
    )
}

export default Footer
