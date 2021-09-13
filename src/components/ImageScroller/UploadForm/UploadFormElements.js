import styled from "styled-components";

export const FieldWrapper = styled.div `
    // border: 1px solid green;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`
export const FormBar = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 48px;
    align-items: center;
    max-width: 100%;
    // min-width: 700px;

    // border: 1px solid blue;
`

export const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 0;
    align-items: center;
    max-width: 100%;
    padding: 10px 50px;

    // border: 1px solid blue;
`

export const FormColumn = styled.div`
    // border: 1px solid pink;
    padding: 0px 15px;
    height: 100%;
`

export const StatusBar = styled.div`
    // border: 1px solid purple;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`
export const FormLabel = styled.label`
    background: ${props => props.theme.highlight};
    color: ${props => props.theme.textField};
    cursor: pointer;
    margin-bottom: 15px;
    text-transform: uppercase;
    width: 50%;
    border-radius: 5px;
    height: 50%;
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

export const StyledLabel = styled.label`
    // border: 1px solid red;

    font-size:15px;
    color:${props => props.theme.t2};
    font-weight:normal;
    padding-top:5px;
    padding-bottom:5px;
    float:none;
    text-align:left;
    width:auto;
    display:block;
`
export const FormField = styled.input`
    background-color:${props => props.theme.textField};
	border:solid 1px ${props => props.theme.border};
	color:${props => props.theme.t2};

    font-size:15px;
	border-radius:6px;
	padding-top:5px;
	padding-bottom:5px;
	padding-left:10px;
	padding-right:10px;
	width:80%;
	box-sizing:border-box;

    &focus {
        border-color:${props => props.theme.active};
	    outline: none;
    }
`

export const FormTextarea = styled.textarea`
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
    height: 100px;
    box-sizing:border-box;

    &focus {
        border-color:${props => props.theme.active};
        outline: none;
    } 
`
export const FormInput = styled.input`
    height: 0;
    width: 0;
    opacity: 0;
`

export const FormFileInput = styled.input.attrs({ type: 'file'})`
    height: 0;
    width: 0;
    opacity: 0;
`