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

import TacoTruckImage from '../images/tacotruck.jpg'



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
    Img,
    DiagonalBreak,
    ScrollLink,
} from '../components/About/diagonalDivs'
import SkillTracker from '../components/About/SkillTracker'
import DetailPanel from '../components/About/DetailPanel';
import IconList from '../components/About/IconList';

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
        stop1: -580,
        stop2: -775,
        stop3: -980,
        stop4: -1985,
        stop5: -2530,
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
    const y4 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop4, 0]);
    const y5 = useTransform(scrollY, [0, motionPoints.scrollPoint], [motionPoints.stop5, 0]);

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
                                marginBot = {"10em"}
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
                                            src={UnionIcon} 
                                            theme={theme}
                                            header={"Union College"}
                                            subtitle={"B.S. Computer Science"}
                                            subsubtitle={"Cum Laude '21"}
                                            lightcolor = {true}/>
                                        <DetailPanel 
                                            src={ThreeJourneyIcon} 
                                            theme={theme}
                                            header={"Three.js Journey"}
                                            subtitle={"Three.js Bootcamp"}
                                            subsubtitle={"Course Completed 2021"}
                                            lightcolor = {true}/>
                                        <DetailPanel 
                                            src={CBHSLogo} 
                                            theme={theme}
                                            header={"Casco Bay High School"}
                                            subtitle={"The Foundation"}
                                            subsubtitle={"Graduated '16"}
                                            lightcolor = {true}/>
                                    </DetailContainer>
                                </TwoBox>
                            </Boxes>
                             <Boxes 
                                boxCount = {4}
                                gridGap={"10%"}
                                boxCountMobile = {2}
                                marginBot = {"3em"}>
                                <FourBox>
                                    <IconList
                                        src={Icon1}
                                        alt="Three stacked cubes"
                                        title="Design Principles"
                                        skill1="Speed and Simplicity"
                                        skill2="Skill2"
                                        skill3="Skill3"/>
                                </FourBox>
                                <FourBox>
                                    <IconList
                                        src={Icon2}
                                        alt="Computer illustration"
                                        title="Analytic Skills"
                                        skill1="Algorithm Design"
                                        skill2="Data Analysis"
                                        skill3="Skill3"/>
                                </FourBox>
                                <FourBox>
                                    <IconList
                                        src={Icon3}
                                        alt="Smartphone illustration"
                                        title="Soft Skills"
                                        skill1="Adaptability"
                                        skill2="Life-Long Scholar"
                                        skill3="Curiosity"/>
                                  
                                </FourBox>
                                <FourBox>
                                    <IconList
                                        src={Icon4}
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
                                <Heading>Career</Heading>
                                <TopLine>Past Jobs | Notable Achievements</TopLine>
                            </HeaderSkew>
                            {/* <Subtitle>Subtitle text goes here</Subtitle> */}
                            <Boxes 
                                boxCount = {2} 
                                boxCountMobile = {2}
                                marginBot = {"10em"}
                                gridGap={"5%"}>
                                <TwoBox>
                                    <DetailContainer>
                                        <DetailPanel
                                            src={UnionIcon} 
                                            theme={theme}
                                            header={"PHS Robotics"}
                                            subtitle={"General Dev/Op"}
                                            subsubtitle={"2014 - 2015"}/>
                                        <DetailPanel 
                                            src={ThreeJourneyIcon} 
                                            theme={theme}
                                            header={"Tumblr"}
                                            subtitle={"Systems Intern"}
                                            subsubtitle={"February 2015"}/>
                                    </DetailContainer>
                                </TwoBox>
                                <TwoBox>
                                    <TopLine>Tech Background</TopLine>
                                    <Img src={TacoTruckImage}/>
                                    {/* <Subtitle lightcolor={false}>
                                        I'm a web developer and multimedia artist from Portland, Maine. 
                                        I'm new to both fields, but ready to dive into any projects or 
                                        opportunites that could broaden my horizons.
                                    </Subtitle> */}
                                    <Subtitle lightcolor={false}>
                                        Growing up in Portland, I immersed myself in the local restaurant culture
                                        from a young age, working across multiple renowned Portland kitchens in many roles.
                                    </Subtitle>
                                </TwoBox>
                            </Boxes>
                            <DiagonalBreak/>
                            <Boxes 
                                boxCount = {2} 
                                boxCountMobile = {2}
                                marginBot = {"12em"}
                                gridGap={"5%"}>
                                <TwoBox>
                                    <TopLine>Restaurant Work</TopLine>
                                    <Img src={TacoTruckImage}/>
                                    <Subtitle lightcolor={false}>
                                        Growing up in Portland, I immersed myself in the local restaurant culture
                                        from a young age, working across multiple renowned Portland kitchens in many roles.
                                    </Subtitle>
                                </TwoBox>
                                <TwoBox>
                                    <DetailContainer topMargin={"60px"}>
                                        <DetailPanel
                                            src={UnionIcon} 
                                            theme={theme}
                                            header={"Salvage BBQ"}
                                            subtitle={"Prep Cook | Baker"}
                                            subsubtitle={"2014 - 2016"}/>
                                        <DetailPanel 
                                            src={ThreeJourneyIcon} 
                                            theme={theme}
                                            header={"Local 188"}
                                            subtitle={"Line Cook"}
                                            subsubtitle={"2016 - 2017"}/>
                                        <DetailPanel 
                                            src={CBHSLogo} 
                                            theme={theme}
                                            header={"OhNo Café"}
                                            subtitle={"Line Cook | FOH"}
                                            subsubtitle={"Winter 2017"}/>
                                        <DetailPanel 
                                            src={CBHSLogo} 
                                            theme={theme}
                                            header={"Bayside Bowl"}
                                            subtitle={"Line Cook | FOH"}
                                            subsubtitle={"2017 - 2019"}/>
                                        <DetailPanel 
                                            src={CBHSLogo} 
                                            theme={theme}
                                            header={"2DineIn"}
                                            subtitle={"Delivery Driver"}
                                            subsubtitle={"2017 - 2019"}/>
                                    </DetailContainer>
                                </TwoBox>
                            </Boxes>
                        </Content>
                    </DiagonalDiv>
                    <DiagonalDiv 
                        hasShadow={true} 
                        lightcolor ={false} 
                        zPlane={12} 
                        style={{top: y4}}
                        id={"Research"}>
                        <Content>
                            <HeaderSkew>
                                <ScrollLink
                                    to="Research"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={1900}/>
                                <Heading lightcolor ={true}>Research</Heading>
                                <TopLine lightcolor ={true}>Projects | Publications</TopLine>
                            </HeaderSkew>
                            <DiagonalBreak heightValue = {"300px"}/>
                        </Content>
                    </DiagonalDiv>
                    <DiagonalDiv 
                        hasShadow={true} 
                        lightcolor ={true} 
                        zPlane={14} 
                        style={{top: y5}}
                        id={"Empty"}>
                        <Content>
                            <HeaderSkew>
                                <ScrollLink
                                    to="Empty"
                                    smooth="true"
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={2500}/>
                                <Heading lightcolor ={false}>Everything Else</Heading>
                                <TopLine lightcolor ={false}>Resume | CV</TopLine>
                            </HeaderSkew>
                            <DiagonalBreak heightValue = {"300px"} lightcolor = {true}/>
                        </Content>
                    </DiagonalDiv>
                </CSSVariables>
            </ThemeProvider>
            <Footer theme={theme} lightcolor ={false} padded ={true} id="footer"/>
        </>
    )
}

export default About