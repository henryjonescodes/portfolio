import { useEffect, useState } from "react"

/////////////////////////////////////
//              TYPES              //
/////////////////////////////////////

export type IndexType = { i: number; j: number }

type CurrentLetterType = {
  letter: LetterListType
  index: IndexType
} | null

export type LetterListType = { letter: string; active: boolean }

type UseLetterMotionType = {
  letterLists: LetterListType[][]
  getStateForLetter: (index: IndexType) => boolean | undefined
}

type SettingsType = {
  delayInMS: number
}

/////////////////////////////////////
//        GET LETTER LISTS         //
/////////////////////////////////////

export const getLetterLists = (text: string) => {
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

export const useLetterMotion = (
  words: string,
  resetExternal?: boolean,
  settings?:SettingsType

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

  /////////////////////////////////////
  //      GET STATE FOR LETTER       //
  /////////////////////////////////////

  const getStateForLetter = (index: IndexType): boolean | undefined => {
    if (!listState) {
      return undefined
    }
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
    if (!reset) {
      setReset(true)
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
      }, settings?.delayInMS || 200)
      return () => clearTimeout(timer)
    }
  }, [currentLetter])

  return {
    letterLists: listState || [],
    getStateForLetter,
  }
}
