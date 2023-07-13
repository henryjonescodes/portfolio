import SnapCarousel, {
  SnapCarouselPaneProps,
} from '@components/snap-carousel/SnapCarousel'
import { Variant } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Greeting from './Greeting'
import styles from './intro.module.scss'
import MicroBio from './MicroBio'
import SphereScene from './SphereScene'
import WaveBreak from '../components/wave-break'

type Props = {} & Omit<SnapCarouselPaneProps, 'children'>

export type IntroTransitionType = { visible: Variant; hidden: Variant }
const MAX_ANIMATION_INDEX = 2

const Intro = ({ containerRef }: Props) => {
  const [animationIndex, setAnimationIndex] = useState<number>(0)

  useEffect(() => {
    if (animationIndex <= 0 || animationIndex >= MAX_ANIMATION_INDEX) {
      return
    }
    const timer = setTimeout(() => {
      setAnimationIndex((prevIndex) => prevIndex + 1)
    }, 2000)

    return () => clearTimeout(timer)
  }, [animationIndex])

  const onClick = () => {
    if (animationIndex === 0) {
      setAnimationIndex(1)
      return
    }
    setAnimationIndex(0)
  }

  return (
    <SnapCarousel.Pane
      containerRef={containerRef}
      contentClassName={styles.intro}
    >
      {/* <SphereScene /> */}
      <div className={styles.introHeader}>
        <Greeting visible={animationIndex > 0} />
        <MicroBio visible={animationIndex > 1}>
          Software engineer and digital artist
        </MicroBio>
        <div className={styles.button} onClick={onClick}>
          Press Me
        </div>
      </div>
      <WaveBreak />
    </SnapCarousel.Pane>
  )
}

export default Intro
