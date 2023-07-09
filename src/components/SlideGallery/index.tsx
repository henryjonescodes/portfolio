import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from './../../context/WindowDimensionsContext'
import styles from './slide-gallery.module.scss'
import Buttons from './components/buttons'

const modes = ['small', 'medium', 'large'] as const
type Modes = (typeof modes)[number]

const SlideGallery = () => {
  const windowSize = useWindowDimensions()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: scrollRef })

  const [scrollWidth, setScrollWidth] = useState<number | null>(null)
  const [ratio, setRatio] = useState<number | null>(null)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  const x = useSpring(0)
  const leftWidth = useMotionValue(0)
  const rightWidth = useMotionValue(0)

  const TIMEOUT_DURATION_MS = 500

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const trackScrolling = (latest: number) => {
      setIsScrolling(true)
      !isTransitioning && setRatio(latest)
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, TIMEOUT_DURATION_MS)
    }
    const unsub = scrollXProgress.on('change', trackScrolling)

    return () => {
      unsub()
      clearTimeout(timeoutId)
    }
  }, [scrollXProgress, isTransitioning])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const doStuff = () => {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false)
      }, TIMEOUT_DURATION_MS)
    }

    doStuff()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isTransitioning])

  useMotionValueEvent(scrollXProgress, 'change', (latest) => {
    leftWidth.set(scrollWidth - scrollWidth * latest)
    rightWidth.set(scrollWidth * latest)
  })

  useEffect(() => {
    const onUpdate = (latest: number) => {
      if (!isTransitioning && (!scrollRef?.current || isScrolling)) {
        return
      }
      scrollRef.current.scrollLeft = latest
    }

    const unsubX = x.on('change', onUpdate)

    return () => {
      unsubX()
    }
  }, [x, isScrolling, isTransitioning])

  useEffect(() => {
    if (!scrollWidth || !ratio) {
      return
    }
    x.set(scrollWidth * ratio)
  }, [ratio])

  useEffect(() => {
    if (scrollWidth) {
      return
    }
    if (!scrollRef?.current) {
      return
    }
    setScrollWidth(scrollRef.current.offsetWidth)
    setRatio(1)
  }, [])

  useEffect(() => {
    if (!scrollRef?.current) {
      return
    }
    const _width = scrollRef.current.offsetWidth
    setScrollWidth(_width)
    x.set(_width * ratio, false)
  }, [windowSize])

  return (
    <>
      <Buttons
        onPress={() => setIsTransitioning(true)}
        onPressSmall={() => setRatio(0.6)}
        onPressMedium={() => setRatio(0.8)}
        onPressLarge={() => setRatio(1)}
        ratio={ratio}
      />
      <div className={styles.wrapper} ref={scrollRef}>
        <motion.div className={styles.slide} viewport={{ root: scrollRef }}>
          <div className={styles.left}>
            <motion.div className={styles.list} style={{ width: leftWidth }}>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
              <div className={styles.listItem}>item</div>
            </motion.div>
          </div>
          <div className={styles.right}>
            <motion.div className={styles.main} style={{ width: rightWidth }}>
              main
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default SlideGallery
