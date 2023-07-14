import React, { useEffect, useState } from 'react'
import styles from './welcome-wallpaper.module.scss'
import useFullScreenViewBox from '@hooks/useFullScreenViewBox'
import { useWindowDimensions } from '../../context/WindowDimensionsContext'
import {
  MotionValue,
  animate,
  motion,
  useMotionValue,
  useTime,
  useTransform,
} from 'framer-motion'

type SingleWelcomeProps = {
  x?: number
  fontSize: number
  value: MotionValue<number>
  index: number
}

type WelcomeLineProps = {
  y?: number
  fontSize?: number
  count?: number
}

const SingleWelcome = ({
  x = 0,
  fontSize = 20,
  value,
  index,
}: SingleWelcomeProps) => {
  // const localValue = useMotionValue(x)
  // const welcomeWidth = fontSize * 5

  // useEffect(() => {
  //   console.log('update', localValue.getx)
  //   localValue.set(value.get() + welcomeWidth * index)
  // }, [value])

  return (
    <motion.text
      x={x}
      // x={localValue}
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

const WelcomeLine = ({ y = 0, fontSize = 20, count = 5 }: WelcomeLineProps) => {
  const welcomeList = []
  const welcomeWidth = fontSize * 5
  const viewBoxString = `0 0 400 ${fontSize}`
  const time = useTime()
  const value = useTransform(
    time,
    [0, 4000], // For every 4 seconds...
    [0, 360], // ...rotate 360deg
    { clamp: false }
  )

  for (let i = 0; i < count; i++) {
    welcomeList.push(
      <SingleWelcome
        x={i * welcomeWidth + value.get()}
        value={value}
        index={i}
        fontSize={fontSize}
      />
    )
  }

  return (
    <motion.svg
      className={styles.text}
      viewBox={viewBoxString}
      xmlns="http://www.w3.org/2000/svg"
      y={y}
    >
      {welcomeList}
      <motion.rect x="0" y={0} width="100%" height="100%" fill="green" />
    </motion.svg>
  )
}

const WelcomeWallpaper = () => {
  const { viewBoxString } = useFullScreenViewBox()
  const { width, height } = useWindowDimensions()
  const perLineCount = 5
  const lineCount = 30
  const fontSize = 20

  const pageList = []
  for (let i = 0; i < lineCount; i++) {
    pageList.push(
      <WelcomeLine
        y={i * (width / fontSize) - height / 2}
        count={perLineCount}
        fontSize={fontSize}
      />
    )
  }

  return (
    <div className={styles.wrapper}>
      <motion.svg viewBox={viewBoxString}>
        {/* <rect x="0" y={0} width="100%" height="100%" fill="green" /> */}
        {pageList}
      </motion.svg>
    </div>
  )
}

export default WelcomeWallpaper
