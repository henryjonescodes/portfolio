import React, { useEffect, useRef, useState } from "react"
import css from "./animation-one.module.scss"
import { motion } from "framer-motion"
import Button from "zonez-ui/button/Button"
const styles = css as any

type LineStates = "up" | "down" | "center" | null
type LineProps = {
  isRunning: boolean
  duration: number
}

const Line = ({ isRunning, duration }: LineProps) => {
  const [currentState, setCurrentState] = useState<LineStates>("down")
  const timerRef = useRef<any>(null)
  const variant = {
    up: { y: -20 },
    down: {
      y: 20,
    },
    center: {
      y: 0,
    },
  }

  // const next = () => {
  //   console.log("next", currentState, isRunning)
  //   if (isRunning) {
  //     timerRef.current = setTimeout(() => {
  //       if (currentState === "down") {
  //         setCurrentState("up")
  //       } else {
  //         setCurrentState("down")
  //       }
  //       next()
  //     }, 1000)
  //   }
  // }

  useEffect(() => {
    if (currentState === "down") {
      setCurrentState("up")
    } else {
      setCurrentState("down")
    }
    // if (isRunning) {
    //   next()
    //   return
    // }
    // setCurrentState("down")
    // return () => {
    //   clearTimeout(timerRef.current)
    // }
  }, [isRunning])

  return (
    <motion.div
      variants={variant}
      className={styles.line}
      onTransitionEnd={() => {
        console.log("onTransitionEnd")
        if (currentState === "down") {
          setCurrentState("up")
        } else {
          setCurrentState("down")
        }
      }}
      transition={{
        duration: 0.5,
      }}
    />
  )
}

const AnimationOne = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const numLines = 14
  const lines = []

  for (let i = 0; i < numLines; i++) {
    lines.push(<Line duration={500} isRunning={isRunning} key={i} />)
  }
  return (
    <>
      <div className={styles.animationOne}>{lines}</div>
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "off" : "on"}
      </Button>
    </>
  )
}

export default AnimationOne
