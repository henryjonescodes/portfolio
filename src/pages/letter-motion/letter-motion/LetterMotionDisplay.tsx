import cn from "classnames"
import { motion } from "framer-motion"
import { useState } from "react"
import Button from "@zui/button/Button"
import css from "./letter-motion.module.scss"
import { IndexType, LetterListType, useLetterMotion } from "./useLetterMotion"
const styles = css as any

type LetterProps = {
  layoutId: string
  className?: string
  letter: string
  visible?: boolean
}

type WordsProps = {
  className?: string
  visibleWhenTrue?: boolean
  letterClassName?: string
  layoutId?: string
  letterLists: LetterListType[][]
  getStateForLetter: (i: IndexType) => boolean | undefined
}

const Letter = ({
  layoutId,
  className,
  letter,
  visible = true,
}: LetterProps) => {
  const internalClassName = className || ""
  if (!visible) {
    return null
  }
  return (
    <motion.h3
      layoutId={layoutId}
      className={cn({
        [styles.letter]: true,
        [internalClassName]: !!className,
      })}
    >
      {letter}
    </motion.h3>
  )
}

const Words = ({
  letterLists,
  getStateForLetter,
  className,
  letterClassName,
  visibleWhenTrue = true,
  layoutId,
}: WordsProps) => {
  const internalClassName = className || ""
  const internalLetterClassName = letterClassName || ""

  return (
    <div
      className={cn({ [styles.text]: true, [internalClassName]: !!className })}
    >
      {letterLists.map((list, a) => {
        return (
          <>
            {list.map((letter, b) => {
              return (
                <Letter
                  layoutId={`${layoutId}-${letter.letter}-${a}:${b}`}
                  letter={letter.letter}
                  visible={
                    visibleWhenTrue
                      ? getStateForLetter({ i: a, j: b })
                      : !getStateForLetter({ i: a, j: b })
                  }
                  className={cn({
                    [internalLetterClassName]: !!letterClassName,
                  })}
                />
              )
            })}
            {"\u00A0"}
          </>
        )
      })}
    </div>
  )
}

const LetterMotionDisplay = () => {
  const [toggle, setToggle] = useState(false)
  const { letterLists, getStateForLetter } = useLetterMotion(
    "Henry Jones",
    toggle,
    { delayInMS: 300 }
  )

  const handleTransition = () => {
    setToggle(!toggle)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>
        <Words
          layoutId={"wordsText"}
          letterLists={letterLists}
          getStateForLetter={getStateForLetter}
          className={styles.text__header}
          letterClassName={styles.letter__header}
        />
      </span>
      <div className={styles.body}>
        <Words
          layoutId={"wordsText"}
          letterLists={letterLists}
          getStateForLetter={getStateForLetter}
          className={styles.text__hero}
          letterClassName={styles.letter__hero}
          visibleWhenTrue={false}
        />
      </div>
      <span className={styles.footer}>
        <Button className={styles.button} onClick={handleTransition}>
          {toggle ? "ON" : "OFF"}
        </Button>
      </span>
    </div>
  )
}

export default LetterMotionDisplay
