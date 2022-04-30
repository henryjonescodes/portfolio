import Button from "@zui/button/Button"
import cn from "classnames"
import { motion } from "framer-motion"
import { useState } from "react"
import css from "./title-motion-dev.module.scss"
const styles = css as any

type LetterMotionProps = {
  layoutId: string
  className: string
  letter: string
}

const LetterMotion = ({ layoutId, className, letter }: LetterMotionProps) => {
  return (
    <motion.h3
      layoutId={layoutId}
      className={cn({
        [styles.LetterMotion]: true,
        [className]: !!className,
      })}
    >
      {letter}
    </motion.h3>
  )
}

const TitleMotionDisplay5 = () => {
  const [toggle, setToggle] = useState(false)

  const handleTransition = () => {
    setToggle(!toggle)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        {toggle && (
          <LetterMotion
            className={styles.letterMotion__top}
            layoutId={"letterMotion"}
            letter={"H"}
          />
        )}
        {!toggle && (
          <LetterMotion
            className={styles.letterMotion__bottom}
            layoutId={"letterMotion"}
            letter={"H"}
          />
        )}
      </div>
      <span className={styles.footer}>
        <Button className={styles.button} onClick={handleTransition}>
          {toggle ? "ON" : "OFF"}
        </Button>
      </span>
    </div>
  )
}

export default TitleMotionDisplay5
