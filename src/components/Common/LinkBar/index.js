import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import {animateScroll as scroll} from 'react-scroll'
import {
    Nav, 
    NavBarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    NavBtnLink
    } from './LinkBarElements.js';

const LinkBar = ({ toggle, title, lightColor, sticky}) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    })

    const toggleHome = () => {
        scroll.scrollToTop()
    }

    let iconColor = ({lightColor}) => (lightColor ? '#123' : '#123');

    return (
       <>
        <IconContext.Provider value={{color: '#fff'}}>
            <Nav scrollNav = {scrollNav} lightColor = {lightColor} sticky ={sticky}>
                <NavBarContainer>
                    <NavLogo 
                        to='/' 
                        onClick={toggleHome} 
                        lightColor = {lightColor}>
                        {title}
                    </NavLogo>
                    <MobileIcon 
                        onClick={toggle}
                        lightColor = {lightColor}>
                        <FaBars color= {iconColor} />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks 
                                to="/about"
                                smooth="true"
                                duration={500}
                                spy="true"
                                exact='true'
                                offset={-80}
                                lightColor = {lightColor}
                            >About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks 
                                to="/gallery"
                                smooth="true"
                                duration={500}
                                spy="true"
                                exact='true'
                                offset={-80}
                                lightColor = {lightColor}
                            >Photography</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks 
                                to="/projects"
                                smooth="true"
                                duration={500}
                                spy="true"
                                exact='true'
                                offset={-80}
                                lightColor = {lightColor}
                            >Projects</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks 
                                to="/contact"
                                smooth="true"
                                duration={500}
                                spy="true"
                                exact='true'
                                offset={-80}
                                lightColor = {lightColor}
                            >Contact</NavLinks>
                        </NavItem>
                        <NavBtn>
                            <NavBtnLink 
                                to="/signin"
                                lightColor = {lightColor}>
                                Sign In
                            </NavBtnLink>
                        </NavBtn>
                    </NavMenu>
                </NavBarContainer>
            </Nav>
        </IconContext.Provider>
       </>
    )
}

export default LinkBar