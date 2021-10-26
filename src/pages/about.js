//Node
import React, {useState, useLayoutEffect} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useTransform, useViewportScroll , useMotionValue} from 'framer-motion';

//Local
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/About/theme'
import Footer from '../components/Common/Footer'

//Icons
import Icon1 from '../images/about/icon-02.svg'
import Icon2 from '../images/about/icon-03.svg'
import Icon3 from '../images/about/icon-04.svg'
import Icon4 from '../images/about/icon-05.svg'
import ReactIcon from '../images/logos/react.svg'
import CIcon from '../images/logos/c.svg'
import CPlusPlusIcon from '../images/logos/c++.svg'
import JavaIcon from '../images/logos/java.svg'
import NodeIcon from '../images/logos/node-js.svg'
import PythonIcon from '../images/logos/python.svg'
import TexIcon from '../images/logos/tex.svg'
import ThreeIcon from '../images/logos/threejs.svg'
import BlenderIcon from '../images/logos/blender.svg'
import AEIcon from '../images/logos/after-effects.svg'
import AIIcon from '../images/logos/illustrator.svg'
import APSIcon from '../images/logos/photoshop.svg'
import APRIcon from '../images/logos/premiere.svg'
import CinemaIcon from '../images/logos/c4d.png'



import { 
    FourBox, 
    FourBoxes, 
    Content, 
    CSSVariables, 
    DiagonalDiv, 
    TwoBoxes, 
    TwoBox,
    FinalDiv,
    Heading,
    Subtitle,
    WiggleBox,
    StyledLabel,
    Img,
    PageHeading,
    HeaderSkew,
    TopLine,
    Boxes,
    EightBox,
    SixBox,
    ScrollLink
} from '../components/About/diagonalDivs'
import { FaLinkedin } from 'react-icons/fa'
import SkillTracker from '../components/About/SkillTracker'

export const pageWrapper = styled.div`
    min-width: 650px;
`
const About = () => {

    const [isOpen, setIsOpen] = useState(false)
    let { scrollY } = useViewportScroll();
    scrollY.set(0);
    // console.log(scrollY)

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const motionPoints = {
        stop1: -410,
        stop2: -585,
        stop3: -790,
        scrollPoint: 300
    }

    
    //Framer Motion scrolling/locking logic
    let stopScroll = false;

    // let y1 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop1, 0]);
    // let y2 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop2, 0]);
    // let y3 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop3, 0]);


    React.useEffect(function setupListener() {
        function handleResize() {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            if(window.innerWidth <= 700){
                stopScroll = true;
                scrollY.set(motionPoints.scrollPoint);
            } else {
                stopScroll = false;
            }
        }
        window.addEventListener('resize', handleResize)
    
        return function cleanupListener() {
          window.removeEventListener('resize', handleResize)
        }
    })

    React.useEffect(function setupListener() {
        function handleScroll() {
            if(stopScroll){
                console.log("scroll stopped")
                scrollY.set(motionPoints.scrollPoint);
            }
        }
        window.addEventListener('scroll', handleScroll)
    
        return function cleanupListener() {
          window.removeEventListener('scroll', handleScroll)
        }
    })

    const y1 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop1, 0]);
    const y2 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop2, 0]);
    const y3 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop3, 0]);

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
                            <PageHeading>Henry Jones</PageHeading>
                            {/* <Subtitle>Computer Scientist and 3D artist specializing in 3D web development.</Subtitle> */}
                            <Boxes boxCount = {4}>
                                <FourBox>
                                    <WiggleBox whileHover={{ scale: 1.2, rotate: 5 }}>
                                        <Img src={Icon1} alt="Three stacked cubes"/>
                                        <ScrollLink
                                            to="Overview"
                                            smooth="true"
                                            duration={500}
                                            spy={true}
                                            exact='true'
                                            offset={50}/>
                                    </WiggleBox>
                                    <StyledLabel>Overview</StyledLabel>
                                </FourBox>
                                <FourBox>
                                    <WiggleBox whileHover={{ scale: 1.2, rotate: 5 }}>
                                        <Img src={Icon2} alt="Computer illustration"/>
                                        <ScrollLink
                                            to="DevSkills"
                                            smooth="true"
                                            duration={500}
                                            spy={true}
                                            exact='true'
                                            offset={400}/>
                                    </WiggleBox>
                                    <StyledLabel>Dev Skills</StyledLabel>
                                </FourBox>
                                <FourBox>
                                    <WiggleBox whileHover={{ scale: 1.2, rotate: 5 }}>
                                        <Img src={Icon3} alt="Smartphone illustration"/>
                                        <ScrollLink
                                            to="CreativeSkills"
                                            smooth="true"
                                            duration={500}
                                            spy={true}
                                            exact='true'
                                            offset={400}/>
                                    </WiggleBox>
                                    <StyledLabel>Creative Skills</StyledLabel>
                                </FourBox>
                                <FourBox>
                                    <WiggleBox whileHover={{ scale: 1.2, rotate: 5 }}>
                                        <Img src={Icon4} alt="Earth illustrtation"/>
                                        <ScrollLink
                                            to="DevSkills"
                                            smooth="true"
                                            duration={500}
                                            spy={true}
                                            exact='true'
                                            offset={-80}/>
                                    </WiggleBox>
                                    <StyledLabel>Resume</StyledLabel>
                                </FourBox>
                            </Boxes>
                        </Content>
                    </DiagonalDiv>
                    <DiagonalDiv 
                        hasShadow={true} 
                        zPlane={4} 
                        id="Overview">
                        <Content>
                            <HeaderSkew>
                                <Heading lightcolor ={true}>Overview</Heading>
                                <TopLine lightcolor ={true}>Education | Soft Skills | Career Focus</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle lightcolor ={true}>Subtitle text goes here</Subtitle> */}
                            <Boxes boxCount = {2}>
                                <TwoBox/>
                                <TwoBox/>
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
                                <Heading>Dev Skills</Heading>
                                <TopLine>Package Proficiency | Language Knowledge</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle>Subtitle text goes here</Subtitle> */}
                            <Boxes boxCount = {8}>
                                <EightBox>
                                    <SkillTracker 
                                        value ={60} 
                                        max ={100} 
                                        text={"React"} 
                                        src={ReactIcon} 
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
                                        src={NodeIcon} 
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
                                        src={CIcon} 
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
                                        src={CPlusPlusIcon} 
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
                                        src={ThreeIcon} 
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
                                        src={PythonIcon} 
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
                                        src={JavaIcon} 
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
                                        src={TexIcon} 
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
                                <Heading lightcolor ={true}>Creative Skills</Heading>
                                <TopLine lightcolor ={true}>Software Proficiency | Design Huristics</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle lightcolor ={true} >Subtitle text goes here</Subtitle> */}
                            <Boxes boxCount = {6}>
                                <SixBox>
                                    <SkillTracker 
                                        value ={80} 
                                        max ={100} 
                                        text={"Blender"} 
                                        src={BlenderIcon} 
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
                                        src={CinemaIcon} 
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
                                        src={APSIcon} 
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
                                        src={AIIcon} 
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
                                        src={APRIcon} 
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
                                        src={AEIcon} 
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
                        id={"EverythingElse"}>
                        <Content>
                            <HeaderSkew>
                                <Heading>Everything Else</Heading>
                                <TopLine>Resumé</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle>Subtitle text goes here</Subtitle> */}
                            <Boxes boxCount = {4}>
                                <FourBox/>
                                <FourBox/>
                                <FourBox/>
                                <FourBox/>
                            </Boxes>
                        </Content>
                    </DiagonalDiv>
                    {/* <FinalDiv above ={false} hasShadow={true}>
                        <Content>
                        <HeaderSkew>
                            <Heading lightcolor ={true}>Projects</Heading>
                        </HeaderSkew>
                            <Subtitle lightcolor ={true}>Subtitle text goes here</Subtitle>
                            <TwoBoxes>
                                <TwoBox/>
                                <TwoBox/>
                            </TwoBoxes>
                        </Content>
                    </FinalDiv> */}
                </CSSVariables>
            </ThemeProvider>
            <Footer theme={theme} lightcolor ={false} padded ={true} id="footer"/>
        </>
    )
}

export default About