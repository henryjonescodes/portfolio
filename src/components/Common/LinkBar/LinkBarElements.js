import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

/**
 * Container
 */

//Main Container
export const Nav = styled.nav` 
    /* --topmargin: ${({sticky}) => (sticky ? '-80px' : '0px')}; */
    /* margin-top: var(--topmargin); */

    --background: ${props => props.theme.bg};
    --foreground: ${props => props.theme.fg};
    background: ${({scrollNav}) => (scrollNav ? 'var(--background)' : 'var(--background)')};
    height: 80px;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    position: ${({sticky}) => (sticky ? 'sticky' : 'absolute')};
    top: 0;    
    width: 100%;
    z-index: 10;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`
//Secondary Container
export const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0px 24px;
    margin-right: 20px;
`

//Contains Menu Items
export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavItem = styled.li`
    height: 80px;
`

/**
 * Menu Items
 */

//Page Title
export const NavLogo = styled(LinkR)`
    --foreground: ${props => props.theme.fg};
    color: var(--foreground);
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`
//Hamburger
export const MobileIcon = styled.div`
    --foreground: ${props => props.theme.fg};
    display: none;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: var(--foreground);
    }
`
//Link
export const NavLinks = styled(LinkR)`
    --foreground: ${props => props.theme.t1};
    color: var(--foreground);
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        border-bottom: 3px solid #01bf71;
    }
`

//Signin Button
export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
    }
`
export const NavBtnLink = styled(LinkR)`
    --foreground: ${props => props.theme.bg};
    --background: ${props => props.theme.fg};
    --b1: ${props => props.theme.active};
    --f1: ${props => props.theme.fg};
    border-radius: 50px;
    background: var(--background);
    white-space: nowrap;
    padding: 10px 20px;
    color: var(--foreground);
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: var(--b1);
        color: var(--f1);
    }
`