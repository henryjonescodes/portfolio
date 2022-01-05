import React from 'react'
import { ThemeProvider } from 'styled-components'

import { 
    SideBarContainer,
    CloseIcon,
    Icon,
    SideBarLink,
    SideBarWrapper,
    SideBarMenu,
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
                        <SideBarLink to ="/photography" onClick = {toggle}>Photography</SideBarLink>
                        <SideBarLink to ="/artgallery" onClick = {toggle}>3D Art</SideBarLink>
                        <SideBarLink to ="/contact" onClick = {toggle}>Contact Me</SideBarLink>
                    </SideBarMenu>
                </SideBarWrapper>
            </SideBarContainer>
            </ThemeProvider>
    )
}

export default RoutedSideBar
