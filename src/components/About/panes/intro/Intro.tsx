import SnapCarousel, {
  SnapCarouselPaneProps,
} from '@components/SnapCarousel/SnapCarousel'
import { SpringOptions, Transition, Variant, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useWindowDimensions } from '../../../../context/WindowDimensionsContext'
import styles from './intro.module.scss'

type Props = {} & Omit<SnapCarouselPaneProps, 'children'>

const HELLO_ROTATION = 10
const NAME_ROTATION = 5

type TextAnimationType = { visible: Variant; hidden: Variant }

const Intro = ({ containerRef }: Props) => {
  const { height } = useWindowDimensions()

  const hiVariants: TextAnimationType = {
    visible: {
      rotate: HELLO_ROTATION,
      x: 10,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        type: 'spring',
        stiffness: 20,
        mass: 10,
        damping: 20,
      },
    },
    hidden: {
      rotate: -HELLO_ROTATION,
      x: -10,
    },
  }

  const imVariants: TextAnimationType = {
    visible: {
      rotate: -HELLO_ROTATION,
      x: -10,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        type: 'spring',
        stiffness: 20,
        mass: 10,
        damping: 20,
      },
    },
    hidden: {
      rotate: HELLO_ROTATION,
      x: 10,
    },
  }
  const nameVariants: TextAnimationType = {
    visible: {
      rotate: -NAME_ROTATION,
      x: -10,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        type: 'spring',
        stiffness: 20,
        mass: 10,
        damping: 20,
      },
    },
    hidden: {
      rotate: NAME_ROTATION,
      x: 10,
    },
  }

  const nameWrapperVariants: TextAnimationType = {
    visible: {
      y: 0,
    },
    hidden: {
      y: height,
    },
  }
  const hiWrapperVariants: TextAnimationType = {
    visible: {
      y: 0,
      x: 0,
    },
    hidden: {
      y: height,
      x: -100,
    },
  }

  const hiWrapperTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 25,
    mass: 6,
  }
  const imWrapperVariants: TextAnimationType = {
    visible: {
      y: 0,
      x: 0,
    },
    hidden: {
      y: height,
      x: 100,
    },
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

  const [visible, setVisible] = useState<boolean>(false)

  const onClick = () => {
    setVisible(!visible)
  }

  return (
    <SnapCarousel.Pane
      containerRef={containerRef}
      contentClassName={styles.intro}
    >
      <motion.div
        className={styles.introHeader}
        animate={visible ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.03, staggerDirection: -1 }}
      >
        <motion.div className={styles.hello}>
          <motion.div
            className={styles.helloHi}
            variants={hiWrapperVariants}
            transition={hiWrapperTransition}
          >
            <motion.h3 variants={hiVariants}>Hi,</motion.h3>
          </motion.div>
          <motion.div
            className={styles.helloIm}
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
        {/* <div>
          <p>
            I'm a full-stack developer and digital artist with a passion for UX
            and 3D interfaces
          </p>
        </div> */}
        <div className={styles.button} onClick={onClick}>
          Press Me
        </div>
      </motion.div>
    </SnapCarousel.Pane>
  )
}

export default Intro
