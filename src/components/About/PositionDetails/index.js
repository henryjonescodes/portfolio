import React from 'react'
import { ThemeProvider } from 'styled-components'
import { List, ListItem, ListText, PositionContainer, PositionWrapper, SubtitleItalic, SubtitleUpperCase, TextContainer, Title, UpperCaseLine, Img, Gradient} from './PositionDetailsElements'

const PositionDetails = ({theme, lightcolor, heading, caption, timeline, posts, img}) => {
    let items = posts

    return (
        <ThemeProvider theme={theme}>
            <PositionWrapper>
                <PositionContainer 
                    lightcolor = {lightcolor} 
                    whileHover={{ scale: 1.05}}>
                    <Gradient lightcolor = {lightcolor}/>
                    <Img src = {img}/>
                    <TextContainer>
                        <SubtitleUpperCase lightcolor = {lightcolor}>{caption}</SubtitleUpperCase>
                        <UpperCaseLine lightcolor = {lightcolor}>{heading}</UpperCaseLine>
                        <SubtitleItalic lightcolor = {lightcolor}>{timeline}</SubtitleItalic>
                    </TextContainer>
                    <TextContainer>
                        <List>
                            {items.map(({ id, title, body }) => (
                                <ListItem key ={id} lightcolor = {lightcolor}>
                                    <Title lightcolor = {lightcolor}>{title}</Title>
                                    <ListText lightcolor = {lightcolor}>{body}</ListText>
                                </ListItem>
                            ))}
                        </List>
                    </TextContainer>
                </PositionContainer>
            </PositionWrapper>
        </ThemeProvider>
    )
}

export default PositionDetails
