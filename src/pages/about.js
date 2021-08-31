import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import ThreeDPanel from '../components/About/ThreeDPanel'


const About = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} />
            <LinkBar toggle = {toggle} title = "About"/>
            <ThreeDPanel/>
        </>
    )
}

export default About
