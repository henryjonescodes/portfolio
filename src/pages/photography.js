import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import ImageGallery from '../components/ImageScroller/ImageGallery';

const Photography = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} />
            <LinkBar toggle = {toggle} title = "Photography" lightColor = {true} sticky ={false}/>
            <ImageGallery gallery='images'/>
        </>
    )
}

export default Photography