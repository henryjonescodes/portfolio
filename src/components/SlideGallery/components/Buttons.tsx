import React from 'react'
import styles from './../slide-gallery.module.scss'

type Props = {
  onPressMedium: () => void
  onPressSmall: () => void
  onPressLarge: () => void
  onPress: () => void
  ratio: number
}

const Buttons = ({
  onPressLarge,
  onPressSmall,
  onPressMedium,
  onPress,
  ratio,
}: Props) => {
  return (
    <div className={styles.bar}>
      <div
        className={styles.barButton}
        onClick={() => {
          onPressSmall()
          onPress()
        }}
      >
        small
      </div>
      <div
        className={styles.barButton}
        onClick={() => {
          onPressMedium()
          onPress()
        }}
      >
        medium
      </div>
      <div
        className={styles.barButton}
        onClick={() => {
          onPressLarge()
          onPress()
        }}
      >
        large
      </div>
      <div>{ratio}</div>
    </div>
  )
}

export default Buttons
