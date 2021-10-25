import React from 'react'
import { ContentWrapper, ProgressBarPanel, StyledBarWrapper, StyledProgressPercentage, StyledProgressText } from './ProgressBarElements'

const ProgressBar = ({value, max, text}) => {
    return (
        <>
            <ProgressBarPanel>
                <ContentWrapper>
                    <StyledBarWrapper>                
                        <progress value= {value} max ={max}/>
                        <StyledProgressPercentage>{value}%</StyledProgressPercentage>
                    </StyledBarWrapper>
                    <StyledProgressText>{text}</StyledProgressText>
                </ContentWrapper>
            </ProgressBarPanel>
        </>
    )
}

export default ProgressBar
