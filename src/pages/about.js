import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/About/theme'
import HeroSection from '../components/About/HeroSection'
import SkillsSection from '../components/About/SkillsSection'
import Footer from '../components/Common/Footer'
import ArtsSection from '../components/About/ArtsSection'
import styled from 'styled-components'
import { CSSVariables, SkewBox, SkewContainer, SkewContent, SkewContentWrapper } from '../components/About/diagonalDivs'

export const footerSkew = styled.div`
    position: absolute;
    border: 1px solid green;
    background: ${props => props.theme.bg};
    transform: skewY(-11deg);
    height: 200px;

`
const About = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "About" theme = {theme} transparent={true}/>
            <CSSVariables>
                <SkewContainer theme = {theme} above={true}>
                    <SkewBox theme = {theme} skewRight={true}>
                        <SkewContentWrapper  skewRight={true} >
                            <SkewContent skewRight={true} above={false}/>
                        </SkewContentWrapper>
                    </SkewBox>
                </SkewContainer>
                <SkewContainer theme = {theme} above={false}>
                    <SkewBox theme = {theme}>
                        <SkewContentWrapper skewRight={false} above={false}>
                            <SkewContent above={false}/>
                        </SkewContentWrapper>
                    </SkewBox>
                </SkewContainer>
            </CSSVariables>
            <Footer theme={theme} lightcolor ={false} padded ={false}/>
        </>
    )
}

export default About