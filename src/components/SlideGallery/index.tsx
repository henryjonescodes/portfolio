import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styles from './slide-gallery.module.scss'

const modes = ['small', 'medium', 'large'] as const
type Modes = (typeof modes)[number]

const SlideGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: scrollRef })
  const [scrollWidth, setScrollWidth] = useState<number | null>(null)

  const [ratio, setRatio] = useState<number | null>(null)

  const x = useSpring(0)
  const leftWidth = useMotionValue(0)
  const rightWidth = useMotionValue(0)

  useMotionValueEvent(scrollXProgress, 'change', (latest) => {
    leftWidth.set(scrollWidth - scrollWidth * latest)
    rightWidth.set(scrollWidth * latest)
  })

  useMotionValueEvent(x, 'change', (latest) => {
    if (!scrollRef?.current) {
      return
    }
    scrollRef.current.scrollLeft = latest
  })

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

  return (
    <>
      <div className={styles.bar}>
        <div
          className={styles.barButton}
          onClick={() => {
            setRatio(0.6)
          }}
        >
          small
        </div>
        <div
          className={styles.barButton}
          onClick={() => {
            setRatio(0.8)
          }}
        >
          medium
        </div>
        <div
          className={styles.barButton}
          onClick={() => {
            setRatio(1)
          }}
        >
          large
        </div>
      </div>
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
