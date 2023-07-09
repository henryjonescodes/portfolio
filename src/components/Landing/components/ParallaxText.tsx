import styles from './landing-components.module.scss'

import { wrap } from '@motionone/utils'
import cn from 'classnames'
import {
  MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import React, { useRef } from 'react'

interface ParallaxProps {
  baseVelocity: number
  scrollY: MotionValue<number>
  text: string
  textClassName?: string
}

const ParallaxText = ({
  baseVelocity = 100,
  scrollY,
  text,
  textClassName,
}: ParallaxProps) => {
  const baseX = useMotionValue(0)
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  const wordsList = []
  const numWordsFactor = 4

  for (let i = 0; i < 4 * numWordsFactor; i++) {
    wordsList.push(
      <span
        className={cn({
          [styles.parallaxWord]: true,
          [textClassName]: !!textClassName,
        })}
        key={i}
      >
        <h2>{text}</h2>
      </span>
    )
  }

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className={styles.parallax}>
      <motion.div className={styles.scroller} style={{ x }}>
        {wordsList}
      </motion.div>
    </div>
  )
}

export default ParallaxText
