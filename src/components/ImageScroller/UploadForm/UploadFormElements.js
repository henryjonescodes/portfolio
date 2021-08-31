import styled from "styled-components";

export const FormContainer = styled.form`
    margin: 30px auto 10px;
    text-align: center;
`
export const FormLabel = styled.label`
    display: block;
    width: 30px;
    height: 30px;
    border: 1px solid #efb6b2;
    border-radius: 50%;
    margin: 10px auto;
    line-height: 30px;
    color: #efb6b2;
    font-weight: bold;
    font-size: 24px;

    &:hover {
        background: #efb6b2;
        color: white;
    }
`
export const FormInput = styled.input.attrs({ 
    type: 'file'})`
    height: 0;
    width: 0;
    opacity: 0;
`