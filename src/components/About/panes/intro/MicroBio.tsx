import React from 'react'

import styles from './intro.module.scss'
import cn from 'classnames'
type Props = {
  children?: string
  visible?: boolean
}

const MicroBio = ({ children, visible = false }: Props) => {
  const words = children.split(' ')
  const content = words.map((word) => {
    return (
      <span
        data-text={word}
        className={cn({
          [styles.wipeTextWord]: true,
          [styles.wipeTextWord_active]: visible,
        })}
      >
        {word}
      </span>
    )
  })

  return <p className={styles.wipeText}>{content}</p>
}

export default MicroBio
