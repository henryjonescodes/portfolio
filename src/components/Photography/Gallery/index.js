import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import React from 'react'
import { Item, List } from './Components'
import { Container, GalleryContainer, Heading, Img, ImgContainer, Paragraph } from './GalleryElements'
import { BrowserRouter as Router, Route } from "react-router-dom";

function Store({ match }) {
    let { id } = match.params;
    const imageHasLoaded = true;
  
    return (
      <>
        <List id={id} />
        <AnimatePresence>
          {id && imageHasLoaded && <Item id={id} key="item" />}
        </AnimatePresence>
      </>
    );
  }

const Gallery = () => {
    let items = [
        {
            id: "1",
            href: "images/a.jpg",
            aspect: "portrait"
        },
        {
            id: "2",
            href: "images/b.jpg",
            aspect: "landscape"
        },
        {
            id: "3",
            href: "images/c.jpg",
            aspect: "landscape"
        },
        {
            id: "4",
            href: "images/d.jpg",
            aspect: "portrait"
        },
        {
            id: "5",
            href: "images/e.jpg",
            aspect: "portrait"
        },
        {
            id: "6",
            href: "images/f.jpg",
            aspect: "landscape"
        },
        {
            id: "7",
            href: "images/g.jpg",
            aspect: "landscape"
        },
        {
            id: "8",
            href: "images/h.jpg",
            aspect: "portrait"
        },
        {
            id: "9",
            href: "images/a.jpg",
            aspect: "portrait"
        },
        {
            id: "10",
            href: "images/b.jpg",
            aspect: "landscape"
        },
        {
            id: "11",
            href: "images/c.jpg",
            aspect: "landscape"
        },
        {
            id: "12",
            href: "images/d.jpg",
            aspect: "portrait"
        },
        {
            id: "13",
            href: "images/e.jpg",
            aspect: "portrait"
        },
        {
            id: "14",
            href: "images/f.jpg",
            aspect: "landscape"
        },
        {
            id: "15",
            href: "images/g.jpg",
            aspect: "landscape"
        },
        {
            id: "16",
            href: "images/h.jpg",
            aspect: "portrait"
        },
    ]

    function setupImage(card){
        return (
            <ImgContainer key ={card.id}>
                <Img src ={card.href}/>
            </ImgContainer>
            )
    }

    return (
        <Container>
            <Heading>3D Art</Heading>
            <Paragraph>Check it Out!</Paragraph>
            {/* <List/> */}
            <AnimateSharedLayout type="crossfade">
                <Router>
                    <Route path={["/photography/:id", "/photography/"]} component={Store} />
                </Router>
            </AnimateSharedLayout>
        </Container>
    )
}

export default Gallery
