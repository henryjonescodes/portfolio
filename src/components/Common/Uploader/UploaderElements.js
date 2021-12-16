import styled from "styled-components";
import { motion } from "framer-motion";


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

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1000px){
        flex-direction: column;
        align-items: center;
    }
`

export const UpdaterContainer = styled.div`
    position: relative;
    max-width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1000px){
        max-width: 400px;
    }

`

export const DropDownContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const FormContainer = styled.form`
    position: relative;
    max-width: 40%;
    width: 400px;

    @media screen and (max-width: 1000px){
        max-width: 80%;
    }
`

export const ImageViewer = styled.img`
    max-height: 60%;
    object-fit: contain;
    width: 90%;
`

export const ImageSelectForm = styled.form`
    display: flex;
    padding: 0 100px;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const Select = styled.select`
    width: 80%;
    font-size: 16px;
    height: 40px;
    min-width: 100px;
`

export const Option = styled.option`
    font-size: 12px;
`

export const ImageSelectIcon = styled.label`
    display: block;
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 50%;
    margin: 10px auto;
    line-height: 40px;
    color: black;
    font-weight: bold;
    font-size: 10px;
    text-align: center;

    &:hover {
        background: #ddd;
    }
`
export const ImageSelect = styled.button`
    height: 0;
    width: 0;
    opacity: 0;
`