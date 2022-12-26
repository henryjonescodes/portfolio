import cn from "classnames"
import { motion } from "framer-motion"
import { useState } from "react"
import Button from "zonez-ui/button/Button"
import css from "./title-motion-dev.module.scss"
import { useLetterMotion } from "./hooks/useLetterMotion"
const styles = css as any

////////////////////////////////
//         DEPRECATED         //
////////////////////////////////

type LetterMotionProps = {
  layoutId: string
  className?: string
  letter: string
  visible?: boolean
}

const LetterMotion = ({
  layoutId,
  className,
  letter,
  visible = true,
}: LetterMotionProps) => {
  const internalClassName = className || ""
  if (!visible) {
    return null
  }
  return (
    <motion.h3
      layoutId={layoutId}
      className={cn({
        [styles.LetterMotion]: true,
        [internalClassName]: !!className,
      })}
    >
      {letter}
    </motion.h3>
  )
}

const TitleMotionDisplay8 = () => {
  const [toggle, setToggle] = useState(false)
  const { letterLists, currentLetter, getStateForLetter } = useLetterMotion(
    "hank tha tank",
    toggle
  )

  const handleTransition = () => {
    setToggle(!toggle)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.letterMotion__top}>
          {letterLists.map((list, a) => {
            return (
              <>
                {list.map((letter, b) => {
                  return (
                    <LetterMotion
                      layoutId={`${letter.letter}-${a}:${b}`}
                      letter={letter.letter}
                      visible={getStateForLetter({ i: a, j: b })}
                    />
                  )
                })}
                {"\u00A0"}
              </>
            )
          })}
        </div>
        <div className={styles.letterMotion__bottom}>
          {letterLists.map((list, a) => {
            return (
              <>
                {list.map((letter, b) => {
                  return (
                    <LetterMotion
                      layoutId={`${letter.letter}-${a}:${b}`}
                      letter={letter.letter}
                      visible={!getStateForLetter({ i: a, j: b })}
                    />
                  )
                })}
                {"\u00A0"}
              </>
            )
          })}
        </div>
      </div>
      <span className={styles.footer}>
        <Button className={styles.button} onClick={handleTransition}>
          {toggle ? "ON" : "OFF"}
        </Button>
      </span>
    </div>
  )
}

export default TitleMotionDisplay8
