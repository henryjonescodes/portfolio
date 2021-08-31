import React from 'react'
import { 
    ServicesContainer,
    ServicesH1,
    ServicesH2,
    ServicesP,
    ServicesCard,
    ServicesIcon,
    ServicesWrapper
    } from './ServicesElements'

const Services = ( {Icon1,Icon2,Icon3}) => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Services</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src ={Icon1}/>
                    <ServicesH2>Service1</ServicesH2>
                    <ServicesP>Heres the text</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src ={Icon2}/>
                    <ServicesH2>Service1</ServicesH2>
                    <ServicesP>Heres the text</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src ={Icon3}/>
                    <ServicesH2>Service1</ServicesH2>
                    <ServicesP>Heres the text</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
