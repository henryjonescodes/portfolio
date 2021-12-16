import styled from "styled-components";
import { motion } from "framer-motion";

export const FormContainer = styled.form`
    /* border: 1px solid blue; */

    position: relative;
    max-width: 600px;
    margin: 1% auto;
`
export const FormLabel = styled.label`
    display: block;
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 50%;
    margin: 10px auto;
    line-height: 40px;
    color: black;
    font-weight: bold;
    font-size: 24px;
    text-align: center;

    &:hover {
        background: #ddd;
    }
`
export const FormInput = styled.input.attrs({
    type: 'file'})`
    height: 0;
    width: 0;
    opacity: 0;
`

export const ProgressContainer = styled.div`
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ProgressBarSlider = styled(motion.div)`
    max-width: 75%;
    height: 8px;
    background: #efb6b2;
    margin-top: 20px;
`

export const OutputContainer = styled.div`
    text-align: center;
`
export const Error = styled.h1`
    font-size: 1.2em;
`
export const Status = styled.h1`
    font-size: 1.2em;
`

export const InputContainer = styled.div`
    width: 100%;
    padding: 10px 10px;
`

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
    height: 150px;
    box-sizing:border-box;

    &focus {
        border-color:${props => props.theme.active};
        outline: none;
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