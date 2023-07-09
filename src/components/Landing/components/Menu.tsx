import cn from 'classnames'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styles from './landing-components.module.scss'

type ItemStates = 'invisible' | 'drawn' | 'filled'

type Props = {
  scrollYProgress: MotionValue<number>
  visible: boolean
  onClickAbout: () => void
  onClickGallery: () => void
  onClickExperience: () => void
}

type ItemProps = {
  state: ItemStates
  title: string
  onClick: () => void
}

const MenuItem = ({ state, title, onClick }: ItemProps) => {
  return (
    <span
      className={styles.menuItem}
      style={{
        pointerEvents: ['filled', 'drawn'].includes(state) ? 'all' : 'none',
      }}
    >
      <svg
        className={cn({
          [styles.menuItemSvg]: true,
          [styles.menuItemSvg_invisible]: state === 'invisible',
          [styles.menuItemSvg_drawn]: state !== 'invisible',
          [styles.menuItemSvg_filled]: state === 'filled',
        })}
      >
        <text onClick={onClick} y={'95%'}>
          {title}
        </text>
      </svg>
    </span>
  )
}

const Menu = ({
  scrollYProgress,
  visible,
  onClickGallery,
  onClickAbout,
  onClickExperience,
}: Props) => {
  const [aboutState, setAboutState] = useState<ItemStates>('invisible')
  const [experienceState, setExperienceState] =
    useState<ItemStates>('invisible')
  const [galleryState, setGalleryState] = useState<ItemStates>('invisible')
  const oldVal = useRef<number>()

  useEffect(() => {
    const updateUi = (latest: number) => {
      if (!latest || !visible) return
      const goingUp = latest > oldVal.current
      oldVal.current = latest

      console.log('scrollY', latest, goingUp)

      switch (true) {
        case latest < 0.1:
          setExperienceState('filled')
          break
        case latest < 0.2:
          setGalleryState('filled')
          break
        case latest < 0.3:
          setAboutState('filled')
          break
        case latest < 0.5:
          if (goingUp) {
            setExperienceState('invisible')
          } else {
            setExperienceState('drawn')
          }
          break
        case latest < 0.6:
          if (goingUp) {
            setGalleryState('invisible')
          } else {
            setGalleryState('drawn')
          }
          break
        case latest < 0.7:
          if (goingUp) {
            setAboutState('invisible')
          } else {
            setAboutState('drawn')
          }
          break
        default:
          setAboutState('invisible')
          setGalleryState('invisible')
          setExperienceState('invisible')
          break
      }
    }

    const unsub = scrollYProgress.on('change', updateUi)

    if (!visible) {
      setAboutState('invisible')
      setGalleryState('invisible')
      setExperienceState('invisible')
    }

    return () => {
      unsub()
    }
  }, [scrollYProgress, visible])

  return (
    <div className={styles.menu}>
      <MenuItem state={aboutState} title={'ABOUT'} onClick={onClickAbout} />
      <MenuItem
        state={galleryState}
        title={'GALLERY'}
        onClick={onClickGallery}
      />
      <MenuItem
        state={experienceState}
        title={'EXPERIENCE'}
        onClick={onClickExperience}
      />
    </div>
  )
}

export default Menu
