import React, {useState} from 'react'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/Home/theme'
import HeroSection from '../components/Home/HeroSection';
import InfoSection from '../components/Home/InfoSection';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Common/Footer';

export const infoData = {
    //Info Panel Props 
    id: 'about',
    lightBg: true,
    topLine: "Resume | Virtual Portfolio | Skills",
    heading: "About Me",
    description: "I'm Henry, a 3D designer and software engineer from Portland, Maine. I specialize in Blender modeling, Three.js web development, and Java application design.",
    buttonLabel: "See More",
    imgStart: true,
    img: "/images/home/headshot.jpg",
    alt: 'Photo',
    //Button Props
    buttonLarge: true,
    buttonLargeText: false,
    buttonDestination: 'about',
    theme: theme
}
export const infoData2 = {
    //Info Panel Props 
    id: 'photography',
    lightBg: true,
    topLine: "Gallery | Instagram | Blog",
    heading: "Photography",
    description: "Follow me through my camera: view my most recent photography and linked social media.",
    buttonLabel: "See More",
    imgStart: false,
    img: "/images/home/camera.svg",
    alt: 'Photo',
    //Button Props
    buttonLarge: true,
    buttonLargeText: false,
    buttonDestination: 'photography',
    theme: theme
}
export const infoData3 = {
    //Info Panel Props 
    id: 'projects',
    lightBg: false,
    topLine: "3D Renders | Gallery",
    heading: "3D Art",
    description: "Explore my latest 3D art",
    buttonLabel: "See More",
    imgStart: true,
    img: "/images/home/conveyor.svg",
    alt: 'Photo',
    //Button Props
    buttonLarge: true,
    buttonLargeText: false,
    buttonDestination: 'artgallery',
    theme: theme
}
export const infoData4 = {
    //Info Panel Props 
    id: 'contact',
    lightBg: false,
    topLine: "Email | Social Media",
    heading: "Contact",
    description: "Contact me directly via my site or connect with me via my social media accounts.",
    buttonLabel: "Say Hi",
    imgStart: false,
    img:  "/images/home/plane.svg",
    alt: 'Photo',
    //Button Props
    buttonLarge: true,
    buttonLargeText: false,
    buttonDestination: 'contact',
    theme: theme
}

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <NavBar toggle = {toggle} title = "Home" theme = {theme} sticky ={true}/>
            <HeroSection theme = {theme} to={"about"} />
            <InfoSection{...infoData}/>
            <InfoSection{...infoData3}/>
            <InfoSection{...infoData2}/>
            <InfoSection{...infoData4}/> 
            <Footer theme={theme} lightcolor ={true} padded ={false}/>
        </>
    )
}

export default Home