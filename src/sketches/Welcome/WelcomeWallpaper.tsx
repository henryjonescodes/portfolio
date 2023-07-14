import cn from 'classnames'
import { motion, useMotionValue, useTime, useTransform } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from '../../context/WindowDimensionsContext'
import styles from './welcome-wallpaper.module.scss'

type WelcomeLineProps = {
  fontSize: number
  count: number
  singleWidth: number
  inverted?: boolean
}

const WelcomeLine = ({
  fontSize,
  count,
  singleWidth,
  inverted,
}: WelcomeLineProps) => {
  const { width, height } = useWindowDimensions()
  const welcomeList = []
  const viewBoxString = `0 0 400 ${fontSize}`
  if (inverted) {
    for (let i = count; i >= 0; i--) {
      welcomeList.push(
        <motion.text
          x={i * singleWidth - fontSize / 6}
          y={'100%'}
          height="100"
          width="100"
          className="small"
          fontSize={fontSize}
        >
          WELCOME
        </motion.text>
      )
    }
  } else {
    for (let i = 0; i < count; i++) {
      welcomeList.push(
        <motion.text
          x={i * singleWidth + fontSize / 3}
          y={'100%'}
          height="100"
          width="100"
          className="small"
          fontSize={fontSize}
        >
          WELCOME
        </motion.text>
      )
    }
  }

  return (
    <motion.svg
      className={styles.text}
      viewBox={viewBoxString}
      xmlns="http://www.w3.org/2000/svg"
      height={100}
    >
      {welcomeList}
    </motion.svg>
  )
}

const WelcomeWallpaper = () => {
  const { width, height } = useWindowDimensions()
  const [currentMode, setCurrentMode] = useState('off')
  const perLineCount = 3
  const lineCount = 10
  const fontSize = 20
  const singleWidth = fontSize * 5

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentMode('on')
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // const backAndForth = {
  //   off: {},
  //   on: {
  //     x: [0, width],
  //     transition: {
  //       times: [0, 1],
  //       repeat: Infinity,
  //       repeatType: 'reverse',
  //       type: 'spring',
  //       stiffness: 20,
  //       mass: 0.4,
  //     },
  //   },
  // }
  const backAndForth = {
    off: {
      x: 0,
    },
    on: {
      x: [0, width],
      transition: {
        times: [0, 1],
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 4,
      },
    },
  }
  // const backAndForth = {
  //   off: {},
  //   on: {
  //     x: [0, width, 0],
  //     transition: {
  //       times: [0, , 0.5, 1],
  //       repeat: Infinity,
  //       // duration: 5,
  //       // type: 'inertia',
  //       // velocity: 500,
  //       type: 'spring',
  //       // bounce: 0.25,
  //       // type: 'spring',
  //       // stiffness: 200,
  //       mass: 0.1,
  //     },
  //   },
  // }

  const pageList = []
  for (let i = 0; i < lineCount; i++) {
    pageList.push(
      <motion.div
        // initial={{ x: width / 2 }}
        variants={backAndForth}
        className={cn({
          [styles.line]: true,
        })}
      >
        <motion.div className={styles.lineContent}>
          <motion.div className={styles.lineLeft}>
            <WelcomeLine
              inverted={true}
              count={perLineCount}
              fontSize={fontSize}
              singleWidth={singleWidth}
            />
          </motion.div>
          <motion.div className={styles.lineRight}>
            <WelcomeLine
              count={perLineCount}
              fontSize={fontSize}
              singleWidth={singleWidth}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      transition={currentMode === 'on' && { staggerChildren: 0.5 }}
      animate={currentMode}
      className={styles.wrapper}
    >
      {pageList}
    </motion.div>
  )
}

export default WelcomeWallpaper
