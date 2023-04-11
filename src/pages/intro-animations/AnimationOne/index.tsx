import { useEffect, useRef, useState } from "react"
import Button from "zonez-ui/button/Button"
import css from "./animation-one.module.scss"
import Stripes from "./components/Stripes"
import { Header, Hero } from "./components/Text"
const styles = css as any

const variantList = ["initial", "hello", "hello2", "collapse", "mini"] as const
export type GlobalVariants = typeof variantList[number]

const times = {
  initial: 10,
  hello: 3000,
  hello2: 600,
  collapse: 200,
  mini: 10,
}
const AnimationOne = () => {
  const [active, setActive] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const timerRef = useRef<any>(null)
  const [currentVariant, setCurrentVariant] =
    useState<GlobalVariants>("initial")

  const next = () => {
    const workingIndex = currentIndex + 1
    if (workingIndex > variantList.length - 1) {
      setActive(false)
      return null
    }
    setCurrentIndex(workingIndex)
    setCurrentVariant(variantList[workingIndex])
    console.log("timer fired", workingIndex, variantList[workingIndex])
  }

  const reset = () => {
    setActive(false)
    setCurrentIndex(0)
    setCurrentVariant("initial")
    clearTimeout(timerRef.current)
  }

  const toggle = () => {
    switch (currentVariant) {
      case "initial":
        setCurrentVariant("hello")
        break
      case "hello":
        setCurrentVariant("hello2")
        break
      case "hello2":
        setCurrentVariant("collapse")
        break
      case "collapse":
        setCurrentVariant("mini")
        break
      case "mini":
        setCurrentVariant("initial")
        break
    }
  }

  useEffect(() => {
    if (active) {
      timerRef.current = setTimeout(() => {
        next()
      }, times[currentVariant])
      return () => {
        clearTimeout(timerRef.current)
      }
    }
  }, [active, currentVariant])

  return (
    <div className={styles.wrapper}>
      <Header currentVariant={currentVariant} />
      <div className={styles.body}>
        <Stripes currentVariant={currentVariant} />
        <Hero currentVariant={currentVariant} />
        <div className={styles.buttons}>
          <Button
            onClick={() => {
              toggle()
            }}
          >
            Toggle
          </Button>
          <Button
            onClick={() => {
              reset()
            }}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              setActive(!active)
            }}
          >
            {active ? "off" : "on"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AnimationOne
