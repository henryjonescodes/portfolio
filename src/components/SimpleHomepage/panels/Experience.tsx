import React, { forwardRef } from 'react'
import styles from './simple-homepage-panels.module.scss'
type Props = {}

const Experience = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  return (
    <div ref={ref} className={styles.experience}>
      Experience
    </div>
  )
})

export default Experience
