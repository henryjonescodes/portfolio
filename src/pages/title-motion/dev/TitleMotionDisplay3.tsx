import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "zonez-ui/button/Button"
import AnimatedText from "./components/AnimatedText"
import { getLetterLists } from "./hooks/useAnimatedCharacters"

import cn from "classnames"
import css from "./title-motion-dev.module.scss"
const styles = css as any

type AnimatedCharactersProps = {
  text: string
  layoutId: string
  className?: string
}

// const AnimatedCharacters = ({
//   text,
//   layoutId,
//   className,
// }: AnimatedCharactersProps) => {
//   return <></>
// }

const Letters = ({
  letterLists,
  layoutId = "letters",
  className,
  letterClassName,
  toggle,
}: {
  letterLists: string[][]
  layoutId?: string
  className?: string
  letterClassName?: string
  toggle?: boolean
}) => {
  const internalClassName = className || ""
  const internalLetterClassName = letterClassName || ""

  const lettersVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    hidden: {},
  }

  const letterVariants = {
    visible: {
      scale: 1.3,
    },
    hidden: {
      scale: 0.8,
    },
  }

  return (
    <motion.span
      variants={lettersVariants}
      initial="hidden"
      // animate="visible"
      animate={toggle ? "visible" : "hidden"}
      className={cn({
        [styles.letters]: true,
        [internalClassName]: !!className,
      })}
    >
      {letterLists.map((list, index) => {
        return (
          <>
            {list.map((letter, index2) => {
              if (toggle) {
                return null
              }
              return (
                <motion.h3
                  variants={letterVariants}
                  className={cn({
                    [styles.letter]: true,
                    [internalLetterClassName]: !!letterClassName,
                  })}
                  key={`${layoutId}-${letter}-${index}:${index2}`}
                  layoutId={`${layoutId}-${letter}-${index}:${index2}`}
                >
                  {letter}
                </motion.h3>
              )
            })}
          </>
        )
      })}
    </motion.span>
  )
}

const TitleMotionDisplay3 = () => {
  const letterLists = getLetterLists("Hank Tha Tanq")

  const [toggle, setToggle] = useState(false)

  const handleTransition = () => {
    setToggle(!toggle)
  }

  return (
    <div className={styles.wrapper}>
      {/* <span className={styles.header}></span> */}
      {/* <div className={styles.body}>
        <Letters toggle={toggle} letterLists={letterLists} />
        <Letters toggle={!toggle} letterLists={letterLists} />
      </div> */}
      <div className={styles.body}>
        {/* {toggle && (
            <Letters
              className={styles.letters__top}
              toggle={toggle}
              letterLists={letterLists}
              layoutId={"letters2"}
            />
          )}
          {!toggle && (
            <Letters
              className={styles.letters__bottom}
              toggle={!toggle}
              letterLists={letterLists}
              layoutId={"letters2"}
            />
          )} */}
        <Letters
          className={styles.letters__top}
          toggle={toggle}
          letterLists={letterLists}
          layoutId={"letters2"}
        />
        <Letters
          className={styles.letters__bottom}
          toggle={!toggle}
          letterLists={letterLists}
          layoutId={"letters2"}
        />
      </div>

      <span className={styles.footer}>
        <Button className={styles.button} onClick={handleTransition}>
          Transition
        </Button>
      </span>
    </div>
  )
}

export default TitleMotionDisplay3
