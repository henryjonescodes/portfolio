import React from 'react'
import { items } from "../../About/data";
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

function MasonryCard({ id, title, category, url}) {
    return (
    <Card>
      <CardContentContainer>
      <CardOpenLink to={`/about/${id}`}/>
        <CardContent layoutId={`card-container-${id}`}>
          <CardImageContainer layoutId={`card-image-container-${id}`} >
            <Gradient/>
            <CardImage 
                src={url} 
                // src={`textures/BugLight/BugLight.png`} 
                alt="" 
            />
          </CardImageContainer>
          <TitleContainer layoutId={`title-container-${id}`}>
            <Category>{category}</Category>
            <StyledH2>{title}</StyledH2>
          </TitleContainer>
        </CardContent>
      </CardContentContainer>
    </Card>
  );
}

export function MasonryGrid({ selectedId }) {
  return (
    <CardList>
      {items.map(card => (
        <MasonryCard key={card.id} {...card} isSelected={card.id === selectedId} />
      ))}
    </CardList>
  );
}
