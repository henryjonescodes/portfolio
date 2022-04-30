import { motion } from "framer-motion"
import React from "react"
import css from "./animation-one-components.module.scss"
import { GlobalVariants } from ".."
const styles = css as any

type Props = {
  currentVariant: GlobalVariants
}

const stripeVariants = {
  initial: {},
  hello: {},
  hello2: {},
  collapse: {},
}

const containerVariants = {
  initial: {
    height: 50,
    rotate: 0,
    top: "unset",
    transition: { type: "spring", duration: 0.8 },
  },
  hello: {
    height: "160vh",
    width: "300vw",
    rotate: -30,
    top: "unset",
    transition: { type: "spring", duration: 0.8 },
  },
  hello2: {
    height: "100vh",
    width: "110vw",
    rotate: 0,
    top: "unset",
    transition: { type: "spring", duration: 0.8, bounce: 0.1 },
  },
  collapse: {
    height: 70,
    width: "100vw",
    y: 0,
    top: 0,
    transition: { type: "spring", duration: 0.7, bounce: 0.1 },
  },
  mini: {
    height: 70,
    width: "100vw",
    y: 0,
    top: 0,
    transtorm: "translateX(-70px)",
    x: "calc(-100vw + 70px/4)",
    transition: { type: "spring", duration: 0.8, bounce: 0.25 },
  },
}

const Stripes = ({ currentVariant }: Props) => {
  return (
    <motion.div
      variants={containerVariants}
      className={styles.stripes}
      animate={currentVariant}
      initial="squeeze"
    >
      <motion.div className={styles.stripeC} variants={stripeVariants} />
      <motion.div className={styles.stripeM} variants={stripeVariants} />
      <motion.div className={styles.stripeY} variants={stripeVariants} />
      <motion.div className={styles.stripeK} variants={stripeVariants} />
    </motion.div>
  )
}

export default Stripes
