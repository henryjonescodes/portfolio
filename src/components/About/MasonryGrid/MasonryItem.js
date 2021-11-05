import React from 'react'
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
    Gradient
} from './MasonryElements';

export function MasonryItem({id}) {
//   const { category, title } = items.find(item => item.id === id);
  let category = "no category found"
  let title = "no title found"  
  let url = "url not found"
  let list, itemlist = null
  if(validIds.includes(id)){
    let entry = items.find(item => item.id === id)
    category = entry.category;
    title = entry.title;
    url = entry.url;
    list = entry.list;
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
        {/* <CardOpenLink to="/" className="open"/> */}
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
                // src={`textures/BugLight/BugLight.png`} 
                alt="" />
          </CardImageContainer>
          <TitleContainer
            className="open"
            layoutId={`title-container-${id}`}
          >
            {/* <Category style={{ fontSize: '22px' }}>{category}</Category> */}
            <Category>{category}</Category>
            {/* <StyledH2 style={{ fontSize: '36px' }}>{title}</StyledH2> */}
            <StyledH2>{title}</StyledH2>
          </TitleContainer>
          <ContentContainer 
            className="open" 
            animate
          >
            <DetailList>
                {itemlist}
            </DetailList>
          </ContentContainer>
        </CardContent>
      </CardContentContainer>
    </>
  );
}
