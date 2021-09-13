import React from 'react';
// import { motion } from 'framer-motion';
import { ModalCols, ModalContainer , ModalH1, ModalImage, ModalPanel, ModalTextFrame, TextColumn, ModalLabel, ModalP, InfoColumn} from './ModalElements';

const Modal = ({selectedImg, setSelectedImg }) => {
    
    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    // console.log("modal", selectedImg);

    return (
        // <motion.div className = "backdrop" 
        <ModalContainer className = "backdrop" 
            onClick={handleClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
        >
                <ModalImage 
                    src={selectedImg.downloadURL} 
                    alt="enlarged image"
                    initial={{y: "-100vh"}}
                    animate={{y: "+10vh"}}
                    transition={{ ease: "easeOut", duration: .5 }}
                />
                <ModalPanel>
                    <ModalTextFrame
                        initial={{y: "-100vh"}}
                        animate={{y: "+10vh"}}
                        transition={{ ease: "easeOut", duration: .4 }}>
                        <ModalH1>{selectedImg.title}</ModalH1>
                        <ModalCols>
                            <TextColumn>
                                <ModalLabel>Description:</ModalLabel>
                                <ModalP>{selectedImg.desc}</ModalP>
                            </TextColumn>
                            <InfoColumn>
                                <ModalLabel>Medium:</ModalLabel>
                                <ModalP>{selectedImg.medium}</ModalP>
                                <ModalLabel>Location:</ModalLabel>
                                <ModalP>{selectedImg.location}</ModalP>
                            </InfoColumn>
                        </ModalCols>
                    </ModalTextFrame>
                    </ModalPanel>
        </ModalContainer>
    );
}

export default Modal
