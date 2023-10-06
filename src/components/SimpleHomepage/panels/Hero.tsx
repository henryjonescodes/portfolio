import React, { useState } from 'react'
import styles from './simple-homepage-panels.module.scss'
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

const Hero = ({ visible }: PanelProps) => {
  return (
    <div className={styles.hero}>
      <motion.div
        className={styles.heroContent}
        initial={'hidden'}
        animate={visible ? 'visible' : 'hidden'}
        transition={{
          staggerChildren: 0.2,
          delayChildren: 0.4,
        }}
      >
        <motion.h3 variants={heroVariants}>Hi, my name is</motion.h3>
        <motion.h1 variants={heroVariants}>Henry Jones</motion.h1>
        <motion.h2 variants={heroVariants}>I build user interfaces</motion.h2>
        <motion.p variants={heroVariants}>
          I'm a software engineer passionate about blending the power of modern
          computing with realities of being a human by creating new ways for
          tech to serve people through UI
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Hero
