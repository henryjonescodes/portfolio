import React, {useState} from 'react'
import LinkBar from '../components/LinkBar'
import RoutedSideBar from '../components/RoutedSideBar'

const About = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} />
            <LinkBar toggle = {toggle} title = "About"/>
        </>
    )
}

export default About
