import React, { useState } from 'react'
import { items, validIds } from "../../About/data";
import { 
    CardContent, 
    CardContentContainer, 
    CardImageContainer, 
    ContentContainer, 
    Overlay, 
    TitleContainer,
    Category,
    StyledH2,
    CardImage,
    CardOpenLink,
    DetailList,
    DetailListItem,
    Gradient,
    TitleTextWrapper,
    OverlayButton,
    ArrowForward,
    ArrowRight
} from './MasonryElements';

export function MasonryItem({id}) {

  const [hover, setHover] = useState(false)

  const onHover = () => {
      setHover(!hover)
  }

  let category = "no category found"
  let title = "no title found"  
  let url = "url not found"
  let dateline = "no dateline found"
  let buttonText, buttonDestination = null;
  let list, itemlist = null

  if(validIds.includes(id)){
    let entry = items.find(item => item.id === id)
    category = entry.category;
    title = entry.title;
    url = entry.url[0].url;
    list = entry.list;
    dateline = entry.dateline;

    if(entry.buttonText !== ""){
      buttonText = entry.buttonText;
      buttonDestination = entry.buttonDestination;
    }
  }
  
  if(list != null){
    itemlist = list.map((item,index) =>{
      return <DetailListItem key={index}>{item}</DetailListItem>
    })
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
      </Overlay>
      <CardContentContainer className="open">
      <CardOpenLink to="/about" className="open"/>
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
              src={url} 
              alt="" />
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
                <Category>{category}</Category>
                <StyledH2>{title}</StyledH2>
                <Category>{dateline}</Category>
              </TitleContainer>
              {buttonText != null && 
                <OverlayButton 
                href={buttonDestination}
                onMouseEnter={onHover} 
                onMouseLeave={onHover}
                >
                  {buttonText}
                  {hover ? <ArrowForward /> : <ArrowRight />}
                </OverlayButton>}
            </TitleTextWrapper>
            <DetailList>
              {itemlist}
            </DetailList>
          </ContentContainer>
        </CardContent>
      </CardContentContainer>
    </>
  );
}
