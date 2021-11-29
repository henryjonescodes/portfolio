import React from 'react'
import { CardOpenLink, Container, ExpandIcon, ImageDetails, ImageGallery, Img, MotionCard, PageContainer } from './GalleryPageElements'
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route } from "react-router-dom";
function Card({id,href,aspect}){
    return(
        <div key = {id}>
            <MotionCard aspect={aspect}>
                <Img href ={href} aspect={aspect}/>
                <ImageDetails/>
            </MotionCard>
        </div>
    )
}

function Store({ match }) {
    let { id } = match.params;
    const imageHasLoaded = true;
  
    return (
      <>
        <MotionCard key = {id} className="open"></MotionCard>
      </>
    )
}
const GalleryPage = () => {

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
    ]
    let keys = []
    items.forEach(item => (keys.push(item.id)))
    console.log(keys)
    const breakpoints = {
        default: 2,
        1100: 2,
        700: 1
    }

    function setupImage(card){
        let aspect = 100
        switch(card.aspect){
            case "landscape":
                aspect = 50;
                break;
            case "portrait":
                aspect = 130;
                break;
            default:
                break;
        }
        return  <MotionCard key = {card.id}>
                    {/* <MotionCard key = {card.id}> */}
                        <Img href ={card.href} aspect={aspect}/>
                        <ImageDetails to={`/photography/${card.id}`}/>
                    {/* </MotionCard> */}
                </MotionCard>
    }

    return (
        <PageContainer>
            <Container>
                <ImageGallery 
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                    {items.map(card => setupImage(card))}
                </ImageGallery>
                <AnimateSharedLayout type="crossfade">
                    <Router>
                        <Route path={["/about/:id", "/about/"]} component={Store} />
                    </Router>
                </AnimateSharedLayout>
            </Container>
        </PageContainer>
    )
}

export default GalleryPage
