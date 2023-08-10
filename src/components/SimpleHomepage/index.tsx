import { useScroll } from 'framer-motion'
import React, { useRef } from 'react'
import Header from './components/Header'
import About from './panels/About'
import Hero from './panels/Hero'
import styles from './simple-homepage.module.scss'

export const LeftColumn = () => {
  return <div className={styles.columnLeft}>index</div>
}
export const RightColumn = () => {
  return <div className={styles.columnRight}>index</div>
}

const SimpleHomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({ container: scrollRef })

  return (
    <div className={styles.wrapper}>
      <Header scrollY={scrollY} />
      <div className={styles.columns}>
        <LeftColumn />
        <div className={styles.content} ref={scrollRef}>
          <Hero />
          <About />
        </div>
        <RightColumn />
      </div>
    </div>
  )
}

export default SimpleHomePage
