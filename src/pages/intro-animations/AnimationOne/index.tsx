import React, { useState } from "react"
import { Variants, motion } from "framer-motion"
import Button from "zonez-ui/button/Button"
import css from "./animation-one.module.scss"
const styles = css as any

// const container2 = {
//   off: { opacity: 0 },
//   on: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// }

// const item = {
//   off: {},
//   on: {
//     y: [-10, 0, 10, 0],
//     transition: {
//       times: [0, 0.25, 0.5, 0.75],
//       repeat: Infinity,
//       type: "spring",
//       stiffness: 100,
//       repeatDelay: 0.5,
//     },
//   },
// }

const stripe = {
  on: {
    y: 10,
  },
  off: {},
}

const AnimationOne = () => {
  const [active, setActive] = useState<boolean>(false)
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.header}>
        <h4 className={styles.text__header}>Henry Jones</h4>
      </div> */}
      <div className={styles.body}>
        {/* <div className={styles.mask} /> */}
        <div className={styles.stripes}>
          <motion.div
            className={styles.stripeC}
            variants={stripe}
            animate={active ? "on" : "off"}
          />
          <motion.div
            className={styles.stripeM}
            variants={stripe}
            animate={active ? "on" : "off"}
          />
          <motion.div
            className={styles.stripeY}
            variants={stripe}
            animate={active ? "on" : "off"}
          />
          <motion.div
            className={styles.stripeK}
            variants={stripe}
            animate={active ? "on" : "off"}
          />
        </div>
        <div className={styles.hero}>
          <h2 className={styles.text__preHero}>Hi I'm</h2>
          <h1 className={styles.text__hero}>Henry</h1>
          <h1 className={styles.text__hero}>Jones</h1>
          <h4 className={styles.text__subHero}>Software Engineer/3D Artist</h4>
        </div>
        <Button
          onClick={() => {
            setActive(!active)
          }}
        >
          {active ? "off" : "on"}
        </Button>
      </div>
    </div>
  )
}

export default AnimationOne
