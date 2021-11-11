import React, { useState } from 'react'
import { ArrowForward, ArrowRight, Blurb, Button, ImageContainer, ImageSubtitle, ImageText, PageWrapper, TextWrapper } from './ImageBackgroundElements'

const ImageBackground = ({src, message, subtitle, buttonDestination, buttonText, blurb}) => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    let buttonDest,blurbText = null;
    if(buttonDestination !== ""){
        buttonDest = buttonDestination;
    }
    if(blurb !== ""){
        blurbText = blurb;
    }

    return (
        <>
            <PageWrapper>
                <ImageContainer src = {src}/>
            </PageWrapper>
            <TextWrapper>
                <ImageText>{message}</ImageText>
                <ImageSubtitle>{subtitle}</ImageSubtitle>
                {buttonDest != null &&
                    <Button 
                    href={buttonDest}
                    onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                    >
                        {buttonText}
                        {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                }
                {blurbText != null &&
                    <Blurb>{blurbText}</Blurb>
                }
                {/* <ImageSubtitle>I'm still working on this one, check back soon!</ImageSubtitle> */}
            </TextWrapper>
        </>
    )
}

export default ImageBackground
