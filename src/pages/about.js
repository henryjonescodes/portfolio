//Node
import React, {useState, useEffect} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useTransform, useViewportScroll} from 'framer-motion';

//Local
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/About/theme'
import Footer from '../components/Common/Footer'

//Icons and images
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
import ThreeJourneyIcon from '../images/logos/ThreeJsJourney.png'
import UnionIcon from '../images/logos/union.png'
import CBHSLogo from '../images/logos/cbhs.png'



import { 
    FourBox, 
    Content, 
    CSSVariables, 
    DiagonalDiv, 
    TwoBox,
    Heading,
    StyledLabel,
    Img,
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
    SkillsText,
} from '../components/About/diagonalDivs'
import SkillTracker from '../components/About/SkillTracker'
import DetailPanel from '../components/About/DetailPanel';

export const pageWrapper = styled.div`
    min-width: 650px;
`
const About = () => {

    const [isOpen, setIsOpen] = useState(false)
    let { scrollY } = useViewportScroll();
    scrollY.set(0);

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const motionPoints = {
        stop1: -520,
        stop2: -695,
        stop3: -900,
        scrollPoint: 200,
        storedPoint: 0
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
                            <HeadingBox>
                                <PageHeading>Henry Jones</PageHeading>
                                <Sepparator/>
                                <HeadingSideBox>
                                    <HeadingSideText>Software Engineer</HeadingSideText>
                                    <HeadingSideText>3D Artist</HeadingSideText>
                                </HeadingSideBox>
                            </HeadingBox>
                            {/* <HeadingBox>
                            <Subtitle>
                                I'm a web developer and multimedia artist from Portland, Maine. 
                                I'm new to both fields, but ready to dive into any projects or 
                                opportunites that could broaden my horizons. Since graduating 
                                from Union College in 2021, I've worked to to steer my focus 
                                towards visual effects, immersive art, and virtual production
                                in an effort to combine my two overlapping passions.
                            </Subtitle>
                            <ImgWrap>
                                <Img src ={headshot} alt={"head shot"}/>
                            </ImgWrap>
                            </HeadingBox> */}
                            {/* <Boxes boxCount = {4} gridGap={"20%"}>
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
                            </Boxes> */}
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
                            <Boxes 
                                boxCount = {2} 
                                boxCountMobile = {2}
                                marginBot = {"7em"}>
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
                                    <DetailPanel 
                                        src={UnionIcon} 
                                        theme={theme}
                                        header={"Union College"}
                                        subtitle={"B.S. Computer Science"}
                                        subsubtitle={"Cum Laude '21"}/>
                                    <DetailPanel 
                                        src={ThreeJourneyIcon} 
                                        theme={theme}
                                        header={"Three.js Journey"}
                                        subtitle={"Three.js Bootcamp"}
                                        subsubtitle={"Course Completed 2021"}/>
                                    <DetailPanel 
                                        src={CBHSLogo} 
                                        theme={theme}
                                        header={"Casco Bay High School"}
                                        subtitle={"The Foundation"}
                                        subsubtitle={"Graduated '16"}/>
                                </TwoBox>
                            </Boxes>
                             <Boxes 
                                boxCount = {4}
                                gridGap={"10%"}
                                boxCountMobile = {2}
                                marginBot = {"3em"}>
                                <FourBox>
                                    <Img src={Icon1} alt="Three stacked cubes"/>
                                    <StyledLabel lightcolor={true}>Design Principles</StyledLabel>
                                    <SkillsText lightcolor={true}>Speed and Simplicity</SkillsText>
                                    <SkillsText lightcolor={true}>Skill2</SkillsText>
                                    <SkillsText lightcolor={true}>Skill3</SkillsText>
                                </FourBox>
                                <FourBox>
                                    <Img src={Icon2} alt="Computer illustration"/>
                                    <StyledLabel lightcolor={true}>Analytic Skills</StyledLabel>
                                    <SkillsText lightcolor={true}>Algorithm Design</SkillsText>
                                    <SkillsText lightcolor={true}>Data Analysis</SkillsText>
                                    <SkillsText lightcolor={true}>Skill3</SkillsText>                          
                                </FourBox>
                                <FourBox>
                                    <Img src={Icon3} alt="Smartphone illustration"/> 
                                    <StyledLabel lightcolor={true}>Soft Skills</StyledLabel>
                                    <SkillsText lightcolor={true}>Adaptability</SkillsText>
                                    <SkillsText lightcolor={true}>Life-Long Scholar</SkillsText>
                                    <SkillsText lightcolor={true}>Curiosity</SkillsText>
                                </FourBox>
                                <FourBox>
                                    <Img src={Icon4} alt="Soft Skills"/>
                                    <StyledLabel lightcolor={true}>Communication</StyledLabel>
                                    <SkillsText lightcolor={true}>Advanced spoken spanish</SkillsText>
                                    <SkillsText lightcolor={true}>Social Media Designer</SkillsText>
                                    <SkillsText lightcolor={true}>Great Cook</SkillsText>                 
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
                                <Heading>Dev Skills</Heading>
                                <TopLine>Package Proficiency | Language Knowledge</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle>Subtitle text goes here</Subtitle> */}
                            <Boxes 
                                boxCount = {8}
                                boxCountMobile = {4}>
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
                            <Boxes 
                                boxCount = {6}
                                boxCountMobile = {3}>
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
                            <Boxes 
                                boxCount = {4}
                                boxCountMobile = {2}>
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