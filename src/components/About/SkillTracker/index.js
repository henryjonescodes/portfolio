import React from 'react'
import { FaStar } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { ThemeProvider } from 'styled-components'
import { 
    ContentWrapper,
    ImgButton,
    Label,
    StarContainer,
    StarsContainer,
    StyledBarWrapper, 
    Img,
    BarContainer
} from './SkillTrackerElements'

const SkillTracker = ({value, max, text, src, alt, theme, dest, scale, lightcolor}) => {
    let stars = (value/max) * 5;

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
                            <StyledBarWrapper>                
                                <progress value= {value} max ={max}/>
                            </StyledBarWrapper>
                            <StarsContainer>
                                {stars >= 1 &&  
                                    <StarContainer>
                                        <FaStar/>
                                    </StarContainer>
                                }
                                {stars >= 2 &&  
                                    <StarContainer>
                                        <FaStar/>
                                    </StarContainer>
                                }
                                {stars >= 3 &&  
                                    <StarContainer>
                                        <FaStar/>
                                    </StarContainer>
                                }
                                {stars >= 4 &&  
                                    <StarContainer>
                                        <FaStar/>
                                    </StarContainer>
                                }
                                {stars >= 5 &&  
                                    <StarContainer>
                                        <FaStar/>
                                    </StarContainer>
                                }
                            </StarsContainer>
                        </BarContainer>
                    </ContentWrapper>
                </ThemeProvider>
            </IconContext.Provider>
        </>
    )
}

export default SkillTracker
