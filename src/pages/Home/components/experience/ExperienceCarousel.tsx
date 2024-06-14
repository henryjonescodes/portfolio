import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { experienceMap } from './experience.contents'
import styles from './experience.module.scss'
import {
  CARD_ANIMATION_DURATION_SECONDS,
  default as Experience,
  default as ExperienceEntry,
} from './ExperienceEntry'
import { useLocation, useNavigate } from 'react-router-dom'

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
  const location = useLocation()
  const navigate = useNavigate()

  const [selectedId, setSelectedId] = useState<string>(null)
  const [pageOpen, setPageOpen] = useState<boolean>(false)
  const [overlayStyle, setOverlayStyle] = useState({})

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    if (path && experienceMap[path]) {
      setSelectedId(path)
      setTimeout(() => {
        setPageOpen(true)
      }, 10)
    } else {
      setSelectedId(null)
      setPageOpen(false)
      setOverlayStyle(null)
    }
  }, [location])

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    key: string
  ) => {
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

    navigate(`/${key}`)
  }

  const dismissOverlay = () => {
    setPageOpen(false)

    setTimeout(() => {
      navigate('/')
    }, CARD_ANIMATION_DURATION_SECONDS * 1000 + 100)
  }

  return (
    <>
      <div className={styles.experienceCarousel}>
        <div className={styles.carousel}>
          <span className={styles.header}>
            <h3>Experience</h3>
          </span>
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
