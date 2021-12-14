import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import React from 'react'
import { 
    Container, 
    GalleryContainer, 
    Heading, 
    Img, 
    ImgContainer, 
    Paragraph } from './GalleryElements'

function Card({id,href}){
    return(
        <ImgContainer layoutId={`img-container-${id}`}>
            <Img src={href}/>
        </ImgContainer>
    )
}

function List({items}){
    return(
        <GalleryContainer>        
            {items.map(card => (
                <Card key ={card.id} {...card}/>
            ))}
        </GalleryContainer>
    )
}

const Gallery = ({items}) => {
    return (
        <Container>
            <Heading>3D Art</Heading>
            <Paragraph>Check it Out!</Paragraph>
            <List items={items}/>
        </Container>
    )
}

export default Gallery
