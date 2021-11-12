import React from 'react'
import { IconContext } from 'react-icons/lib'
import { ThemeProvider } from 'styled-components'
import { 
    ContentWrapper,
    ImgButton,
    Label,
    Img,
    BarContainer
} from './SkillTrackerElements'

const SkillTracker = ({text, src, alt, theme, dest, scale, lightcolor}) => {

    return (
        <>
            <IconContext.Provider value = {{color: "#d4af37"}}>
                <ThemeProvider theme = {theme}>
                    <ContentWrapper>
                        <ImgButton
                            scale={scale}
                            href={dest} 
                            target="_black" 
                            aria-label={alt}
                            whileHover={{ scale: 1.2, rotate: 5 }}>
                            <Img src={src} alt={alt}/>
                        </ImgButton>
                        <BarContainer>
                            <Label lightcolor={lightcolor}>{text}</Label>
                        </BarContainer>
                    </ContentWrapper>
                </ThemeProvider>
            </IconContext.Provider>
        </>
    )
}

export default SkillTracker
