import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'

export const Button = styled(LinkS)`
    --highlight: ${props => props.theme.highlight};
    --foreground: ${props => props.theme.fg};
    --background: ${props => props.theme.bg};

    border-radius: 50px;
    background: ${({lightbg}) => (lightbg ? 'var(--foreground)' : 'var(--background)')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    color: ${({lightbg}) => (!lightbg ? 'var(--background)' : 'var(--foreground)')};
    font-size: ${({fontbig}) => (fontbig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2 ease-in-out;

    &:hover {
        transition: all 0.2 ease-in-out;
        background: ${({lightbg}) => (lightbg ? 'var(--foreground)' : 'var(--background)')};
    }
`

export const RouteButton = styled(LinkR)`
    --highlight: ${props => props.theme.highlight};
    --foreground: ${props => props.theme.fg};
    --background: ${props => props.theme.bg};
    --text2: ${props => props.theme.t1};
    --text: ${props => props.theme.t3};
    border-radius: 50px;
    /* background: ${({lightbg}) => (lightbg ? 'var(--foreground)' : 'var(--background)')}; */
    background: var(--highlight);
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    color: ${({lightbg}) => (!lightbg ? 'var(--text)' : 'var(--text2)')};
    font-size: ${({fontbig}) => (fontbig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2 ease-in-out;

    &:hover {
        transition: all 0.2 ease-in-out;
        background: ${({lightbg}) => (lightbg ? 'var(--background)' : 'var(--foreground)')};
    }
`