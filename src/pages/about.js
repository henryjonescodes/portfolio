//Node
import React, {useState, useEffect} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useTransform, useViewportScroll} from 'framer-motion';


import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MasonryGrid } from "../components/About/MasonryGrid/MasonryGrid";
import { MasonryItem } from "../components/About/MasonryGrid/MasonryItem";

//Local
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/About/theme'
import Footer from '../components/Common/Footer'


import { 
    FourBox, 
    Content, 
    CSSVariables, 
    DiagonalDiv, 
    TwoBox,
    Heading,
    // StyledLabel,
    // Img,
    PageHeading,
    HeaderSkew,
    TopLine,
    Boxes,
    EightBox,
    SixBox,
    Subtitle,
    HeadingBox,
    HeadingSideText,
    HeadingSideBox,
    Sepparator,
    // SkillsText,
    DetailContainer,
    // Img,
    DiagonalBreak,
    ScrollLink,
    DiagonalButton,
    FinalDiv,
} from '../components/About/diagonalDivs'
import SkillTracker from '../components/About/SkillTracker'
import DetailPanel from '../components/About/DetailPanel';
import IconList from '../components/About/IconList';
import { Container } from '../components/About/MasonryGrid/MasonryElements';

export const pageWrapper = styled.div`
    min-width: 650px;
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

const About = () => {

    const [isOpen, setIsOpen] = useState(false)
    let { scrollY } = useViewportScroll();
    // scrollY.set(0);

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
   
    const motionPoints = {
        stop1: -560,
        stop2: -750,
        stop3: -920,
        stop4: -2200,
        stop5: -2390,
        resize1: "600px",
        scrollPoint: 200,
        storedPoint: 0
    }

    if(sizes.width <= 700){
        scrollY.set(motionPoints.scrollPoint);
    }

    useEffect(function setupListener() {
        function handleResize() {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            sizes.storedPoint=scrollY.get();
            if(window.innerWidth <= 700){
                scrollY.set(motionPoints.scrollPoint);
            }
        }
        window.addEventListener('resize', handleResize)
    
        return function cleanupListener() {
          window.removeEventListener('resize', handleResize)
        }
    })

    useEffect(function setupListener() {
        function handleScroll() {
            if(sizes.width <= 700){
                scrollY.set(motionPoints.scrollPoint);
            }
        }
        window.addEventListener('scroll', handleScroll)
    
        return function cleanupListener() {
          window.removeEventListener('scroll', handleScroll)
        }
    })

    useEffect(() => {
        return scrollY.onChange((v) => console.log(v));
      }, [scrollY]);

    const y1 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop1, 0]);
    const y2 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop2, 0]);
    const y3 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop3, 0]);
    const y4 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop4, 0]);
    const y5 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop5, 0]);
    const resize1 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.resize1, "0px"]);

    // console.log(y1)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/>
            <LinkBar toggle = {toggle} title = "About" theme = {theme} transparent={true}/>
            <ThemeProvider theme ={theme}>
                <CSSVariables>
                    <DiagonalDiv lightcolor ={true} zPlane={2}>
                        <Content>
                            <HeadingBox>
                                <PageHeading>Henry Jones</PageHeading>
                                <Sepparator/>
                                <HeadingSideBox>
                                    <HeadingSideText>Software Engineer</HeadingSideText>
                                    <HeadingSideText>3D Artist</HeadingSideText>
                                </HeadingSideBox>
                            </HeadingBox>
                        </Content>
                    </DiagonalDiv>
                    <DiagonalDiv 
                        hasShadow={true} 
                        zPlane={4} 
                        id="Overview">
                        <Content>
                            <HeaderSkew>
                                <ScrollLink
                                    to={"Overview"}
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={0}/>
                                <Heading lightcolor ={true}>Overview</Heading>
                                <TopLine lightcolor ={true}>Education | Soft Skills | Career Focus</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle lightcolor ={true}>Subtitle text goes here</Subtitle> */}
                            <Boxes 
                                boxCount = {2} 
                                boxCountMobile = {2}
                                marginBot = {"3em"}
                                gridGap={"1%"}>
                                <TwoBox>
                                    <Subtitle lightcolor={true}>
                                        I'm a web developer and multimedia artist from Portland, Maine. 
                                        I'm new to both fields, but ready to dive into any projects or 
                                        opportunites that could broaden my horizons.
                                    </Subtitle>
                                    <Subtitle lightcolor={true}>
                                        Since graduating 
                                        from Union College in 2021, I've worked to to steer my focus 
                                        towards visual effects, immersive art, and virtual production
                                        in an effort to combine my two overlapping passions.
                                    </Subtitle>
                                </TwoBox>
                                <TwoBox>
                                    <DetailContainer>
                                        <DetailPanel
                                            src={"/images/about/logos/union.png"} 
                                            theme={theme}
                                            header={"Union College"}
                                            subtitle={"B.S. Computer Science"}
                                            subsubtitle={"Cum Laude '21"}
                                            lightcolor = {true}/>
                                        <DetailPanel 
                                            src={"/images/about/logos/ThreeJsJourney.png"} 
                                            theme={theme}
                                            header={"Three.js Journey"}
                                            subtitle={"Three.js Bootcamp"}
                                            subsubtitle={"Course Completed 2021"}
                                            lightcolor = {true}/>
                                        <DetailPanel 
                                            src={"/images/about/logos/cbhs.png"} 
                                            theme={theme}
                                            header={"Casco Bay High School"}
                                            subtitle={"The Foundation"}
                                            subsubtitle={"Graduated '16"}
                                            lightcolor = {true}/>
                                    </DetailContainer>
                                </TwoBox>
                            </Boxes>
                            <DiagonalBreak heightValue="20px" lightcolor = {true}/>
                             <Boxes 
                                boxCount = {4}
                                gridGap={"10%"}
                                boxCountMobile = {2}
                                marginBot = {"3em"}>
                                <FourBox>
                                    <IconList
                                        src={"/images/about/logos/stackedCubes.svg"}
                                        alt="Three stacked cubes"
                                        title="Design Principles"
                                        skill1="Speed and Simplicity"
                                        skill2="Visual Design"
                                        skill3="User-First"/>
                                </FourBox>
                                <FourBox>
                                    <IconList
                                        src={"/images/about/logos/computer.svg"}
                                        alt="Computer illustration"
                                        title="Analytic Skills"
                                        skill1="Algorithm Design"
                                        skill2="Data Analysis"
                                        skill3="Multithreading"/>
                                </FourBox>
                                <FourBox>
                                    <IconList
                                        src={"/images/about/logos/phone.svg"}
                                        alt="Smartphone illustration"
                                        title="Soft Skills"
                                        skill1="Adaptability"
                                        skill2="Life-Long Scholar"
                                        skill3="Curiosity"/>
                                  
                                </FourBox>
                                <FourBox>
                                    <IconList
                                        src={"/images/about/logos/globe.svg"}
                                        alt="Smartphone illustration"
                                        title="Communication"
                                        skill1="Advanced spoken spanish"
                                        skill2="Social Media Designer"
                                        skill3="Great Cook"/>
                               </FourBox>
                            </Boxes>
                        </Content>
                    </DiagonalDiv>
                    <DiagonalDiv 
                        hasShadow={true} 
                        lightcolor ={true} 
                        zPlane={6} 
                        style={{top: y1}}
                        id="DevSkills"
                        >
                        <Content>
                            <HeaderSkew>
                                <ScrollLink
                                    to={"DevSkills"}
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={600}/>
                                <Heading>Dev Skills</Heading>
                                <TopLine>Package Proficiency | Language Knowledge</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle>Subtitle text goes here</Subtitle> */}
                            <Boxes 
                                boxCount = {8}
                                boxCountMobile = {4}
                                gridGap = {"0%"}>
                                <EightBox>
                                    <SkillTracker 
                                        value ={60} 
                                        max ={100} 
                                        text={"React"} 
                                        src={"/images/about/logos/react.svg"} 
                                        alt={"React.js Logo"} 
                                        theme={theme} 
                                        scale={"120%"}
                                        dest={"https://reactjs.org/"}/>
                                </EightBox>
                                <EightBox>
                                    <SkillTracker 
                                        value ={50} 
                                        max ={100} 
                                        text={"Node.js"} 
                                        src={"/images/about/logos/node-js.svg"} 
                                        alt={"Node.js Logo"} 
                                        theme={theme} 
                                        scale={"100%"}
                                        dest={"https://nodejs.org/en/"}/>
                                </EightBox>
                                <EightBox>
                                    <SkillTracker 
                                        value ={60} 
                                        max ={100} 
                                        text={"C"} 
                                        src={"/images/about/logos/c.svg"} 
                                        alt={"C Logo"} 
                                        theme={theme} 
                                        scale={"80%"}
                                        dest={"https://en.wikipedia.org/wiki/C_(programming_language)"}/>
                                </EightBox>
                                <EightBox>
                                    <SkillTracker 
                                        value ={50} 
                                        max ={100} 
                                        text={"C++"} 
                                        src={"/images/about/logos/c++.svg"} 
                                        alt={"C++ Logo"} 
                                        theme={theme}
                                        scale={"80%"}
                                        dest={"https://en.wikipedia.org/wiki/C%2B%2B"}/>
                                </EightBox>
                                <EightBox>
                                    <SkillTracker 
                                        value ={60} 
                                        max ={100} 
                                        text={"Three.js"} 
                                        src={"/images/about/logos/threejs.svg"} 
                                        alt={"Three.js Logo"} 
                                        theme={theme} 
                                        scale={"100%"}
                                        dest={"https://threejs.org/"}/>
                                </EightBox>
                                <EightBox>
                                    <SkillTracker 
                                        value ={60} 
                                        max ={100} 
                                        text={"Python"} 
                                        src={"/images/about/logos/python.svg"} 
                                        alt={"Python Logo"} 
                                        theme={theme} 
                                        scale={"80%"}
                                        dest={"https://www.python.org/"}/>
                                </EightBox>
                                <EightBox>
                                    <SkillTracker 
                                        value ={80} 
                                        max ={100} 
                                        text={"Java"} 
                                        src={"/images/about/logos/java.svg"} 
                                        alt={"Java Logo"} 
                                        theme={theme} 
                                        scale={"80%"}
                                        dest={"https://www.java.com/en/"}/>
                                </EightBox>
                                <EightBox>
                                    <SkillTracker 
                                        value ={70} 
                                        max ={100} 
                                        text={"Latex"} 
                                        src={"/images/about/logos/tex.svg"} 
                                        alt={"Generic Tex Logo"} 
                                        theme={theme} 
                                        scale={"70%"}
                                        dest={"https://www.latex-project.org/"}/>
                                </EightBox>    
                            </Boxes>
                        </Content>
                    </DiagonalDiv>
                   <DiagonalDiv 
                        hasShadow={true} 
                        lightcolor ={false} 
                        zPlane={8} 
                        style={{top: y2}}
                        id={"CreativeSkills"}>
                        <Content>
                            <HeaderSkew>
                                <ScrollLink
                                    to="CreativeSkills"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={800}/>
                                <Heading lightcolor ={true}>Creative Skills</Heading>
                                <TopLine lightcolor ={true}>Software Proficiency | Design Huristics</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle lightcolor ={true} >Subtitle text goes here</Subtitle> */}
                            <Boxes 
                                boxCount = {6}
                                boxCountMobile = {3}>
                                <SixBox>
                                    <SkillTracker 
                                        value ={80} 
                                        max ={100} 
                                        text={"Blender"} 
                                        src={"/images/about/logos/blender.svg"} 
                                        alt={"Blender Logo"} 
                                        theme={theme} 
                                        scale={"80%"}
                                        dest={"https://www.blender.org/"}
                                        lightcolor={true}/>
                                </SixBox>
                                <SixBox>
                                    <SkillTracker 
                                        value ={40} 
                                        max ={100} 
                                        text={"Cinema4D"} 
                                        src={"/images/about/logos/c4d.png"} 
                                        alt={"Cinema4D Logo"} 
                                        theme={theme} 
                                        scale={"80%"}
                                        dest={"https://www.maxon.net/en/cinema-4d"}
                                        lightcolor={true}/>
                                </SixBox>
                                <SixBox>
                                    <SkillTracker 
                                        value ={60} 
                                        max ={100} 
                                        text={"Photoshop"} 
                                        src={"/images/about/logos/photoshop.svg"} 
                                        alt={"Adobe Photoshop Logo"} 
                                        theme={theme} 
                                        scale={"70%"}
                                        dest={"https://www.adobe.com/products/photoshop.html"}
                                        lightcolor={true}/>
                                </SixBox>
                                <SixBox>
                                    <SkillTracker 
                                        value ={50} 
                                        max ={100} 
                                        text={"Illustrator"} 
                                        src={"/images/about/logos/illustrator.svg"} 
                                        alt={"Adobe Illustrator Logo"} 
                                        theme={theme}
                                        scale={"70%"}
                                        dest={"https://www.adobe.com/products/illustrator.html"}
                                        lightcolor={true}/>
                                </SixBox>
                                <SixBox>
                                    <SkillTracker 
                                        value ={60} 
                                        max ={100} 
                                        text={"Premiere"} 
                                        src={"/images/about/logos/premiere.svg"} 
                                        alt={"Adobe Premiere Logo"} 
                                        theme={theme} 
                                        scale={"70%"}
                                        dest={"https://www.adobe.com/products/premiere.html"}
                                        lightcolor={true}/>
                                </SixBox>
                                <SixBox>
                                    <SkillTracker 
                                        value ={50} 
                                        max ={100} 
                                        text={"After Effects"} 
                                        src={"/images/about/logos/after-effects.svg"} 
                                        alt={"Adobe After Effects Logo"} 
                                        theme={theme} 
                                        scale={"70%"}
                                        dest={"https://www.adobe.com/products/aftereffects.html"}
                                        lightcolor={true}/>
                                </SixBox>
                            </Boxes>
                        </Content>
                    </DiagonalDiv>
                    <DiagonalDiv 
                        hasShadow={true} 
                        lightcolor ={true} 
                        zPlane={10} 
                        style={{top: y3}}
                        id={"Career"}>
                       <Content>
                            <HeaderSkew>
                                <ScrollLink
                                    to="Career"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={1000}/>
                                <Heading lightcolor ={false}>Career</Heading>
                                <TopLine lightcolor ={false}>Past Work | Notable Achievements</TopLine>
                            </HeaderSkew>
                        </Content>
                            <Container>
                                <AnimateSharedLayout type="crossfade">
                                    <Router>
                                        <Route path={["/about/:id", "/about/"]} component={Store} />
                                    </Router>
                                </AnimateSharedLayout>
                            </Container>
                        {/* </Content> */}
                    </DiagonalDiv>
                    <FinalDiv 
                        hasShadow={true} 
                        lightcolor ={false} 
                        zPlane={12} 
                        style={{top: y4}}
                        id={"resume"}>
                        <Content>
                            <HeaderSkew>
                                <ScrollLink
                                    to="resume"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={1500}/>
                                <Heading lightcolor ={true}>Everything Else</Heading>
                                <TopLine lightcolor ={true}>Resumé</TopLine>
                            </HeaderSkew>
                            <HeaderSkew>
                                <DiagonalButton lightcolor = {true} href="HenryJonesResume.pdf" title = "" download>Download Resume</DiagonalButton>
                            </HeaderSkew>
                            <DiagonalBreak
                                heightValue = {"300px"}
                                // lightcolor={true}
                                style={{height: resize1}}
                            />
                        </Content>
                    </FinalDiv>
                    {/* <FinalDiv 
                        hasShadow={true} 
                        lightcolor ={true} 
                        zPlane={14} 
                        style={{top: y5}}
                        id={"Empty"}>
                        <Content>
                            <DiagonalBreak
                                // heightValue = {"300px"}
                                style={{height: resize1}}
                            />
                        </Content>
                    </FinalDiv> */}
                </CSSVariables>
            </ThemeProvider>
            <Footer theme={theme} lightcolor ={false} padded ={true} id="footer"/>
        </>
    )
}

export default About