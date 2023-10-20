import React, { forwardRef } from 'react'
import styles from './contact.module.scss'
type Props = {}

const Contact = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  return (
    <div ref={ref} className={styles.contact}>
      Contact
    </div>
  )
})

export default Contact
