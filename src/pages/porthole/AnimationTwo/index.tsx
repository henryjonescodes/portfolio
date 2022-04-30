import React from "react"
import css from "./animation-two.module.scss"
const styles = css as any

const AnimationTwo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.white}></div>
      <div className={styles.black}></div>
      <div className={styles.marked} id="makered"></div>
      <span className={styles.test}>test</span>
    </div>
  )
}

export default AnimationTwo
