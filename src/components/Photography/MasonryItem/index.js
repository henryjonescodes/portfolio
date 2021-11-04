import React from 'react'
import { LoremIpsum } from "react-lorem-ipsum";
import { items, validIds } from "../data";
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
    CardOpenLink
} from '../MasonryElements';

export function MasonryItem({id}) {
//   const { category, title } = items.find(item => item.id === id);
  let category = "no category found"
  let title = "no title found"  
  let url = "url not found"
  if(validIds.includes(id)){
    let entry = items.find(item => item.id === id)
    category = entry.category;
    title = entry.title;
    url = entry.url;
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
            <CardImage 
                className="open" 
                src={url} 
                // src={`textures/BugLight/BugLight.png`} 
                alt="" />
          </CardImageContainer>
          <TitleContainer
            className="open"
            layoutId={`title-container-${id}`}
          >
            <Category>{category}</Category>
            <StyledH2>{title}</StyledH2>
          </TitleContainer>
          <ContentContainer 
            className="open" 
            animate
          >
            <LoremIpsum
              p={6}
              avgWordsPerSentence={6}
              avgSentencesPerParagraph={4}
            />
          </ContentContainer>
        </CardContent>
      </CardContentContainer>
    </>
  );
}
