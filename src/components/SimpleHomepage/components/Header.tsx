import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import React, { useRef } from 'react'
import styles from './simple-homepage-components.module.scss'

const HeaderLogo = () => {
  return <div className={styles.headerLogo}>logo</div>
}

const HeaderButtons = () => {
  return <span className={styles.headerButtons}>buttons</span>
}

type Props = {
  scrollY: MotionValue<number>
}

const Header = ({ scrollY }: Props) => {
  const RANGE_MAXIMUM = 100
  const HEADER_HEIGHT = 64
  const down = useRef<boolean>(false)
  const prev = useRef<number>(-1)

  const scrollDiff = useMotionValue(0)
  const height = useTransform(
    scrollDiff,
    [0, HEADER_HEIGHT],
    // Into these values:
    [0, HEADER_HEIGHT]
  )

  const inflection = useRef<number>(0)
  const inflectionHeight = useRef<number>(null)

  // const height = 64

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!latest) return
    let _oldHeight = null
    // ? Get Scroll Direction
    const _down = latest > prev.current
    if (down?.current !== _down) {
      down.current = _down
      inflection.current = latest
      _oldHeight = height.get()
      inflectionHeight.current = height.get()
    }

    // ? Set previous value
    prev.current = latest

    // ? Get difference vs. Inflection Point
    const _diff = inflection.current - latest
    const _value = scrollDiff.set(inflectionHeight.current + _diff)
    console.log(
      'inflection:',
      inflection?.current,
      '\n_OldHeight:',
      _oldHeight,
      '\nDown:',
      down?.current,
      '\ninflectionHeight:',
      inflectionHeight.current,
      '\n_diff:',
      _diff
    )
  })
  // const inflection = useRef<number>(0)
  // const down = useRef<boolean>(false)
  // const prev = useRef<number>(-1)
  // const scrollDiff = useMotionValue(0)
  // const _maxDiff = 100
  // const height = useTransform(
  //   scrollDiff,
  //   [0, _maxDiff],
  //   // Into these values:
  //   [0, 64]
  // )

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   if (!latest) return

  //   // ? Direction
  //   const _down = latest > prev.current
  //   if (down?.current !== _down) {
  //     down.current = _down
  //     inflection.current = latest
  //   }

  //   prev.current = latest
  //   const _diff = inflection.current - latest

  //   if (_diff > 0) {
  //     if (_diff >= _maxDiff) {
  //       console.log('max')
  //       scrollDiff.set(_maxDiff)
  //     } else {
  //       scrollDiff.set(_diff)
  //     }
  //   } else {
  //     if (_diff >= 0) {
  //       console.log('max')
  //       scrollDiff.set(0)
  //     } else {
  //       scrollDiff.set(_maxDiff + _diff)
  //     }
  //   }

  //   console.log()

  //   console.log(
  //     'inflection:',
  //     inflection?.current,
  //     '\nDown:',
  //     down?.current,
  //     '\nscrollDiff:',
  //     scrollDiff.get(),
  //     '\n_diff:',
  //     _diff
  //   )
  // })

  return (
    <motion.div style={{ height }} className={styles.header}>
      <HeaderLogo />
      <HeaderButtons />
    </motion.div>
  )
}

export default Header
