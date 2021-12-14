import React, {useState} from 'react'
import ImageBackground from '../components/Common/ImageBackground'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import Gallery from '../components/Photography/Gallery'
import GalleryPage from '../components/Photography/GalleryPage'
import { theme } from '../components/Photography/theme'



const Photography = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Photography" theme = {theme} transparent = {false}/> */}
            {/* <ImageBackground 
                src ={'/images/photography/collage.jpg'}
                message={"Coming Soon!"}
                subtitle={"I'm still working on this one, check back soon!"}
                /> */}
            {/* <GalleryPage/> */}
            <Gallery/>
        </>
    )
}

export default Photography