import React, { useState } from "react"
import css from "./title-motion-dev.module.scss"
import { motion, AnimatePresence } from "framer-motion"
import cn from "classnames"
import Button from "@zui/button/Button"
import AnimatedText from "./components/AnimatedText"

const styles = css as any
const TitleMotionDisplay2 = () => {
  const handleTransition = () => {}
  const [replay, setReplay] = useState(true)
  // Placeholder text data, as if from API
  const placeholderText = [{ type: "heading1", text: "Henry Jones" }]

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  }

  // Quick and dirt for the example
  const handleReplay = () => {
    setReplay(!replay)
    setTimeout(() => {
      setReplay(true)
    }, 600)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.header}></span>
      <div className={styles.body}>
        <motion.div
          className="App"
          initial="hidden"
          // animate="visible"
          animate={replay ? "visible" : "hidden"}
          variants={container}
        >
          <div className="container">
            {placeholderText.map((item, index) => {
              return <AnimatedText {...item} key={index} />
            })}
          </div>
          <button onClick={handleReplay}>
            Replay <span>⟲</span>
          </button>
        </motion.div>
      </div>
      <span className={styles.footer}>
        <Button className={styles.button} onClick={handleTransition}>
          Transition
        </Button>
      </span>
    </div>
  )
}

export default TitleMotionDisplay2
