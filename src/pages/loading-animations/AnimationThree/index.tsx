import { useEffect, useRef, useState } from "react"
import Button from "@zui/button/Button"
import { Variants, motion } from "framer-motion"
import css from "./animation-three.module.scss"
const styles = css as any

const container = {
  off: { opacity: 0 },
  on: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const container1 = {
  off: { opacity: 0 },
  on: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const container2 = {
  off: { opacity: 0 },
  on: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  off: {},
  on: {
    y: [-10, 0, 10, 0],
    transition: {
      times: [0, 0.25, 0.5, 0.75],
      repeat: Infinity,
      type: "spring",
      stiffness: 100,
      repeatDelay: 0.5,
    },
  },
}
const item1 = {
  off: {},
  on: {
    y: [-10, 0, 10, 0],
    transition: {
      times: [0, 0.25, 0.5, 0.75],
      repeat: Infinity,
      type: "spring",
      stiffness: 100,
    },
  },
}
const item2 = {
  off: {},
  on: {
    y: [-10, 0, 10, 0],
    transition: {
      times: [0, 0.25, 0.5, 0.75],
      repeat: Infinity,
    },
  },
}
const item3 = {
  off: {},
  on: {
    y: [-20, 20],
    transition: {
      duration: 3.5,
      times: [0, 1],
      repeat: Infinity,
    },
  },
}
const item4 = {
  off: {},
  on: {
    y: [0, 20, 0, -20],
    transition: {
      duration: 1,
      times: [0, 0.25, 0.5, 0.75],
      repeat: Infinity,
    },
  },
}
const item5 = {
  off: {},
  on: {
    y: [0, 20, 0],
    transition: {
      duration: 1,
      times: [0, 0.25, 0.75],
      repeat: Infinity,
    },
  },
}

const makeMotionLines = (
  variants: Variants | undefined,
  numLines: number,
  currentColor: string
) => {
  const lines = []
  for (let i = 0; i < numLines; i++) {
    lines.push(
      <motion.div
        variants={variants}
        className={styles.line}
        style={{ backgroundColor: currentColor }}
        key={i}
      />
    )
  }
  return lines
}

const AnimationThree = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isParty, setIsParty] = useState<boolean>(false)
  const [currentColor, setCurrentColor] = useState<string>("")
  const timerRef = useRef<any>(null)
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ]

  useEffect(() => {
    if (isParty) {
      timerRef.current = setTimeout(() => {
        setCurrentColor(colors[Math.floor(Math.random() * colors.length)])
      }, 500)
      return () => {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentColor, isParty])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  const lines = makeMotionLines(item, 32, currentColor)
  const lines1 = makeMotionLines(item1, 32, currentColor)
  const lines2 = makeMotionLines(item2, 32, currentColor)
  const lines3 = makeMotionLines(item3, 32, currentColor)
  const lines4 = makeMotionLines(item4, 33, currentColor)
  const lines5 = makeMotionLines(item5, 33, currentColor)

  return (
    <div className={styles.wrapper}>
      <motion.div
        variants={container1}
        initial="off"
        animate={isRunning ? "on" : "off"}
        className={styles.animation}
      >
        {lines}
      </motion.div>
      <motion.div
        variants={container}
        initial="off"
        animate={isRunning ? "on" : "off"}
        className={styles.animation}
      >
        {lines1}
      </motion.div>
      <motion.div
        variants={container}
        initial="off"
        animate={isRunning ? "on" : "off"}
        className={styles.animation}
      >
        {lines2}
      </motion.div>
      <motion.div
        variants={container2}
        initial="off"
        animate={isRunning ? "on" : "off"}
        className={styles.animation}
      >
        {lines3}
      </motion.div>
      <motion.div
        variants={container2}
        initial="off"
        animate={isRunning ? "on" : "off"}
        className={styles.animation}
      >
        {lines4}
      </motion.div>
      <motion.div
        variants={container2}
        initial="off"
        animate={isRunning ? "on" : "off"}
        className={styles.animation}
      >
        {lines5}
      </motion.div>
      <span className={styles.buttons}>
        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "off" : "on"}
        </Button>
        <Button onClick={() => setIsParty(!isParty)}>
          {isParty ? "chill" : "party"}
        </Button>
      </span>
    </div>
  )
}

export default AnimationThree
