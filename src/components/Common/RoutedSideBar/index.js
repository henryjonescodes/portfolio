import React from 'react'
import { ThemeProvider } from 'styled-components'
// import { theme } from '../../Home/theme'

import { 
    SideBarContainer,
    CloseIcon,
    Icon,
    SideBarLink,
    SideBarRoute,
    SideBarWrapper,
    SideBarMenu,
    SideBtnWrap
 } from './RoutedSideBarElements'

const RoutedSideBar = ({isOpen, toggle, theme}) => {
    return (
            <ThemeProvider theme={theme}>
            <SideBarContainer isOpen = {isOpen} onClick = {toggle}>
                <Icon onClick = {toggle}>
                    <CloseIcon />
                </Icon>
                <SideBarWrapper>
                    <SideBarMenu>
                        <SideBarLink to ="/about" onClick = {toggle}>About</SideBarLink>
                        <SideBarLink to ="/gallery" onClick = {toggle}>Photography</SideBarLink>
                        <SideBarLink to ="/projects" onClick = {toggle}>Projects</SideBarLink>
                        <SideBarLink to ="/contact" onClick = {toggle}>Hire Me</SideBarLink>
                    </SideBarMenu>
                        <SideBtnWrap>
                            <SideBarRoute to="/signin">Sign In</SideBarRoute>
                        </SideBtnWrap>
                </SideBarWrapper>
            </SideBarContainer>
            </ThemeProvider>
    )
}

export default RoutedSideBar
