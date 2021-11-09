import React from 'react'
import { items } from "../../About/data";
// import {useInstagram} from '../../../hooks/useInstagram'
import { 
    Card, 
    CardContent, 
    CardContentContainer, 
    CardImage, 
    CardImageContainer,
    CardList,
    CardOpenLink,
    Category,
    Gradient,
    StyledH2,
    TitleContainer
} from './MasonryElements';

function MasonryCard({ caption, id, url, thumbnail}) {
    return (
    <Card>
      <CardContentContainer>
      <CardOpenLink to={`/photography/${id}`}/>
        <CardContent layoutId={`card-container-${id}`}>
          <CardImageContainer layoutId={`card-image-container-${id}`} >
            <Gradient/>
            <CardImage 
                src={url} 
                alt={caption} 
            />
          </CardImageContainer>
          <TitleContainer layoutId={`title-container-${id}`}>
            <Category>{caption}</Category>
          </TitleContainer>
        </CardContent>
      </CardContentContainer>
    </Card>
  );
}

export function MasonryGrid({ selectedId }) {

  // const items = useInstagram()
  // console.log(items)
  return (
    <CardList>
      {items.map(card => (
        <MasonryCard key={card.id} {...card} isSelected={card.id === selectedId} />
      ))}
    </CardList>
  );
}
