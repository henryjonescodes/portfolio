import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import Gallery from '../components/Common/Gallery'
import { theme } from '../components/ArtGallery/theme'


const ArtGallery = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "3D Art" theme = {theme} transparent = {true}/>
            <Gallery routepath={"artgallery"} collection={"gallery1"}/>
        </>
    )
}

export default ArtGallery