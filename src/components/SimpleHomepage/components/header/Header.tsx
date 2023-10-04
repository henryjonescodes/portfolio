import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion'
import React, { useRef, useState } from 'react'
import styles from './header.module.scss'
import LogoSvg from './../../../../assets/svg/Trash.svg'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { HOMEPAGE_TRANSITION_DURATION_MS } from '@components/SimpleHomepage'

const HeaderLogo = () => {
  return (
    <div className={styles.headerLogo}>
      <LogoSvg height={'100%'} width={'100%'} />
    </div>
  )
}

type ButtonsProps = {
  visible: boolean
  onNavigate: () => void
}

type ButtonProps = {
  title: string
  prefix?: string
  onClick: () => void
}

const entryVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const Button = ({ prefix, title, onClick }: ButtonProps) => {
  return (
    <motion.span
      variants={entryVariants}
      className={styles.button}
      onClick={onClick}
    >
      {!!prefix && <h2>{prefix}. </h2>}
      <h3>{title}</h3>
    </motion.span>
  )
}

const HeaderButtons = ({ visible, onNavigate }: ButtonsProps) => {
  const navigate = useNavigate()

  return (
    <motion.span
      className={styles.headerButtons}
      initial={'hidden'}
      animate={visible ? 'visible' : 'hidden'}
      transition={{
        staggerChildren: 0.2,
      }}
    >
      <Button
        prefix={'01'}
        title={'about'}
        onClick={() => {
          onNavigate()
          setTimeout(() => {
            navigate('/about')
          }, HOMEPAGE_TRANSITION_DURATION_MS)
        }}
      />
      <Button
        prefix={'02'}
        title={'experience'}
        onClick={() => {
          onNavigate()
          setTimeout(() => {
            navigate('/experience')
          }, HOMEPAGE_TRANSITION_DURATION_MS)
        }}
      />
      <Button
        prefix={'03'}
        title={'contact'}
        onClick={() => {
          onNavigate()
          setTimeout(() => {
            navigate('/contact')
          }, HOMEPAGE_TRANSITION_DURATION_MS)
        }}
      />
    </motion.span>
  )
}

type Props = {
  scrollY: MotionValue<number>
  visible: boolean
  onNavigate: () => void
}

const Header = ({ scrollY, visible, onNavigate }: Props) => {
  // ? Header hide logic for scrolling... idk what the fuck this does tho...
  const HEADER_HEIGHT = 64
  // const down = useRef<boolean>(false)
  // const prev = useRef<number>(-1)
  // const height = useMotionValue(HEADER_HEIGHT)

  // const inflection = useRef<number>(0)
  // const inflectionHeight = useRef<number>(null)

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   if (!latest) return
  //   // ? Get Scroll Direction
  //   const _down = latest > prev.current
  //   if (down?.current !== _down) {
  //     down.current = _down
  //     inflection.current = latest
  //     inflectionHeight.current = height.get()
  //   }

  //   // ? Set previous value
  //   prev.current = latest

  //   // ? Get difference vs. Inflection Point
  //   const _diff = inflection.current - latest
  //   height.set(
  //     Math.max(0, Math.min(inflectionHeight.current + _diff, HEADER_HEIGHT))
  //   )
  // })

  return (
    <motion.div
      style={{ height: HEADER_HEIGHT }}
      className={cn({
        [styles.header]: true,
        // [styles.header__withShadow]: height.get() < HEADER_HEIGHT,
      })}
    >
      <div className={styles.headerContent}>
        {/* <HeaderLogo /> */}
        <div />
        <HeaderButtons visible={visible} onNavigate={onNavigate} />
      </div>
    </motion.div>
  )
}

export default Header
