import cn from 'classnames'
import { motion, useTime, useTransform } from 'framer-motion'
import React, { useEffect } from 'react'
import { useWindowDimensions } from '../../context/WindowDimensionsContext'
import styles from './welcome-wallpaper.module.scss'

type WelcomeLineProps = {
  fontSize?: number
  count?: number
}

const WelcomeLine = ({ fontSize = 25, count = 5 }: WelcomeLineProps) => {
  const welcomeList = []
  const welcomeWidth = fontSize * 5
  const viewBoxString = `0 0 400 ${fontSize}`

  for (let i = 0; i < count; i++) {
    welcomeList.push(
      <motion.text
        x={i * welcomeWidth}
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
  const perLineCount = 5
  const lineCount = 30
  const fontSize = 20

  const time = useTime()
  const value = useTransform(
    time,
    [0, 4000], // For every 4 seconds...
    [0, 360], // ...rotate 360deg
    { clamp: false }
  )

  const pageList = []
  for (let i = 0; i < lineCount; i++) {
    let _y = i * (width / fontSize) - height / 2
    pageList.push(
      <motion.div
        animate={{ x: value.get() }}
        className={cn({
          [styles.line]: true,
        })}
        style={{ top: `${_y}px` }}
      >
        <WelcomeLine count={perLineCount} fontSize={fontSize} />
      </motion.div>
    )
  }

  return <div className={styles.wrapper}>{pageList}</div>
}

export default WelcomeWallpaper
