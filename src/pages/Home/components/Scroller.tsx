import React, { useState } from 'react'
import styles from './home-components.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

const Scroller = () => {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <div className={styles.scroller}>
        <div className={styles.scrollerBlurb}>
          <h3>Shaping human-oriented digital experiences</h3>
          <p>
            I make user interfaces with human needs at the forefront, using
            novel tools to craft intuitive and exciting experiences. My passion
            for UX, kickstarted by a print-making hobby and a deep appreciation
            for efficient communication through design, has led me to Palo Alto,
            where I’m currently helping to shape the future of human-AI
            communication at Channel.ai
          </p>
        </div>
        <div className={styles.scrollerCarousel}>
          <h2>Experience</h2>
          <div className={styles.scrollerCarouselContent}>
            <ScrollerCard
              id={'1'}
              onClick={() => {
                setSelectedId('1')
              }}
            />
            <ScrollerCard
              id={'2'}
              onClick={() => {
                setSelectedId('2')
              }}
            />
            <ScrollerCard
              id={'3'}
              onClick={() => {
                setSelectedId('3')
              }}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        <ScrollerPage
          selectedId={selectedId}
          onClick={() => {
            setSelectedId(null)
          }}
        />
      </AnimatePresence>
    </>
  )
}

export const ScrollerCard = ({
  id,
  onClick,
}: {
  id: string
  onClick: () => void
}) => {
  return (
    <motion.div
      layoutId={id}
      className={styles.scrollerCard}
      onClick={() => {
        onClick()
      }}
    >
      <motion.h3>test motion</motion.h3>
    </motion.div>
  )
}

export const ScrollerPage = ({
  selectedId,
  onClick,
}: {
  selectedId: string
  onClick: () => void
}) => {
  return (
    selectedId && (
      <motion.div
        layoutId={selectedId}
        onClick={() => {
          onClick()
        }}
        className={styles.scrollerPage}
      >
        <motion.h3>test motion</motion.h3>
      </motion.div>
    )
  )
}

export default Scroller
