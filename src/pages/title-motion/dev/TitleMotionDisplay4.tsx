import React, { useRef, useState } from "react"
import css from "./title-motion-dev.module.scss"
import { motion, AnimatePresence } from "framer-motion"
import cn from "classnames"
import Button from "@zui/button/Button"
import AnimatedText from "@components/AnimatedText"
import { getLetterLists } from "./hooks/useAnimatedCharacters"

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
  layoutId,
  className,
  letterClassName,
  toggle,
  ref,
}: {
  letterLists: string[][]
  layoutId: string
  className?: string
  letterClassName?: string
  toggle?: boolean
  ref?: any
}) => {
  const internalClassName = className || ""
  const internalLetterClassName = letterClassName || ""

  const lettersVariants = {
    visible: {
      transition: {
        staggerChildren: 0.025,
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
      initial={toggle ? "visible" : "hidden"}
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

const TitleMotionDisplay4 = () => {
  const letterLists = getLetterLists("Hank Tha Tanq")
  const [toggle, setToggle] = useState(false)

  const firstRef = useRef(null)
  const secondRef = useRef(null)

  const handleTransition = () => {
    setToggle(!toggle)
  }

  // Placeholder text data, as if from API
  const placeholderText = [{ type: "heading1", text: "Henry Jones" }]

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  }

  return (
    <div className={styles.wrapper}>
      {/* <span className={styles.header}></span> */}
      <div className={styles.body}>
        <Letters
          ref={firstRef}
          toggle={toggle}
          letterLists={letterLists}
          layoutId={"letters"}
        />
        <Letters
          ref={secondRef}
          toggle={!toggle}
          letterLists={letterLists}
          layoutId={"letters"}
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

export default TitleMotionDisplay4
