import React, {useState} from 'react'
import ImageBackground from '../components/Common/ImageBackground'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import Gallery from '../components/Photography/Gallery'
import GalleryPage from '../components/Photography/GalleryPage'
import { theme } from '../components/Photography/theme'



const Photography = () => {
    let items = [
        {
            id: "1",
            href: "images/a.jpg",
            aspect: "portrait"
        },
        {
            id: "2",
            href: "images/b.jpg",
            aspect: "landscape"
        },
        {
            id: "3",
            href: "images/c.jpg",
            aspect: "landscape"
        },
        {
            id: "4",
            href: "images/d.jpg",
            aspect: "portrait"
        },
        {
            id: "5",
            href: "images/e.jpg",
            aspect: "portrait"
        },
        {
            id: "6",
            href: "images/f.jpg",
            aspect: "landscape"
        },
        {
            id: "7",
            href: "images/g.jpg",
            aspect: "landscape"
        },
        {
            id: "8",
            href: "images/h.jpg",
            aspect: "portrait"
        },
        {
            id: "9",
            href: "images/a.jpg",
            aspect: "portrait"
        },
        {
            id: "10",
            href: "images/b.jpg",
            aspect: "landscape"
        },
        {
            id: "11",
            href: "images/c.jpg",
            aspect: "landscape"
        },
        {
            id: "12",
            href: "images/d.jpg",
            aspect: "portrait"
        },
        {
            id: "13",
            href: "images/e.jpg",
            aspect: "portrait"
        },
        {
            id: "14",
            href: "images/f.jpg",
            aspect: "landscape"
        },
        {
            id: "15",
            href: "images/g.jpg",
            aspect: "landscape"
        },
        {
            id: "16",
            href: "images/h.jpg",
            aspect: "portrait"
        },
        {
            id: "17",
            href: "images/h.jpg",
            aspect: "portrait"
        },
        {
            id: "18",
            href: "images/h.jpg",
            aspect: "portrait"
        },
    ]
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Photography" theme = {theme} transparent = {false}/> */}
            <Gallery items ={items}/>
        </>
    )
}

export default Photography