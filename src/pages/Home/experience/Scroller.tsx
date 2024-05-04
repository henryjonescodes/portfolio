import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styles from './experience.module.scss'
import Experience from './Experience'

const Scroller = () => {
  const [selectedId, setSelectedId] = useState<string>(null)

  const cards = []

  for (let i = 1; i <= 1; i++) {
    const card = (
      <Experience
        key={i.toString()}
        id={i.toString()}
        selectedId={selectedId}
        onClick={() => {
          setSelectedId(selectedId === i.toString() ? null : i.toString())
        }}
      />
    )
    cards.push(card)
  }

  return (
    <div className={styles.scroller}>
      <div className={styles.scrollerCarousel}>
        <h3>Experience</h3>
        <motion.div layoutScroll className={styles.scrollerCarouselContent}>
          {cards}
        </motion.div>
      </div>
    </div>
  )
}

export default Scroller
