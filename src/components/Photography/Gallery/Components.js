import React from 'react'
import { GalleryContainer, Img, ImgContainer, OverLay, RouteLink } from './GalleryElements'

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

function Card({id,href}){
    return(
        <ImgContainer layoutId={`img-container-${id}`}>
            <RouteLink to={`/photography/${id}`} className={`card-open-link`} />
            <Img src={href}/>
        </ImgContainer>
    )
}

export function Item({id}){
    const entry = items.find(item => item.id === id);
    const href = "images/c.jpg"
    return(
        <>
            <OverLay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, delay: 0.15 }}
                style={{ pointerEvents: "auto" }}
                className="overlay">
                <RouteLink to ="/photography/"/>
            </OverLay>
            <ImgContainer className='open' layoutId={`img-container-${id}`}>
                <Img src ={href} className="open" />
            </ImgContainer>
        </>
    )
}
export function List({id}){
    return(
        <GalleryContainer>        
            {items.map(card => (
                <Card key ={card.id} {...card} isSelected={card.id == id}/>
            ))}
        </GalleryContainer>
    )
}