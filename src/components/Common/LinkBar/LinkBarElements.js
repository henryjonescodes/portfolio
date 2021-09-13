import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
// import {Link as LinkS} from 'react-scroll'

export const Nav = styled.nav` 
    --background: ${({lightColor}) => (lightColor ? '#fff' : '#000')};
    --foreground: ${({lightColor}) => (lightColor ? '#000' : '#fff')};
    background: ${({scrollNav}) => (scrollNav ? 'var(--background)' : 'transparent')};
    height: 80px;
    --topmargin: ${({sticky}) => (sticky ? '-80px' : '0px')};
    margin-top: var(--topmargin);
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

export const NavBarContainer = styled.div`
    // background: #fff;
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0px 24px;
    // background: #000000;
    // max-width: 1100px;
`

export const NavLogo = styled(LinkR)`
    --foreground: ${({lightColor}) => (lightColor ? '#000' : '#fff')};
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

export const MobileIcon = styled.div`
    --foreground: ${({lightColor}) => (lightColor ? '#000' : '#fff')};
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

export const NavMenu = styled.ul`
    display: flex;
    alligh-items: center;
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

export const NavLinks = styled(LinkR)`
    --foreground: ${({lightColor}) => (lightColor ? '#000' : '#fff')};
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
export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
    }
`
export const NavBtnLink = styled(LinkR)`
    --background: ${({lightColor}) => (lightColor ? '#01bf71' : '#010606')};
    --foreground: ${({lightColor}) => (lightColor ? '#010606' : '#01bf71')};
    --b1: ${({lightColor}) => (lightColor ? '#fff' : '#333')};
    --f1: ${({lightColor}) => (lightColor ? '#333' : '#fff')};
    border-radius: 50px;
    background: var(--foreground);
    white-space: nowrap;
    padding: 10px 20px;
    color: var(--background);
    font-size: 16px;
    outling: none;
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