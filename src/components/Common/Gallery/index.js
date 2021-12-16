import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState } from 'react'
import { 
    Container, 
    GalleryContainer, 
    Img, 
    ImgContainer, 
    ModalContainer, 
    ModalDescription, 
    ModalInfoWrapper, 
    ModalTitle, 
    Overlay, 
    RouteLink} from './GalleryElements'
import Uploader from "../Uploader";
import useFirestore from '../../../hooks/useFirestore';

const Gallery = ({routepath, collection}) => {
    const [toggleUploader] = useState(false)
    const { docs } = useFirestore(collection)
    let items = docs;
    items.sort((a,b) => (parseInt(a.key) < parseInt(b.key)) ? 1 : ((parseInt(b.key) < parseInt(a.key)) ? -1 : 0)); 
    console.log(collection, items)
    
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
                <RouteLink to={`/${routepath}/${id}`}/>
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
                        <RouteLink to={`/${routepath}/`}/>
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
    return (
        <Container>
            {toggleUploader && <Uploader collection={collection}/>}
            {/* <Heading>3D Art</Heading> */}
            {/* <Paragraph>Check it Out!</Paragraph> */}
            <AnimateSharedLayout type="crossfade">
                <Router>
                    <Route path={[`/${routepath}/:id`, `/${routepath}/`]} component={Store} />
                </Router>
            </AnimateSharedLayout>
        </Container>
    )
}

export default Gallery
