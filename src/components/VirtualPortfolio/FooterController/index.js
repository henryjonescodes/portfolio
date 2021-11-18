import React, { useState } from 'react'
import { ArrowBack, ArrowForward, ArrowLeft, ArrowRight, Button, ButtonContainer, Footer } from './FooterControllerElements'

const FooterController = ({nav}) => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }
    const [hover2, setHover2] = useState(false)

    const onHover2 = () => {
        setHover2(!hover2)
    }

    function sendForward(){
        nav("forward")
    }
    function sendBack(){
        nav("back")
    }
    return (
        <Footer>
           <ButtonContainer>
            <Button 
                onMouseEnter={onHover2} 
                onMouseLeave={onHover2}
                onClick={sendBack}
                >
                    {hover2 ? <ArrowBack /> : <ArrowLeft />}
                    Go Back
            </Button>
            </ButtonContainer>
            <ButtonContainer>
            <Button 
                onMouseEnter={onHover} 
                onMouseLeave={onHover}
                onClick={sendForward}
                >
                    Go Forward
                    {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
            </ButtonContainer>
       </Footer>
    )
}

export default FooterController
