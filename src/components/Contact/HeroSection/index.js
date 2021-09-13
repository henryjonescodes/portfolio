import React from 'react'
// import SplashVideo from '../../../videos/splashVideo.mp4'
// import {RouteButton as Button} from '../../Common/ButtonElements'
import { 
    HeroContainer,
    HeroBackground,
    // VideoBackground,
    HeroContent,
    HeroH1,
    // HeroP,
    // HeroBtnWrapper,
    // ArrowRight,
    // ArrowForward,
    // DiagonalBox
    } from './HeroSectionElements'

const HeroSection = () => { 
    // const [hover, setHover] = useState(false)

    // const onHover = () => {
    //     setHover(!hover)
    // }

    return (
        <HeroContainer id ="home">
            {/* <DiagonalBox/> */}
            <HeroBackground> 
                {/* <VideoBackground autoPlay loop muted src={SplashVideo} type = 'splashVideo/mp4'/> */}
            </HeroBackground>
            <HeroContent>
                <HeroH1>Hi! Lets get in touch.</HeroH1>
            </HeroContent> 
        </HeroContainer>
    )
}

export default HeroSection
