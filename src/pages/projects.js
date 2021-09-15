import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import Blurb from '../components/Projects/Blurb'
import ContactForm from '../components/Projects/ContactForm'


const Projects = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} />
            <LinkBar lightColor='false' toggle = {toggle} title = "Projects"/>
            <Blurb/>
        </>
    )
}

export default Projects
