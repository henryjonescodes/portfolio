// import React, {useState} from 'react'
// import ImageBackground from '../components/Common/ImageBackground'
// import LinkBar from '../components/Common/LinkBar'
// import RoutedSideBar from '../components/Common/RoutedSideBar'
// import { theme } from '../components/Photography/theme'
// import Image from '../images/collage.jpg'

import React, {useState} from "react";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MasonryGrid } from "../components/Photography/MasonryGrid";
import { MasonryItem } from "../components/Photography/MasonryItem";

import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  flex: 1 1 100%;
  display: flex;
  justify-content: center;
  padding: 45px 25px;
  /* border: 1px dashed red; */
`

function Store({ match }) {
    let { id } = match.params;
    const imageHasLoaded = true;
  
    return (
      <>
        <MasonryGrid selectedId={id} />
        <AnimatePresence>
          {id && imageHasLoaded && <MasonryItem id={id} key="item" />}
        </AnimatePresence>
      </>
    );
}

const Photography = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/> */}
            {/* <LinkBar toggle = {toggle} title = "Photography" theme = {theme} transparent = {false}/> */}
            {/* <ImageBackground src ={Image}/> */}
            <Container>
                <AnimateSharedLayout type="crossfade">
                    {/* <LinkBar toggle = {toggle} title = "Photography" theme = {theme} transparent = {true}/> */}
                    <Router>
                        <Route path={["/photography/:id", "/photography/"]} component={Store} />
                    </Router>
                </AnimateSharedLayout>
            </Container>
        </>
    )
}

export default Photography