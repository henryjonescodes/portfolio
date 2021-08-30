import React, {useState} from 'react'
// import SplashVideo from '../../videos/splashVideo.mp4'
import {RouteButton as Button} from '../ButtonElements'
import ThreeDBackground from '../ThreeDBackground'

import { 
    HeroContainer,
    HeroBackground,
    // VideoBackground,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowRight,
    ArrowForward
    } from './ThreeDPanelElements'

const ThreeDPanel = () => { 
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer id ="home">
            <HeroBackground>
                <ThreeDBackground/>
            </HeroBackground>
            {/* <HeroContent>
                <HeroH1>Henry Jones</HeroH1>
                <HeroP>
                    Computer Scientist and 3D Artist
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                        onMouseEnter={onHover} onMouseLeave={onHover}
                        primary ="true"
                        big = "true"
                        fontBig = "true"
                        dark = "true"
                        to = 'about'
                    >
                        Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>  */}
        </HeroContainer>
    )
}

export default ThreeDPanel
