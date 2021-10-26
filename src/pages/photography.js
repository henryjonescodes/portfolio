import React, {useState} from 'react'
import ImageBackground from '../components/Common/ImageBackground'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/Photography/theme'
import Image from '../images/collage.jpg'


const Photography = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Photography" theme = {theme} transparent = {true}/>
            <ImageBackground src ={Image}/>
        </>
    )
}

export default Photography