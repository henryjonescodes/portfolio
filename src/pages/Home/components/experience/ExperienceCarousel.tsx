import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { experienceMap } from './experience.contents'
import styles from './experience.module.scss'
import {
  CARD_ANIMATION_DURATION_SECONDS,
  default as Experience,
  default as ExperienceEntry,
} from './ExperienceEntry'

type OverlayProps = {
  overlayStyle: React.CSSProperties
  selectedId: string | null
  pageOpen: boolean
  dismiss: () => void
}

export type CarouselProps = {
  scrollParentRef: React.RefObject<HTMLDivElement>
}

const ExperienceCarousel: React.FC<CarouselProps> = ({ scrollParentRef }) => {
  const [selectedId, setSelectedId] = useState<string>(null)
  const [pageOpen, setPageOpen] = useState<boolean>(false)
  const [overlayStyle, setOverlayStyle] = useState({})

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    setSelectedId(id.toString())

    const container = event.currentTarget
    const wrapper = scrollParentRef.current
    const rect = container.getBoundingClientRect()
    const wrapperRect = wrapper.getBoundingClientRect()

    setOverlayStyle({
      top: rect.top - wrapperRect.top + wrapper.scrollTop,
      left: rect.left - wrapperRect.left + wrapper.scrollLeft,
      width: rect.width,
      height: rect.height,
      position: 'absolute',
    })

    setTimeout(() => {
      setPageOpen(true)
    }, 100)
  }

  const dismissOverlay = () => {
    setPageOpen(false)

    setTimeout(() => {
      resetOverlay()
    }, CARD_ANIMATION_DURATION_SECONDS * 1000 + 100)
  }

  const resetOverlay = () => {
    setSelectedId(null)
    setOverlayStyle({})
  }

  return (
    <>
      <div className={styles.experienceCarousel}>
        <div className={styles.carousel}>
          <h3>Experience</h3>
          <motion.div layoutScroll className={styles.content}>
            {Object.keys(experienceMap).map((key) => (
              <ExperienceEntry
                key={`${key}-inList`}
                id={`${key}-inList`}
                onClick={(event) => {
                  handleClick(event, key)
                }}
                pageOpen={pageOpen}
                details={experienceMap[key]}
                inList={true}
              />
            ))}
          </motion.div>
        </div>
      </div>
      {overlayStyle && (
        <Overlay
          overlayStyle={overlayStyle}
          selectedId={selectedId}
          dismiss={dismissOverlay}
          pageOpen={pageOpen}
        />
      )}
    </>
  )
}

const Overlay: React.FC<OverlayProps> = ({
  overlayStyle,
  selectedId,
  dismiss,
  pageOpen,
}) => {
  return (
    <div className={styles.overlay} style={overlayStyle} onClick={dismiss}>
      {selectedId !== null && (
        <Experience
          key={selectedId}
          id={selectedId}
          pageOpen={pageOpen}
          onClick={dismiss}
          inList={false}
          details={experienceMap[selectedId]}
        />
      )}
    </div>
  )
}

export default ExperienceCarousel
