import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import {FaLinkedin, FaInstagram, FaGithub} from 'react-icons/fa'
import { 
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaLogo,
    SocialMediaWrap,
    WebsiteRights,
    SocialIconLink,
    SocialIcons
    } from './FooterElements'

const Footer = ({padded}) => {
    const toggleHome = () => {
        scroll.scrollToTop()
    }

    return (
        <FooterContainer padded = {padded}>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Some Title</FooterLinkTitle>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Some Title2</FooterLinkTitle>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Some Title3</FooterLinkTitle>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Some Title4</FooterLinkTitle>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                            <FooterLink to="/signin">Some Text</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialMediaLogo to='/' onClick={toggleHome}>Henry Jones</SocialMediaLogo>
                        <WebsiteRights>
                            Made 1hundo pa'cent by Henry Jones in {new Date().getFullYear()}
                        </WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="//www.instagram.com/theycallmezonez/" target="_black" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href="//www.linkedin.com/in/henryjonescodes/" target="_black" aria-label="LinkedIn">
                                <FaLinkedin />
                            </SocialIconLink>
                            <SocialIconLink href="//github.com/henryjonescodes" target="_black" aria-label="GitHub">
                                <FaGithub />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
