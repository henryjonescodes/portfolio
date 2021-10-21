import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/Home/theme'
import HeroSection from '../components/Home/HeroSection';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Home" theme = {theme} sticky ={true}/>
            <HeroSection/>
        </>
    )
}

export default Home