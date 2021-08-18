import React, {useState} from 'react';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/InfoSection/Data';
import Services from '../components/Services';
import { servicesObj } from '../components/Services/Data';
import Footer from '../components/Footer';


const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        // <div>Some More Text</div>
        <>
            <SideBar isOpen = {isOpen} toggle = {toggle} /> 
            <NavBar toggle = {toggle} />
            <HeroSection />
            <InfoSection{...homeObjOne}/>
            <InfoSection{...homeObjTwo}/>
            <InfoSection{...homeObjThree}/>
            <InfoSection{...homeObjFour}/>
            <Services{...servicesObj}/>
            <Footer/>
        </>
    )
}

export default Home
