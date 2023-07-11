import styles from './landing.module.scss'

import { motion, useScroll, useSpring } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from './../../context/WindowDimensionsContext'
import Menu from './components/Menu'
import ParallaxText from './components/ParallaxText'
import Socials from './components/Socials'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { scrollY, scrollYProgress } = useScroll({ container: scrollRef })
  const { height } = useWindowDimensions()
  const driver = useSpring(0, {
    stiffness: 300,
    damping: 100,
    bounce: 0,
    mass: 10,
  })
  const [visible, setVisible] = useState<boolean>(true)
  const [opaque, setOpaque] = useState<boolean>(false)

  useEffect(() => {
    if (visible) {
      setOpaque(false)
      driver.set(0)
      return
    }
    driver.set(-height * 1.5)
    if (!scrollRef?.current) {
      return
    }
    // reset backstage
    const timer = setTimeout(() => {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setOpaque(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [visible])

  useEffect(() => {
    if (!scrollRef?.current) {
      return
    }
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [])

  return (
    <div
      className={styles.wrapper}
      style={{
        opacity: opaque ? 0 : 1,
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      <div
        className={styles.button}
        onClick={() => {
          setVisible(!visible)
        }}
      >
        {visible ? 'visible' : 'hidden'}
      </div>
      <Menu
        scrollYProgress={scrollYProgress}
        visible={visible}
        onClickGallery={() => {
          setVisible(false)
          navigate('/gallery')
        }}
        onClickAbout={() => {
          setVisible(false)
          navigate('/')
        }}
        onClickExperience={() => {
          setVisible(false)
          navigate('/experience')
        }}
      />
      <div className={styles.hero} ref={scrollRef}>
        <div className={styles.heroOverflow}>
          <div className={styles.heroScroll}>
            <motion.div className={styles.top} style={{ top: driver }}>
              <ParallaxText
                baseVelocity={-3}
                scrollY={scrollY}
                text="Henry Jones"
                textClassName={styles.topText}
              />
            </motion.div>
            <motion.div className={styles.bottom} style={{ bottom: driver }}>
              <ParallaxText
                baseVelocity={3}
                scrollY={scrollY}
                text="Henry Jones"
                textClassName={styles.bottomText}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <Socials visible={visible} />
    </div>
  )
}

export default Landing
