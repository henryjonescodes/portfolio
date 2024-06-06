import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styles from './experience.module.scss'
import Experience from './Experience'
import { ExperienceDetails, mushroomDetails } from './experience.contents'

type OverlayProps = {
  overlayStyle: React.CSSProperties
  selectedId: string | null
  dismiss: () => void
}

const Scroller = () => {
  const [selectedId, setSelectedId] = useState<string>(null)
  const [overlayStyle, setOverlayStyle] = useState({})

  const cards = []

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    setSelectedId(id.toString())

    const container = event.currentTarget
    const rect = container.getBoundingClientRect()
    setOverlayStyle({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
      position: 'absolute',
    })
    console.log(overlayStyle)
  }

  const dismissOverlay = () => {
    setSelectedId(null)
    setOverlayStyle({})
  }

  for (let i = 1; i <= 3; i++) {
    const card = (
      <Experience
        key={i.toString()}
        id={i.toString()}
        selectedId={selectedId}
        isOverlay={false}
        onClick={handleClick}
        details={mushroomDetails}
      />
    )
    cards.push(card)
  }

  return (
    <>
      <div className={styles.scroller}>
        <div className={styles.scrollerCarousel}>
          <h3>Experience</h3>
          <motion.div layoutScroll className={styles.scrollerCarouselContent}>
            {cards}
          </motion.div>
        </div>
      </div>
      {overlayStyle && (
        <Overlay
          overlayStyle={overlayStyle}
          selectedId={selectedId}
          dismiss={dismissOverlay}
        />
      )}
    </>
  )
}

const Overlay: React.FC<OverlayProps> = ({
  overlayStyle,
  selectedId,
  dismiss,
}) => {
  return (
    <div className={styles.overlay} style={overlayStyle} onClick={dismiss}>
      {selectedId !== null && (
        <Experience
          key={selectedId}
          id={selectedId}
          selectedId={selectedId}
          isOverlay={true}
          onClick={dismiss}
          details={mushroomDetails}
        />
      )}
    </div>
  )
}

export default Scroller
