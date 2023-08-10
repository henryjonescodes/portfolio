import { motion, useScroll } from 'framer-motion'
import React, { useRef, useState } from 'react'
import About from './panels/About'
import Hero from './panels/Hero'
import styles from './simple-homepage.module.scss'
import Header from './components/header/Header'
import { Socials } from './components/socials-email/Socials'

const SimpleHomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({ container: scrollRef })
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      <Header scrollY={scrollY} visible={visible} />
      <div className={styles.columns}>
        <div className={styles.columnLeft}>
          <Socials visible={visible} />
        </div>
        <div className={styles.content} ref={scrollRef}>
          <Hero visible={visible} />
          <About />
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
