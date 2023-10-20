import React, { forwardRef } from 'react'
import styles from './projects.module.scss'
type Props = {}

const Projects = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  return (
    <div ref={ref} className={styles.projects}>
      Projects
    </div>
  )
})

export default Projects
