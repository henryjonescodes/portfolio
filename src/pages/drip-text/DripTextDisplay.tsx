import React, { useState } from "react"
import css from "./drip-text.module.scss"
import cn from "classnames"
import Button from "../../zonez-ui/button/Button"
const styles = css as any

const DripTextDisplay = () => {
  const [dripping, setDripping] = useState<boolean>(false)
  return (
    <div className={styles.wrapper}>
      <div
        className={cn({
          [styles.drip]: true,
          [styles.dripDrop]: dripping,
        })}
      />

      <div className={styles.textWhite}>
        <h2 className={styles.text__headerWhite}>ABOUT ME</h2>
        <p className={styles.text__bodyWhite}>
          I'm a web developer and multimedia artist from Portland, Maine. I'm
          new to both fields and ready to dive into any projects or
          opportunities that will broaden my horizons. Since graduating from
          Union College in 2021, I've worked to steer my focus towards visual
          effects, immersive art, and virtual production in an effort to combine
          my two overlapping passions.
        </p>
      </div>
      <div className={styles.textBlack}>
        <h2 className={styles.text__headerBlack}>ABOUT ME</h2>
        <p className={styles.text__bodyBlack}>
          I'm a web developer and multimedia artist from Portland, Maine. I'm
          new to both fields and ready to dive into any projects or
          opportunities that will broaden my horizons. Since graduating from
          Union College in 2021, I've worked to steer my focus towards visual
          effects, immersive art, and virtual production in an effort to combine
          my two overlapping passions.
        </p>
      </div>
      <Button
        className={styles.button}
        onClick={() => {
          setDripping(!dripping)
        }}
      >
        {dripping ? "drip?" : "drop?"}
      </Button>
    </div>
  )
}

export default DripTextDisplay
