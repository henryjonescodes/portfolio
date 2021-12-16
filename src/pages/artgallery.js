import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import Gallery from '../components/Common/Gallery'
import { theme } from '../components/ArtGallery/theme'
import useFirestore from '../hooks/useFirestore';


const ArtGallery = () => {
    const [isOpen, setIsOpen] = useState(false)
    // const {docs} = useFirestore("gallery1")
    // docs.sort((a,b) => (parseInt(a.key) < parseInt(b.key)) ? 1 : ((parseInt(b.key) < parseInt(a.key)) ? -1 : 0)); 
    // console.log(docs)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "3D Art" theme = {theme} transparent = {false}/>
            <Gallery routepath={"artgallery"} collection={"gallery1"}/>
        </>
    )
}

export default ArtGallery