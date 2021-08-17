import React, {useState} from 'react'
import SplashVideo from '../../videos/splashVideo.mp4'
import {Button} from '../ButtonElements'
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

const HeroSection = () => { 
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer>
            <HeroBackground>
                <VideoBackground autoPlay loop muted src={SplashVideo} type = 'splashVideo/mp4'/>
            </HeroBackground>
            <HeroContent>
                <HeroH1>Henry Jones</HeroH1>
                <HeroP>
                    Computer Scientist and 3D Artist
                </HeroP>
                <HeroBtnWrapper>
                    <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover}>
                        Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent> 
        </HeroContainer>
    )
}

export default HeroSection
