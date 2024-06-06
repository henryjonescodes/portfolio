import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Experience from './Experience'
import { experienceMap } from './experience.contents'
import styles from './experience.module.scss'

type OverlayProps = {
  overlayStyle: React.CSSProperties
  selectedId: string | null
  dismiss: () => void
}

const Scroller = () => {
  const [selectedId, setSelectedId] = useState<string>(null)
  const [overlayStyle, setOverlayStyle] = useState({})

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

  return (
    <>
      <div className={styles.scroller}>
        <div className={styles.scrollerCarousel}>
          <h3>Experience</h3>
          <motion.div layoutScroll className={styles.scrollerCarouselContent}>
            {Object.keys(experienceMap).map((key) => (
              <Experience
                key={key}
                id={key}
                selectedId={selectedId}
                isOverlay={false}
                onClick={handleClick}
                details={experienceMap[key]}
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
          details={experienceMap[selectedId]}
        />
      )}
    </div>
  )
}

export default Scroller
