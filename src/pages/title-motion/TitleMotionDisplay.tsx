import React, { useState } from "react"
import css from "./title-motion.module.scss"
import { motion, AnimatePresence } from "framer-motion"
import cn from "classnames"
import Button from "zonez-ui/button/Button"

const styles = css as any
const TitleMotionDisplay = () => {
  const [inHeader, setInHeader] = useState<boolean>(false)

  const handleTransition = () => {
    setInHeader(!inHeader)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>
        {inHeader && (
          <motion.div
            className={cn({
              [styles.motionWrapper]: true,
              [styles.motionWrapper__header]: true,
            })}
            layoutId={"title"}
          >
            <motion.h5
              className={cn({
                [styles.motionText]: true,
                [styles.motionText__header]: true,
              })}
            >
              TEST
            </motion.h5>
          </motion.div>
        )}
      </span>
      <div className={styles.body}>
        {!inHeader && (
          <motion.div
            layoutId={"title"}
            className={cn({
              [styles.motionWrapper]: true,
              [styles.motionWrapper__hero]: true,
            })}
          >
            <motion.h1
              className={cn({
                [styles.motionText]: true,
                [styles.motionText__hero]: true,
              })}
            >
              TEST
            </motion.h1>
          </motion.div>
        )}
      </div>
      <span className={styles.footer}>
        <Button className={styles.button} onClick={handleTransition}>
          Transition
        </Button>
      </span>
    </div>
  )
}

export default TitleMotionDisplay
