import React, {useState} from 'react'
import styled from 'styled-components'
import Footer from '../components/Common/Footer'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import ContactForm from '../components/Contact/ContactForm'
import HeroSection from '../components/Contact/HeroSection'
import SocialPanel from '../components/Contact/SocialPanel'
import { theme } from '../components/Contact/theme'

const Wrapper = styled.div`
    min-width: 350px;
`

const Contact = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Wrapper>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Contact" theme = {theme}/>
            <HeroSection theme = {theme}/>
            <SocialPanel theme = {theme}/>
            <ContactForm theme = {theme}/>
            <Footer padded ={true} theme = {theme} lightcolor = {false}/>
        </Wrapper>
    )
}

export default Contact