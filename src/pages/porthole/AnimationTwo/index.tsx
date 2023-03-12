import React from "react"
import css from "./animation-two.module.scss"
const styles = css as any

const AnimationTwo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cover}>
        <div className={styles.circle} />
      </div>
    </div>
  )
}

export default AnimationTwo
