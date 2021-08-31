import React, {useState} from 'react';
import SideBar from '../components/Home/SideBar';
import NavBar from '../components/Home/NavBar';
import HeroSection from '../components/Home/HeroSection';
import InfoSection from '../components/Home/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/Home/InfoSection/Data';
import Services from '../components/Home/Services';
import { servicesObj } from '../components/Home/Services/Data';
import Footer from '../components/Common/Footer';


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
