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
    NavLinks,
    } from './LinkBarElements.js';

const LinkBar = ({toggle, title, sticky, theme, transparent}) => {
    const [scrollNav, setScrollNav] = useState(false);
 
    useEffect(function setupListener() {
        function handleScroll() {
            if(window.scrollY >= 80) {
                setScrollNav(prevState => ({...prevState, scrollNav:true}))
            } else {
                setScrollNav(prevState => ({...prevState, scrollNav:false}))
            }
        }
        window.addEventListener('scroll', handleScroll)
    
        return function cleanupListener() {
          window.removeEventListener('scroll', handleScroll)
        }
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
                        onClick={toggleHome}
                        // lightcolor={lightcolor}
                        >
                        {title}
                    </NavLogo>
                    <MobileIcon 
                        onClick={toggle}
                        // lightcolor={lightcolor}
                        >
                        <FaBars color= {theme.t1} />
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
                                // lightcolor={lightcolor}
                            >About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks 
                                to="/photography"
                                smooth="true"
                                duration={500}
                                spy="true"
                                exact='true'
                                offset={-80}
                                // lightcolor={lightcolor}
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
                                // lightcolor={lightcolor}
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
                                // lightcolor={lightcolor}
                            >Contact</NavLinks>
                        </NavItem>
                    </NavMenu>
                </NavBarContainer>
            </Nav>
        </IconContext.Provider>
        </ThemeProvider>
       </>
    )
}

// Specifies the default values for props:
LinkBar.defaultProps = {
    transparent: false
  };

export default LinkBar