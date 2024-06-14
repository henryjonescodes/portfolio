import React from 'react'
import Socials from './Socials'
import styles from './experience.module.scss'
import ExperienceCarousel, { CarouselProps } from './ExperienceCarousel'
type ExperienceProps = CarouselProps

const Experience: React.FC<ExperienceProps> = ({ scrollParentRef }) => {
  return (
    <div className={styles.experience}>
      <ExperienceCarousel scrollParentRef={scrollParentRef} />
    </div>
  )
}

export default Experience
