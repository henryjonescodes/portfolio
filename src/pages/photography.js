// import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import React, {useState} from 'react'
// import { BrowserRouter as Router, Route } from "react-router-dom";
import ImageBackground from '../components/Common/ImageBackground'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
// import { Container } from '../components/Photography/MasonryGrid/MasonryElements'
// import { MasonryGrid } from '../components/Photography/MasonryGrid/MasonryGrid'
// import { MasonryItem } from '../components/Photography/MasonryGrid/MasonryItem'
import { theme } from '../components/Photography/theme'
// import {useInstagram} from '../hooks/useInstagram'

// function Store({ match }) {
//     let { id } = match.params;
//     const imageHasLoaded = true;
  
//     return (
//       <>
//         <MasonryGrid selectedId={id} />
//         <AnimatePresence>
//           {id && imageHasLoaded && <MasonryItem id={id} key="item" />}
//         </AnimatePresence>
//       </>
//     );
// }

const Photography = () => {
    const [isOpen, setIsOpen] = useState(false)

    // const gram = useInstagram()
    // console.log(gram)


    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "Photography" theme = {theme} transparent = {true}/>
            <ImageBackground 
                src ={'/images/photography/collage.jpg'}
                message={"Coming Soon!"}
                subtitle={"I'm still working on this one, check back soon!"}
                />
            {/* <Container>
                <AnimateSharedLayout type="crossfade">
                    <Router>
                        <Route path={["/photography/:id", "/photography/"]} component={Store} />
                    </Router>
                </AnimateSharedLayout>
            </Container> */}
        </>
    )
}

export default Photography