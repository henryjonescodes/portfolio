import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import LinkBar from '../LinkBar'
import RoutedSideBar from '../RoutedSideBar'
import SimpleImageSlider from "react-simple-image-slider";
import { 
    TextRow, 
    Blurb, 
    Content, 
    DateBox, 
    Dateline, 
    DetailList, 
    DetailListItem, 
    Heading, 
    PageWrapper, 
    TextBox, 
    TextContainer, 
    TitleContainer, 
    TopLine, 
    Button, 
    ArrowForward, 
    ArrowRight 
} from './DetailPageElements'
import { theme } from './theme'
import { items } from "../../About/data";

const DetailPage = ({id, lightcolor}) => {
    const [isOpen, setIsOpen] = useState(false)

    let category = "no category found"
    let title = "no title found"  
    // let url = "url not found"
    let dateline = "no dateline found"
    let blurb = "lorem ipsum"
    let linkDestination, linkText = null;
    let list, itemlist = null
    let highlightColor = null;
    let imageList = [];

    if(items.find(item => item.id === id)){
        let entry = items.find(item => item.id === id)
        category = entry.category;
        title = entry.title;
        // url = entry.url[0].url;
        imageList = entry.url;
        list = entry.list;
        dateline = entry.dateline;
        blurb = entry.blurb
        highlightColor = entry.highlightColor
        if(entry.linkDestination !== ""){
            linkDestination = entry.linkDestination;
            linkText = entry.linkText;
        }
    }
    
    function splitBlurb(blurb){
        const arr = blurb.split("^")
        let out = []
        let key = 0
        arr.forEach(block => {
            key+= 1;
            out.push(<Blurb lightcolor = {lightcolor} key={key}>{block}</Blurb>)
        })
        return out
    }

    if(list != null){
        itemlist = list.map((item,index) =>{
          return <DetailListItem key={index} lightcolor = {lightcolor}>{item}</DetailListItem>
        })
    }
    
    
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }
    return (
        <>
        <PageWrapper>
            <ThemeProvider theme={theme}>
                <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
                <LinkBar toggle = {toggle} title = "Home" theme = {theme} transparent={true}/>
                <TitleContainer>
                    <SimpleImageSlider
                        width={'100%'}
                        height={'100%'}
                        images={imageList}
                        style={{zIndex:-1}}
                        showBullets={false}
                        showNavs={false}
                        autoPlay={true}
                        autoPlayDelay={4}
                        slideDuration={3}
                    />
                    {/* <BackgroundImage src ={url}/> */}
                    <TextRow>
                        <TextBox highlight={highlightColor} lightcolor = {lightcolor}>
                            <TopLine lightcolor = {lightcolor}>{category}</TopLine>
                            <Heading lightcolor = {lightcolor}>{title}</Heading>
                        </TextBox>
                    </TextRow>
                    <TextRow>
                        <DateBox highlight={highlightColor} lightcolor = {lightcolor}>
                            <Dateline lightcolor = {lightcolor}>{dateline}</Dateline>
                        </DateBox>
                    </TextRow>
                </TitleContainer>
                <Content lightcolor = {lightcolor}>
                    <TextContainer>
                        <TopLine lightcolor = {lightcolor}>Summary</TopLine>
                        {splitBlurb(blurb)}
                        <TopLine lightcolor = {lightcolor}>Roles | Experience</TopLine>
                        <DetailList>
                            {itemlist}
                        </DetailList>
                        {linkDestination != null &&
                            <Button 
                            href={linkDestination}
                            onMouseEnter={onHover} 
                            onMouseLeave={onHover}
                            highlight={highlightColor}
                            >
                                {linkText}
                                {hover ? <ArrowForward /> : <ArrowRight />}
                            </Button>
                        }
                    </TextContainer>
                </Content>
            </ThemeProvider>
        </PageWrapper>
        </>
    )
}

export default DetailPage
