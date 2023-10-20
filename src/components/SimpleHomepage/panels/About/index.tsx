import React, { forwardRef } from 'react'
import styles from './about.module.scss'
type Props = {}

const About = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  return (
    <div ref={ref} className={styles.about}>
      About
    </div>
  )
})

export default About
