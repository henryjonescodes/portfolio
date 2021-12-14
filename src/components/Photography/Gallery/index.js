import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { 
    Container, 
    GalleryContainer, 
    Heading, 
    Img, 
    ImgContainer, 
    Paragraph } from './GalleryElements'

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
            <Link to={`/photography/${id}`} className={`card-open-link`} />
        </ImgContainer>
    )
}

function Modal({id}){
    const href ="images/c.jpg"
    const [isOpen, setIsOpen] = useState(false)
    return(
        <ImgContainer className="open" layoutId={`img-container-${id}`}>
            <Img src={href}/>
        </ImgContainer>
    )
}


function List({items, selectedId}){
    return(
        <AnimateSharedLayout>
            <GalleryContainer layout>        
                {items.map(card => (
                    <Card key ={card.id} href={card.href}/>
                    ))}
            </GalleryContainer>
        </AnimateSharedLayout>
    )
}

const Gallery = ({items}) => {
    return (
        <Container>
            <Heading>3D Art</Heading>
            <Paragraph>Check it Out!</Paragraph>
            <List items={items}/>
            {/* <Modal href={"images/c.jpg"} id={"3"}/> */}
        </Container>
    )
}

export default Gallery
