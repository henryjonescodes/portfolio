import cn from "classnames"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Button from "zonez-ui/button/Button"
import css from "./title-motion-dev.module.scss"
const styles = css as any

type LetterMotionProps = {
  layoutId: string
  className?: string
  letter: string
  visible?: boolean
}

// type LetterMotionType = Omit<LetterMotionProps, "className">

type LetterListType = { letter: string; active: boolean }

const getLetterLists = (text: string) => {
  const splitWords = text.split(" ")
  const letterLists: LetterListType[][] = []

  splitWords.forEach((item) => {
    letterLists.push(
      item.split("").map((letter) => {
        return { letter, active: false }
      })
    )
  })

  return letterLists
}
type UseLetterMotionType = {
  letterLists: LetterListType[][]
  currentLetter: CurrentLetterType
  getStateForLetter: (index: IndexType) => boolean | undefined
}

type IndexType = { i: number; j: number }

type CurrentLetterType = {
  letter: LetterListType
  index: IndexType
} | null

const useLetterMotion = (
  words: string,
  resetExternal?: boolean
): UseLetterMotionType => {
  const letterLists = getLetterLists(words) || []

  /////////////////////////////////////
  //              STATE              //
  /////////////////////////////////////

  const [currentLetter, setCurrentLetter] = useState<CurrentLetterType>(null)
  const [reset, setReset] = useState<boolean>(true)
  const [direction, setDirection] = useState<boolean>(false)
  const [listState, setListState] = useState<LetterListType[][] | null>(null)

  /////////////////////////////////////
  //         GET NEXT LETTER         //
  /////////////////////////////////////

  const getNextLetter = (direction?: boolean | null) => {
    if (!currentLetter || !listState) {
      return null
    }

    const numInWord = listState[currentLetter.index.i].length

    // Try to return from the next word, null if not found
    if (currentLetter.index.j >= numInWord - 1) {
      if (!listState[currentLetter.index.i + 1]?.length) {
        return null
      }
      let newList = [...listState]
      newList[currentLetter.index.i + 1][0].active = direction || false

      setListState(newList)

      return {
        letter: listState[currentLetter.index.i + 1][0],
        index: { i: currentLetter.index.i + 1, j: 0 },
      }
    }

    let newList = [...listState]
    newList[currentLetter.index.i][currentLetter.index.j + 1].active =
      direction || false

    setListState(newList)

    return {
      letter: listState[currentLetter.index.i][currentLetter.index.j + 1],
      index: { i: currentLetter.index.i, j: currentLetter.index.j + 1 },
    }
  }

  const getStateForLetter = (index: IndexType): boolean | undefined => {
    if (!listState) {
      return undefined
    }
    console.log(index, listState[index.i][index.j].active)
    return listState[index.i][index.j].active
  }

  /////////////////////////////////////
  //              Effect             //
  /////////////////////////////////////

  useEffect(() => {
    return () => {
      if (listState) {
        setListState(null)
      }
    }
  }, [])

  useEffect(() => {
    console.log("RESET", listState, resetExternal)

    if (!reset) {
      setReset(true)
      console.log("set direction: ", resetExternal)
      setDirection(resetExternal || false)
      setCurrentLetter(null)
      if (!!resetExternal) {
      }
    }
  }, [resetExternal])

  useEffect(() => {
    if (!listState && !!letterLists) {
      setListState(letterLists)
    } else {
    }
  }, [letterLists])

  useEffect(() => {
    if (!reset) {
      return
    }
    if (reset) {
      if (!!listState && !currentLetter) {
        let newList = [...listState]
        newList[0][0].active = direction || false

        setListState(newList)
        setCurrentLetter({
          letter: {
            letter: listState[0][0].letter,
            active: direction,
          },
          index: { i: 0, j: 0 },
        })
        setReset(false)
      }
    }
  }, [listState, reset])

  useEffect(() => {
    if (currentLetter !== null) {
      const timer = setTimeout(() => {
        setCurrentLetter(getNextLetter(direction))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentLetter])

  return {
    letterLists: listState || [],
    getStateForLetter,
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

const TitleMotionDisplay7 = () => {
  const [toggle, setToggle] = useState(false)
  const { letterLists, currentLetter, getStateForLetter } = useLetterMotion(
    "hank tha tank",
    toggle
  )
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

export default TitleMotionDisplay7
