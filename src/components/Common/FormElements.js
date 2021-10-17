import styled from "styled-components";

/**
 * Theme Usage:
 * Labels: t1
 * Form Text: t2
 * TextField Background: textField, border
 * StyledSubmit: t3, active, focus, hightlight
 */

/**
 * Input
 */
export const StyledInput = styled.input`
    background-color:${props => props.theme.textField};
    border:solid 1px ${props => props.theme.border};
    color:${props => props.theme.t2};

    font-size:15px;
    -moz-border-radius:6px;
    -webkit-border-radius:6px;
    border-radius:6px;
    padding-top:5px;
    padding-bottom:5px;
    padding-left:10px;
    padding-right:10px;
    width:100%;
    box-sizing:border-box;

    &focus {
        border-color:${props => props.theme.active};
        outline: none;
    }
`

//Styled textarea
export const StyledInputField = styled.textarea`
    background-color:${props => props.theme.textField};
    border:solid 1px ${props => props.theme.border};
    color:${props => props.theme.t2};

    font-size:15px;
    -moz-border-radius:6px;
    -webkit-border-radius:6px;
    border-radius:6px;
    padding-top:5px;
    padding-bottom:5px;
    padding-left:10px;
    padding-right:10px;
    width:100%;
    height: 200px;
    box-sizing:border-box;

    &focus {
        border-color:${props => props.theme.active};
        outline: none;
    } 
`
//Form Submit Button
export const StyledInputSubmit = styled.input.attrs({ type: 'submit' })`
    background: ${props => props.theme.highlight};
    color: ${props => props.theme.t3};
    cursor: pointer;
    margin-bottom: 0;
    text-transform: uppercase;
    width: 50%;
    border-radius: 5px;
    height: 35px;
    border-color: transparent;
    box-shadow: 0px;
    outline: none;
    transition: 0.15s;
    text-align: center;

    &:active {
        background-color: ${props => props.theme.active};
    }

    &:hover {
        background-color:${props => props.theme.focus};
        border-color:${props => props.theme.focus};
        color:white;
    }
`

/**
 * Text
 */
export const StyledInputLabel = styled.label`
    font-size:15px;
    color:${props => props.theme.t1};
    font-weight:normal;
    padding-top:5px;
    padding-bottom:5px;
    float:none;
    text-align:left;
    width:auto;
    display:block;
`
export const StyledInputHeading = styled.h1`
    margin-bottom: 10px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${props => props.theme.t1};

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`
export const StyledInputSubtitle = styled.p`
    max-width: 440px;
    font-size: 18px;
    line-height: 24px;
    color: ${props => props.theme.t1};
`