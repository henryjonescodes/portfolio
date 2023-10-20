import React, { useState } from 'react'
import styles from './hero.module.scss'
import { motion } from 'framer-motion'

type PanelProps = {
  visible: boolean
}

const heroVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}
const opacityVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const HiMyNameIs = ({ visible }: PanelProps) => {
  return (
    <motion.div
      initial={'hidden'}
      animate={visible ? 'visible' : 'hidden'}
      transition={{
        staggerChildren: 0.25,
        delayChildren: 0.8,
      }}
      className={styles.hiMyNameIs}
    >
      <motion.h3 transition={{ delay: 0.4 }} variants={opacityVariants}>
        Hi,
      </motion.h3>
      <motion.h3 variants={opacityVariants}>my</motion.h3>
      <motion.h3 variants={opacityVariants}>name</motion.h3>
      <motion.h3 variants={opacityVariants}>is</motion.h3>
    </motion.div>
  )
}
const IBuildUserInterfaces = ({ visible }: PanelProps) => {
  return (
    <motion.div
      initial={'hidden'}
      animate={visible ? 'visible' : 'hidden'}
      transition={{
        staggerChildren: 0.2,
        delayChildren: 3,
      }}
      className={styles.iBuildUserInterfaces}
    >
      <motion.h2 variants={opacityVariants}>I</motion.h2>
      <motion.h2 variants={opacityVariants}>build</motion.h2>
      <motion.h2 variants={opacityVariants}>user</motion.h2>
      <motion.h2 variants={opacityVariants}>interfaces</motion.h2>
    </motion.div>
  )
}

const Hero = ({ visible }: PanelProps) => {
  return (
    <div className={styles.hero}>
      <motion.div
        className={styles.heroContent}
        initial={'hidden'}
        animate={visible ? 'visible' : 'hidden'}
        transition={
          {
            // staggerChildren: 1,
            // delayChildren: 0.4,
          }
        }
      >
        <HiMyNameIs visible={visible} />
        <motion.h1 transition={{ delay: 2.2 }} variants={heroVariants}>
          Henry Jones
        </motion.h1>
        <IBuildUserInterfaces visible={visible} />
        {/* <motion.p variants={heroVariants}>
          I'm a software engineer passionate about blending the power of modern
          computing with realities of being a human by creating new ways for
          tech to serve people through UI
        </motion.p> */}
      </motion.div>
    </div>
  )
}

export default Hero
