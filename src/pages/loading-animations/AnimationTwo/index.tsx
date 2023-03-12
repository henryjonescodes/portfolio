import { motion } from "framer-motion"
import { useState } from "react"
import Button from "zonez-ui/button/Button"
import css from "./animation-two.module.scss"
const styles = css as any

type LineProps = {
  isRunning: boolean
}

const container = {
  off: { opacity: 0 },
  on: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  off: { opacity: 0 },
  on: {
    scale: [0.9, 1.1],
    transition: { times: [0, 0.5], repeat: Infinity },
    opacity: 1,
  },
}

const Line = ({ isRunning }: LineProps) => {
  return <motion.div variants={item} className={styles.line} />
}

const AnimationTwo = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const numLines = 40
  const lines = []

  for (let i = 0; i < numLines; i++) {
    lines.push(<Line isRunning={isRunning} key={i} />)
  }
  return (
    <>
      <motion.div
        variants={container}
        initial="off"
        animate="on"
        className={styles.animation}
      >
        {lines}
      </motion.div>
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "off" : "on"}
      </Button>
    </>
  )
}

export default AnimationTwo
