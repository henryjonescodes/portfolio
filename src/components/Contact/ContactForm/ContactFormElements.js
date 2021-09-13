import styled from "styled-components";
import {motion} from "framer-motion";

export const FormContainer = styled.div`
    // border: 1px solid red;


    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    height: 1000px;
    position: relative;
    z-index: 1;
`
export const ShadowBox = styled.div`
    box-shadow: inset 0px 12px 12px -9px #000;
    height: 100%;
    width : 100%;
    z-index:3;
    position:absolute;
`

export const FormBackground = styled.div`
    transform: skewY(-11deg);
    // border: 1px solid green;


    position: absolute;
    top: -1px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const VideoBackground = styled(motion.video)`
    transform: skewY(11deg);
    // box-shadow: inset 0px 22px 12px -9px red;

    // border: 1px solid blue;

    width: 100%;
    position: absolute;
    top: -200px;
    right: 0;
    bottom: 0;
    left: 0;
    height: 200%;
    -o-object-fit: cover;
    object-fit: cover;
    z-index:1;
    
`
// export const VideoWrapper = styled(motion.div)`
//     transform: skewY(11deg);
//     // box-shadow: inset 0px 22px 12px -9px red;

//     // border: 1px solid blue;

//     width: 120%;
//     position: absolute;
//     top: -200px;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     height: 150%;
//     -o-object-fit: cover;
//     object-fit: cover;
//     z-index:1;
// `

export const PageWrapper = styled.div`
    // transform: skewY(11deg);
    // border: 1px solid green;
    // padding: 50px 24px;
    // height: 860px;
    // max-width: 1100px;

    display: grid;
    z-index: 3;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    justify-content: center;
`
export const FormRow = styled(motion.div)`
    // border: 1px solid blue;
    // top: -20px;
    // grid-auto-columns: minmax(auto, 1fr);
    // grid-template-areas: ${({imgStart}) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};
    // @media screen and (max-width: 768px){
    //     grid-template-areas: ${({imgStart}) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
    // }
   
    position: relative;
    display: grid;
    align-items: center;
`


export const StyledForm = styled.form`
    width: 400px;
    padding: 10px 10px ;
`

export const FormWrapper = styled.div`
    // background: radial-gradient(#b2b2b2 49%, rgba(255, 255, 255, 0.38) 100%);   

    display: flex;  
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.bg};
    border-radius: 10px;
    padding: 20px 10px;
    box-shadow: 0px 5px 6px 3px #555;
`

export const InputWrapper = styled.div`
    // border: 1px solid red;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const InputContainer = styled.div`
    // border: 1px solid blue;
    // align-items: center;
    // justify-content: center;
    
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
export const StyledLabel = styled.label`
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

export const StyledInputSubmit = styled.input.attrs({ type: 'submit' })`
    background: ${props => props.theme.highlight};
    color: ${props => props.theme.textField};
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

export const Column1 = styled.div`
    margin-bottom: 15px;
    padding: 0px 15px;
    grid-area: col1;
    // border: 1px solid red;
`

export const Column2 = styled.div`
    margin-bottom: 15px;
    padding: 0px 15px;
    grid-area: col2;
    // border: 1px solid red;
`

export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;
`

export const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
`

export const Heading = styled.h1`
    margin-bottom: 10px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${props => props.theme.t1};

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`
export const Subtitle = styled.p`
    max-width: 440px;
    font-size: 18px;
    line-height: 24px;
    color: ${props => props.theme.t2};
`

export const DiagonalBox = styled(motion.div)`
    position: absolute;
    // top: 8;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    // transform: skewY(-11deg);
    height: 300px;
    box-shadow: inset 0px 12px 12px -9px #000, inset 0px -12px 12px -7px #000;

    z-index:2;

`