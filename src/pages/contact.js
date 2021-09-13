import React, {useState,useEffect} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import ContactForm from '../components/Contact/ContactForm'
import Footer from '../components/Contact/Footer'
import HeroSection from '../components/Contact/HeroSection'
import styled from 'styled-components'
import SocialPanel from '../components/Contact/SocialPanel'
import InfoSection from '../components/Home/InfoSection'
// export const ContactPageContainer = styled.div`
//     max-height: calc(100vh - 210px);
// `

const Contact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
        <RoutedSideBar isOpen = {isOpen} toggle = {toggle} />
        <LinkBar toggle = {toggle} title = "Contact" lightColor = {true} sticky ={false}/>
        {/* <ContactPageContainer> */}
            <HeroSection offsetY={offsetY}/>
            <SocialPanel/>
            <ContactForm imgStart ={true}/>
            {/* <InfoSection/>
            <InfoSection/>
            <InfoSection/> */}
            <Footer/>
        {/* </ContactPageContainer> */}
        </>
    );
}

export default Contact;