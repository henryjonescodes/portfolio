import React, {useState} from 'react'
import LinkBar from '../components/LinkBar'
import RoutedSideBar from '../components/RoutedSideBar'
// import { Canvas } from 'react-three-fiber'
// import { OrbitControls } from "@react-three/drei";
// import ThreeDOrbiter from '../components/ThreeDOrbiter'
import ThreeDScene from '../components/ThreeDScene'
import ThreeDSection from '../components/ThreeDSection'
import { threeDObjOne } from '../components/ThreeDSection/Data'

const About = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} />
            <LinkBar toggle = {toggle} title = "About"/>
            <ThreeDSection{...threeDObjOne}/>
            {/* <ThreeDScene/> */}
        </>
    )
}

export default About
