import { motion, useScroll } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import About from './panels/About'
import Hero from './panels/Hero'
import styles from './simple-homepage.module.scss'
import Header from './components/header/Header'
import { Socials } from './components/socials-email/Socials'

export const HOMEPAGE_TRANSITION_DURATION_MS = 1500

const SimpleHomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({ container: scrollRef })
  const [visible, setVisible] = useState<boolean>(false)

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
        onNavigate={() => {
          setVisible(false)
        }}
      />
      <div className={styles.columns}>
        <div className={styles.columnLeft}>
          <Socials visible={visible} />
        </div>
        <div className={styles.content} ref={scrollRef}>
          <Hero visible={visible} />
          {/* <About /> */}
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
