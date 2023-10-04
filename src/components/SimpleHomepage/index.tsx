import { motion, useScroll } from 'framer-motion'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import About from './panels/About'
import Hero from './panels/Hero'
import styles from './simple-homepage.module.scss'
import Header from './components/header/Header'
import { Socials } from './components/socials-email/Socials'

export const HOMEPAGE_TRANSITION_DURATION_MS = 1500
const SCROLL_PANEL_NAMES = ['about', 'experience'] as const
export type ScrollPanelNames = (typeof SCROLL_PANEL_NAMES)[number]
// export type ScrollPanelNames = 'about' | 'experience'
type ScrollPanelType = {
  // name: ScrollPanelNames
  component: React.ReactNode
  ref: MutableRefObject<any>
  showInHeader?: boolean
  snapScroll?: boolean
}
const SimpleHomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({ container: scrollRef })
  const [visible, setVisible] = useState<boolean>(false)

  const aboutRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)

  const scrollPanels: { [key in ScrollPanelNames]: ScrollPanelType } = {
    about: {
      component: <About ref={aboutRef} />,
      ref: aboutRef,
    },
    experience: {
      component: <About ref={experienceRef} />,
      ref: experienceRef,
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
          <Socials visible={visible} />
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
    </div>
  )
}

export default SimpleHomePage
