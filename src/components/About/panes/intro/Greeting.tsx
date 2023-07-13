import { Transition, motion } from 'framer-motion'
import React from 'react'
import { IntroTransitionType } from '.'
import { useWindowDimensions } from '../../../../context/WindowDimensionsContext'
import styles from './intro.module.scss'

export type HelloOptionsType = {
  helloRotation?: number
  nameRotation?: number
  helloDriftX?: number
  nameDriftX?: number
}

const defaultOptions: HelloOptionsType = {
  helloRotation: 5,
  nameRotation: 2,
  helloDriftX: 5,
  nameDriftX: 5,
}
type Props = { visible: boolean; options?: HelloOptionsType }

const hiWrapperTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 25,
  mass: 6,
}

const imWrapperTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 25,
  mass: 5.5,
}

const nameWrapperTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 25,
  mass: 6,
}

const Greeting = ({ visible, options = defaultOptions }: Props) => {
  const { height } = useWindowDimensions()

  const { nameRotation, helloRotation, helloDriftX, nameDriftX } = options

  // ? Hi

  const hiWrapperVariants: IntroTransitionType = {
    visible: {
      y: 0,
      x: 0,
    },
    hidden: {
      y: height,
      x: -100,
    },
  }
  const hiVariants: IntroTransitionType = {
    visible: {
      rotate: helloRotation,
      x: helloDriftX,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        type: 'spring',
        stiffness: 11,
        mass: 14,
        damping: 20,
      },
    },
    hidden: {
      rotate: -helloRotation,
      x: -helloDriftX,
    },
  }

  // ? I'm

  const imWrapperVariants: IntroTransitionType = {
    visible: {
      y: 0,
      x: 0,
    },
    hidden: {
      y: height,
      x: 100,
    },
  }

  const imVariants: IntroTransitionType = {
    visible: {
      rotate: -helloRotation,
      x: -helloDriftX,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        type: 'spring',
        stiffness: 10,
        mass: 11,
        damping: 20,
      },
    },
    hidden: {
      rotate: helloRotation,
      x: helloDriftX,
    },
  }

  // ? Name

  const nameWrapperVariants: IntroTransitionType = {
    visible: {
      y: 0,
    },
    hidden: {
      y: height,
    },
  }

  const nameVariants: IntroTransitionType = {
    visible: {
      rotate: -nameRotation,
      x: -nameDriftX,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        type: 'spring',
        stiffness: 8,
        mass: 10,
        damping: 25,
      },
    },
    hidden: {
      rotate: nameRotation,
      x: nameDriftX,
    },
  }

  return (
    <motion.div
      className={styles.hello}
      animate={visible ? 'visible' : 'hidden'}
      transition={{ staggerChildren: 0.05, staggerDirection: -1 }}
    >
      <motion.div className={styles.greeting}>
        <motion.div
          className={styles.greetingHi}
          variants={hiWrapperVariants}
          transition={hiWrapperTransition}
        >
          <motion.h3 variants={hiVariants}>Hi,</motion.h3>
        </motion.div>
        <motion.div
          className={styles.greetingIm}
          variants={imWrapperVariants}
          transition={imWrapperTransition}
        >
          <motion.h3 variants={imVariants}>I'm</motion.h3>
        </motion.div>
      </motion.div>
      <motion.div className={styles.name}>
        <motion.div
          variants={nameWrapperVariants}
          transition={nameWrapperTransition}
          className={styles.nameContent}
        >
          <motion.h1 variants={nameVariants}>Henry</motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Greeting
