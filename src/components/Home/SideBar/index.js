import React from 'react'
import { 
    SideBarContainer,
    CloseIcon,
    Icon,
    SideBarLink,
    SideBarRoute,
    SideBarWrapper,
    SideBarMenu,
    SideBtnWrap
 } from './SideBarElements'

const SideBar = ({isOpen, toggle}) => {
    return (
        <SideBarContainer isOpen = {isOpen} onClick = {toggle}>
            <Icon onClick = {toggle}>
                <CloseIcon />
            </Icon>
            <SideBarWrapper>
                <SideBarMenu>
                    <SideBarLink to ="about" onClick = {toggle}>About</SideBarLink>
                    <SideBarLink to ="photography" onClick = {toggle}>Photography</SideBarLink>
                    <SideBarLink to ="projects" onClick = {toggle}>Projects</SideBarLink>
                    <SideBarLink to ="hireMe" onClick = {toggle}>Hire Me</SideBarLink>
                </SideBarMenu>
                    <SideBtnWrap>
                        <SideBarRoute to="/signin">Sign In</SideBarRoute>
                    </SideBtnWrap>
            </SideBarWrapper>
        </SideBarContainer>
    )
}

export default SideBar
