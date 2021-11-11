import React, {useState} from 'react'
import ImageBackground from '../components/Common/ImageBackground'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/Projects/theme'


const Projects = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Virtual Portfolio" theme = {theme} transparent = {true}/>
            <ImageBackground 
                src={'/images/projects/trees.png'}
                message={"Coming Soon!"}
                subtitle={"I'm still working on this one, check back soon!"}
                buttonDestination={"/virtualportfolio"}
                buttonText={"Virtual Portfolio (In Development)"}
                blurb={"Developed in Three.js using 100% custom models, this interactive WebGL environment is the future centerpiece of this site. THIS IS AN UNFINISHED PROJECT: here are many optimizations to be done, as such, it may not render well on every device, but feel free to have a look!"}
            />
        </>
    )
}

export default Projects