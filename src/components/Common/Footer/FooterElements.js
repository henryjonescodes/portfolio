import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const FooterContainer = styled.footer`
    --background: ${props => props.theme.bg};
    --foreground: ${props => props.theme.fg};    
    background-color: ${({lightcolor}) => (lightcolor ? 'var(--background)' : 'var(--foreground)')};
    margin-top: ${({padded}) => (padded ? `-320px` : `0px`)};
    padding-top: ${({padded}) => (padded ? `400px` : `0px`)};
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 50px;

    /* @media screen and (min-width: 2000px){
        margin-top: ${({padded}) => (padded ? `-320px` : `0px`)};
        padding-top: ${({padded}) => (padded ? `380px` : `0px`)};    
    }

    @media screen and (min-width: 2000px){
        margin-top: ${({padded}) => (padded ? `-320px` : `0px`)};
        padding-top: ${({padded}) => (padded ? `540px` : `0px`)};    
    } */
    overflow: hidden;
`
export const FooterWrap = styled.div`
    padding-top: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`
export const FooterLinksContainer = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 820px){
        padding-top: 32px;
    }
`

export const FooterLinksWrapper = styled.div`
    display: flex;

    @media screen and (max-width: 820px){
        flex-direction: column;
    }
`

export const FooterLinkItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
    text-align: left;
    width: 160px;
    box-sizing: border-box;
    --text: ${props => props.theme.t3};
    --text2: ${props => props.theme.t1};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};

    @media screen and (max-width: 420px){
        margin: 0px;
        padding: 10px;
        width: 100%;
    }
`
export const FooterLinkTitle = styled.h1`
    font-size: 14px;
    margin-bottom: 16px;
`
export const FooterLink = styled(Link)`
    --text: ${props => props.theme.t3};
    --text2: ${props => props.theme.t1};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};   
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;

    &:hover {
        color: #01bf71;
        transition: 0.3s ease-out;
    }
`
export const SocialMedia = styled.section`
    max-width: 1000px;
    width: 100%;
`
export const SocialMediaLogo = styled(Link)`
    --text: ${props => props.theme.t3};
    --text2: ${props => props.theme.t1};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')}; 
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`
export const SocialMediaWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 40px auto 0 auto;

    @media screen and (max-width: 820px){
        flex-direction: column;
    }
`
export const WebsiteRights = styled.small`
    --text: ${props => props.theme.t3};
    --text2: ${props => props.theme.t1};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')}; 
    margin-bottom: 16px;
`
export const SocialIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
`
export const SocialIconLink = styled.a`
    --text: ${props => props.theme.t3};
    --text2: ${props => props.theme.t1};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};   
    font-size: 24px;
`