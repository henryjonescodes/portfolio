import React, { useState } from 'react'
import { items } from "../../About/data";
import { 
    CardContent, 
    CardContentContainer, 
    CardImageContainer, 
    ContentContainer, 
    Overlay, 
    TitleContainer,
    Category,
    // StyledH2,
    CardImage,
    CardOpenLink,
    // DetailList,
    // DetailListItem,
    Gradient,
    TitleTextWrapper,
    OverlayButton,
    // ButtonContainer,
    ArrowForward,
    ArrowRight
} from './MasonryElements';

export function MasonryItem({id}) {

  const [hover, setHover] = useState(false)

  const onHover = () => {
      setHover(!hover)
  }

  let caption = "no caption found"
  // let id = "no id found"  
  let url = "url not found"
  let thumbnail = "url not found"
  let buttonText = "Go To Post";

  if(true){
    let entry = items.find(item => item.id === id)
    caption = entry.caption;
    // id = entry.id;
    url = entry.url;
    thumbnail = entry.thumbnail;
  }

  return (
    <>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
      >
        {/* <CardOpenLink to="/" className="open"/> */}
      </Overlay>
      <CardContentContainer className="open">
      <CardOpenLink to="/photography" className="open"/>
        <CardContent 
        className="open" 
        layoutId={`card-container-${id}`}
        >
          <CardImageContainer
            className="open" 
            layoutId={`card-image-container-${id}`}
          >
            <Gradient  className="open"/>
            <CardImage 
              className="open" 
              src={thumbnail} 
              alt={caption} />
          </CardImageContainer>
          <ContentContainer 
            className="open" 
            animate
          >
            <TitleTextWrapper>
              <TitleContainer
                className="open"
                layoutId={`title-container-${id}`}
              >
                <Category>{caption}</Category>
              </TitleContainer>
              {buttonText != null && 
                <OverlayButton 
                href={url}
                onMouseEnter={onHover} 
                onMouseLeave={onHover}
                >
                  {buttonText}
                  {hover ? <ArrowForward /> : <ArrowRight />}
                </OverlayButton>}
            </TitleTextWrapper>
          </ContentContainer>
        </CardContent>
      </CardContentContainer>
    </>
  );
}
