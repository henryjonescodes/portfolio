import React, {useState} from 'react'
import {RouteButton as Button} from '../../Common/ButtonElements'
import { ThemeProvider } from 'styled-components'
import { 
    HeroContainer,
    HeroBackground,
    VideoBackground,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowRight,
    ArrowForward
    } from './HeroSectionElements'

const HeroSection = ({theme, to}) => { 
    const [hover, setHover] = useState(false)

    let buttonMessage = "About Me"

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <ThemeProvider theme={theme}>
            <HeroContainer id ="home">
                <HeroBackground>
                    <VideoBackground autoPlay loop muted src='/videos/splashVideo.mp4' type = 'splashVideo/mp4'/>
                </HeroBackground>
                <HeroContent>
                    <HeroH1>Henry Jones</HeroH1>
                    <HeroP>
                        Computer Scientist and 3D Artist
                    </HeroP>
                    <HeroBtnWrapper>
                        <Button 
                            onMouseEnter={onHover} onMouseLeave={onHover}
                            big = "true"
                            fontbig = "true"
                            to={to}
                        >
                            {buttonMessage}{hover ? <ArrowForward /> : <ArrowRight />}
                        </Button>
                    </HeroBtnWrapper>
                </HeroContent> 
            </HeroContainer>
        </ThemeProvider>
    )
}

export default HeroSection
