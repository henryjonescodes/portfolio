import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import {animateScroll as scroll} from 'react-scroll'
import { ThemeProvider } from 'styled-components'
import { 
    Nav,
    NavBarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavBtn,
    NavBtnLink
 } from '../../Common/LinkBar/LinkBarElements.js'

import { NavLinks } from './NavBarElements.js'

const NavBar = ({toggle, title, sticky, theme, transparent}) => {
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

    return (
        <>
            <ThemeProvider theme={theme}>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav = {scrollNav} sticky ={sticky} transparent = {transparent}>
                    <NavBarContainer>
                        <NavLogo 
                            to='/' 
                            onClick={toggleHome}>
                            {title}
                        </NavLogo>
                        <MobileIcon 
                            onClick={toggle}>
                            <FaBars color= {theme.fg} />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks 
                                    to="about"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                >About</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                    to="photography"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                >Photography</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                    to="projects"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}   
                                >Projects</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                    to="contact"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                >Contact</NavLinks>
                            </NavItem>
                            <NavBtn>
                                <NavBtnLink 
                                    to="/signin">
                                    Sign In
                                </NavBtnLink>
                            </NavBtn>
                        </NavMenu>
                    </NavBarContainer>
                </Nav>
            </IconContext.Provider>
            </ThemeProvider>
        </>
    )
}

// Specifies the default values for props:
NavBar.defaultProps = {
    transparent: false
  };

export default NavBar