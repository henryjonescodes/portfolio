import { motion } from "framer-motion";
import styled from "styled-components";

/**
 * Container
 */
export const FormPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    height: 1000px;
    position: relative;
    z-index: 1;
`
//Contains Video and shadow effect
export const FormBackground = styled.div`
    transform: skewY(-11deg);
    position: absolute;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    
    @media screen and (min-width: 2000px){
        margin-bottom: 40px;
    }

    /* border: 1px solid red; */
`

//Contains All Forground elements
export const PageWrapper = styled.div`
    display: grid;
    z-index: 3;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    justify-content: center;
`

/**
 * Form Container
 */

//Motion div for moving form
export const FormContainer = styled(motion.div)`
    position: relative;
    display: grid;
    align-items: center;
`

//Form wrapper styling
export const FormWrapper = styled.div`
    display: flex;  
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.bg};
    border-radius: 10px;
    padding: 20px 10px;
    box-shadow: 0px 12px 20px 1px ${props => props.theme.shadow};
`

//Form
export const StyledForm = styled.form`
    width: 400px;
    padding: 10px 10px ;
`

//Wraps all form inputs
export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

//Contains a single form input and label
export const InputContainer = styled.div`
    width: 100%;
    padding: 10px 10px;
`

/**
 * Content
 */
export const VideoBackground = styled.video`
    -o-object-fit: cover;
    object-fit: cover;
    background-size: cover;
    z-index:1;
    right: 0; 
    bottom: 0;
    min-width: 100%; 
    min-height: 100%;
    width: auto; 
    height: auto; 

    /* border: 1px solid green; */
`

export const VideoOffsetter = styled(motion.div)`
    transform: skewY(11deg);
    height: 100%;
    width: 100%;
    position: absolute;
    top: -200px;
    
    /* border: 3px solid pink; */
`

export const ShadowBox = styled.div`
    box-shadow: inset 0px 12px 12px -9px ${props => props.theme.shadow};
    height: 100%;
    width : 100%;
    z-index:3;
    position:absolute;
`