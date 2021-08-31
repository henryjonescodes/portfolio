import React from 'react';
// import { motion } from 'framer-motion';
import { ModalContainer , ModalImage} from './ModalElements';

const Modal = ({selectedImg, setSelectedImg }) => {
    
    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    return (
        // <motion.div className = "backdrop" 
        <ModalContainer className = "backdrop" 
            onClick={handleClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
        >
            <ModalImage 
                src={selectedImg} 
                alt="enlarged image"
                initial={{y: "-100vh"}}
                animate={{y: "0vh"}}
                transition={{ ease: "easeOut", duration: .5 }}
            />
        </ModalContainer>
    );
}

export default Modal
