import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState } from 'react'
// import { items } from "./data";
import { 
    Container, 
    GalleryContainer, 
    Heading, 
    Img, 
    ImgContainer, 
    ModalContainer, 
    ModalDescription, 
    ModalInfoWrapper, 
    ModalTitle, 
    Overlay, 
    Paragraph, 
    RouteLink} from './GalleryElements'
import Uploader from "../Uploader";

const Gallery = ({items}) => {
    function Store({ match }) {
        let { id } = match.params;
        const imageHasLoaded = true;
        
        return (
            <>
            <List selectedId={id} />
            <AnimatePresence>
                {id && imageHasLoaded && <Modal id={id} key="item" />}
            </AnimatePresence>
            </>
        );
    }
        
    function Card({id,href}){
        return(
            <ImgContainer layoutId={`img-container-${id}`}>
                <Img src={href}/>
                <RouteLink to={`/photography/${id}`}/>
            </ImgContainer>
        )
    }
    
    function Modal({id}){
        const { href, title, description } = items.find(item => item.id === id);
        return(
            <>
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    style={{ pointerEvents: "none" }}>
                    <ModalContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                        style={{ pointerEvents: "auto" }}>
                        <ImgContainer className="open" layoutId={`img-container-${id}`}>
                            <Img src={href} className="open"/>
                        </ImgContainer>
                        <RouteLink to={`/photography/`}/>
                        <ModalInfoWrapper>
                            <ModalTitle>{title}</ModalTitle>
                            <ModalDescription>{description}</ModalDescription>
                        </ModalInfoWrapper>
                    </ModalContainer>
                </Overlay>
            </>
        )
    }
    
    
    function List({selectedId}){
        return(
            <GalleryContainer layout>        
                {items.map(card => (
                    <Card key ={card.id} {...card} isSelected={card.id === selectedId} />
                    ))}
            </GalleryContainer>
        )
    }
    const [toggleUploader, setToggleUploader] = useState(true)
    return (
        <Container>
            {toggleUploader && <Uploader/>}
            {/* <Heading>3D Art</Heading> */}
            {/* <Paragraph>Check it Out!</Paragraph> */}
            <AnimateSharedLayout type="crossfade">
                <Router>
                    <Route path={["/photography/:id", "/photography/"]} component={Store} />
                </Router>
            </AnimateSharedLayout>
        </Container>
    )
}

export default Gallery
