import { useMotionValueEvent, useScroll } from 'framer-motion'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from './../../context/WindowDimensionsContext'
import Header from './components/header/Header'
import { Socials } from './components/socials-email/Socials'
import Contact from './panels/Contact/Contact'
import styles from './simple-homepage.module.scss'
import Hero from './panels/Hero/Hero'
import CMYK from './components/CMYK/CMYK'
import Projects from './panels/Projects'
import About from './panels/About'

export const HOMEPAGE_TRANSITION_DURATION_MS = 1500
const SCROLL_PANEL_NAMES = ['about', 'projects', 'contact'] as const
export type ScrollPanelNames = (typeof SCROLL_PANEL_NAMES)[number]

type ScrollPanelType = {
  component: React.ReactNode
  ref: MutableRefObject<any>
}
const SimpleHomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({ container: scrollRef })
  const [pageProgress, setPageProgress] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const aboutRef = useRef<any>(null)
  const projectsRef = useRef<any>(null)
  const contactRef = useRef<any>(null)
  const { height } = useWindowDimensions()

  const scrollPanels: { [key in ScrollPanelNames]: ScrollPanelType } = {
    about: {
      component: <About ref={aboutRef} />,
      ref: aboutRef,
    },
    contact: {
      component: <Contact ref={contactRef} />,
      ref: contactRef,
    },
    projects: {
      component: <Projects ref={projectsRef} />,
      ref: projectsRef,
    },
  }

  const scrollToPanel = (panelName: ScrollPanelNames) => {
    const _panel = scrollPanels[panelName]
    const { ref } = _panel
    ref?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!visible) {
      setVisible(true)
    }
  }, [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!latest) return
    setPageProgress(latest / height)
    return
  })

  return (
    <div className={styles.wrapper}>
      <Header
        scrollY={scrollY}
        visible={visible}
        scrollToPanel={scrollToPanel}
        panelNames={[...SCROLL_PANEL_NAMES]}
      />
      <div className={styles.columns}>
        <div className={styles.columnLeft}>
          <Socials visible={visible && pageProgress < 0.8} />
        </div>
        <div className={styles.content} ref={scrollRef}>
          <Hero visible={visible} />
          {SCROLL_PANEL_NAMES.map((name) => {
            return scrollPanels[name].component
          })}
        </div>
        <div className={styles.columnRight}>{/* <Email /> */}</div>
      </div>
      <div
        className={styles.testButton}
        onClick={() => {
          setVisible(!visible)
        }}
      >
        <h3>Toggle{visible ? ' off' : ' on'}</h3>
      </div>
      {/* <CMYK /> */}
    </div>
  )
}

export default SimpleHomePage
