import React from 'react'
import { ImageContainer, ImageSubtitle, ImageText, PageWrapper, TextWrapper } from './ImageBackgroundElements'

const ImageBackground = ({src}) => {
    return (
        <>
            <PageWrapper>
                <ImageContainer src = {src}/>
            </PageWrapper>
            <TextWrapper>
                <ImageText>Coming Soon!</ImageText>
                <ImageSubtitle>I'm still working on this one, check back soon!</ImageSubtitle>
            </TextWrapper>
        </>
    )
}

export default ImageBackground
