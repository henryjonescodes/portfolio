import React from 'react';
import emailjs from 'emailjs-com';
import SplashVideo from '../../../videos/TimeAndTemp3.mp4';
import { ThemeProvider } from 'styled-components';
import { useTransform, useViewportScroll } from 'framer-motion';

import { 
    StyledInput,
    StyledInputField,
    StyledInputSubmit,
    StyledInputLabel,
    StyledInputHeading,
    StyledInputSubtitle
} from '../../Common/FormElements';
import { 
    FormBackground, 
    FormContainer, 
    FormPageContainer, 
    FormWrapper, 
    InputContainer, 
    InputWrapper, 
    PageWrapper, 
    ShadowBox, 
    StyledForm, 
    VideoBackground,
    VideoOffsetter 
} from './ContactFormElements';

const ContactForm = ({theme}) => {
    const { scrollY } = useViewportScroll();
    const y1 = useTransform(scrollY, [0, 1200], [-300, -900]);
    const y2 = useTransform(scrollY, [0, 800], [200, 0]);
    
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
        <ThemeProvider theme = {theme}>
            <FormPageContainer>
                <FormBackground>
                    {/* <DiagonalBox/> */}
                    <VideoOffsetter style={{top: y1}}>
                        <VideoBackground
                            autoPlay loop muted 
                            src={SplashVideo} 
                            type = 'splashVideo/mp4'/>
                        <ShadowBox/>
                    </VideoOffsetter>
                </FormBackground>
                <PageWrapper>
                    <FormContainer style={{top: y2}}>
                        <FormWrapper>
                            <StyledInputHeading>Contact Me</StyledInputHeading>
                            <StyledInputSubtitle>Fill out the form and ill get back to you</StyledInputSubtitle>
                            <StyledForm onSubmit={sendEmail}>
                                <InputWrapper>
                                    <InputContainer>
                                        <StyledInputLabel>Subject</StyledInputLabel>
                                        <StyledInput type="text" name="subject"/>
                                    </InputContainer>
                                    <InputContainer>
                                        <StyledInputLabel>Your Name</StyledInputLabel>
                                        <StyledInput type="text" name="from_name"/>
                                    </InputContainer>
                                    <InputContainer>
                                        <StyledInputLabel>Your Email</StyledInputLabel>
                                        <StyledInput type="text" name="reply_to"/>
                                    </InputContainer>
                                    <InputContainer>
                                        <StyledInputLabel>Message</StyledInputLabel>
                                        <StyledInputField name="message"/>
                                    </InputContainer>
                                    <StyledInputSubmit type="submit" value="Send" />
                                </InputWrapper>
                            </StyledForm>
                        </FormWrapper>
                    </FormContainer>
                </PageWrapper>
            </FormPageContainer>
       </ThemeProvider>
    )
}

export default ContactForm
 