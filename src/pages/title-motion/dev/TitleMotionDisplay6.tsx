import React, { useEffect, useState } from "react"
import cn from "classnames"
import css from "./title-motion-dev.module.scss"
import Button from "zonez-ui/button/Button"
import { motion, AnimatePresence } from "framer-motion"
import { useRef } from "react"
const styles = css as any

type LetterMotionProps = {
  layoutId: string
  className?: string
  letter: string
  visible?: boolean
}

// type LetterMotionType = Omit<LetterMotionProps, "className">

const getLetterLists = (text: string) => {
  const splitWords = text.split(" ")
  const letterLists: string[][] = []

  splitWords.forEach((item) => {
    letterLists.push(item.split(""))
  })

  // // Add a space ("\u00A0") to the end of each word
  // letterLists.map((ll, index) => {
  //   if (index === letterLists.length - 1) {
  //     return
  //   }
  //   return ll.push("\u00A0")
  // })

  return letterLists
}
type UseLetterMotionType = {
  letterLists: string[][]
  currentLetter: CurrentLetterType
}

type CurrentLetterType = {
  letter: string
  index: { i: number; j: number }
} | null

const getNextLetter = (
  letterLists: string[][],
  currentLetter: CurrentLetterType
) => {
  if (!currentLetter) {
    return null
  }

  const numInWord = letterLists[currentLetter.index.i].length

  // Try to return from the next word, null if not found
  if (currentLetter.index.j >= numInWord - 1) {
    return letterLists[currentLetter.index.i + 1]?.length
      ? {
          letter: letterLists[currentLetter.index.i + 1][0],
          index: { i: currentLetter.index.i + 1, j: 0 },
        }
      : null
  }
  return {
    letter: letterLists[currentLetter.index.i][currentLetter.index.j + 1],
    index: { i: currentLetter.index.i, j: currentLetter.index.j + 1 },
  }
}

const useLetterMotion = (words: string): UseLetterMotionType => {
  const [currentLetter, setCurrentLetter] = useState<CurrentLetterType>(null)
  const [reset, setReset] = useState<boolean>(true)
  const letterLists = getLetterLists(words) || []

  useEffect(() => {
    if (reset) {
      if (!!letterLists && !currentLetter) {
        setCurrentLetter({ letter: letterLists[0][0], index: { i: 0, j: 0 } })
      }
      setReset(false)
    }
  }, [letterLists])

  useEffect(() => {
    if (currentLetter !== null) {
      const timer = setTimeout(() => {
        console.log("timed out letter: ", currentLetter)
        setCurrentLetter(getNextLetter(letterLists, currentLetter))
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentLetter])

  return {
    letterLists,
    currentLetter,
  }
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

const TitleMotionDisplay6 = () => {
  const [toggle, setToggle] = useState(false)
  const { letterLists, currentLetter } = useLetterMotion("hank tha tank")
  // console.log("letterLists, ", letterLists)

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
                      layoutId={`${letter}-${a}:${b}`}
                      letter={letter}
                      visible={toggle}
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
                      layoutId={`${letter}-${a}:${b}`}
                      letter={letter}
                      visible={!toggle}
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

export default TitleMotionDisplay6
