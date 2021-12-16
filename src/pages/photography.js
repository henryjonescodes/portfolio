import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import Gallery from '../components/Common/Gallery'
import { theme } from '../components/Photography/theme'
import useFirestore from '../hooks/useFirestore';


const Photography = () => {
    const [isOpen, setIsOpen] = useState(false)
    // const {docs} = useFirestore("gallery2")
    // docs.sort((a,b) => (parseInt(a.key) < parseInt(b.key)) ? 1 : ((parseInt(b.key) < parseInt(a.key)) ? -1 : 0)); 
    // console.log(docs)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Photography" theme = {theme} transparent = {false}/>
            <Gallery routepath={"photography"} collection={"gallery2"}/>
        </>
    )
}

export default Photography