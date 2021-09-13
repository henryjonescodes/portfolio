import React from 'react';
import emailjs from 'emailjs-com';
import SplashVideo from '../../../videos/TimeAndTemp2.mp4';
// import someImgName from '../../../images/svg-1.svg'
import { FormBackground, 
    FormContainer, 
    PageWrapper, 
    InputContainer, 
    StyledForm, 
    StyledInput, 
    StyledInputField, 
    VideoBackground,
    FormRow, 
    Column1,
    // Column2,
    // ImgWrap,
    // Img,
    StyledLabel,
    StyledInputSubmit,
    InputWrapper,
    // TopLine,
    Heading,
    Subtitle,
    FormWrapper,
    DiagonalBox,
    ShadowBox
} from './ContactFormElements';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../Common/Theme';
import { useTransform, useViewportScroll } from 'framer-motion';


const ContactForm = ({imgStart}) => {
    const { scrollY } = useViewportScroll();
    const y1 = useTransform(scrollY, [0, 1200], [-300, -1000]);
    const y2 = useTransform(scrollY, [0, 1200], [700, 250]);
  
    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_xtijoa7', 'portfolio_contact', e.target, 'user_wHxtrfjBF6IOgUmk1GfaO')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset();
        }

    return (
            <FormContainer>
                <FormBackground>
                    <DiagonalBox/>
                    <VideoBackground 
                        autoPlay loop muted 
                        src={SplashVideo} 
                        type = 'splashVideo/mp4' 
                        style={{top: y1}}/>
                    <ShadowBox/>
                </FormBackground>
                <PageWrapper>
                    <FormRow imgStart = {imgStart} style={{top: y2}}>
                        <ThemeProvider theme={theme}>
                            <Column1>
                                <FormWrapper>
                                    <Heading>Hmmm</Heading>
                                    <Subtitle>Fill out the form and ill get back to you</Subtitle>
                                    <StyledForm onSubmit={sendEmail}>
                                        <InputWrapper>
                                            <InputContainer>
                                                <StyledLabel>Subject</StyledLabel>
                                                <StyledInput type="text" name="subject"/>
                                            </InputContainer>
                                            <InputContainer>
                                                <StyledLabel>Your Name</StyledLabel>
                                                <StyledInput type="text" name="from_name"/>
                                            </InputContainer>
                                            <InputContainer>
                                                <StyledLabel>Your Email</StyledLabel>
                                                <StyledInput type="text" name="reply_to"/>
                                            </InputContainer>
                                            <InputContainer>
                                                <StyledLabel>Message</StyledLabel>
                                                <StyledInputField name="message"/>
                                            </InputContainer>
                                            <StyledInputSubmit type="submit" value="Send" />
                                        </InputWrapper>
                                    </StyledForm>
                                </FormWrapper>
                            </Column1>
                        </ThemeProvider>
                    </FormRow>
                </PageWrapper>
            </FormContainer>
    )
}

export default ContactForm;
