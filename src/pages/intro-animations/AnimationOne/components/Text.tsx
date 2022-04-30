import React, { useState } from "react"
import css from "./animation-one-components.module.scss"
import { AnimatePresence, motion } from "framer-motion"
import { GlobalVariants } from ".."
const styles = css as any

// * ///////////////////////////// * //
// *             TYPES             * //
// * ///////////////////////////// * //

type SharedProps = {
  currentVariant: GlobalVariants
}

type HeaderProps = SharedProps
type HeroProps = SharedProps

// * ///////////////////////////// * //
// *             HEADER            * //
// * ///////////////////////////// * //

const headerVariants = {
  initial: {},
  hello: {},
  hello2: {},
  collapse: {},
  mini: {},
}

export const Header = ({ currentVariant }: HeaderProps) => {
  return (
    <>
      {["collapse", "mini"].includes(currentVariant) && (
        <motion.div
          layoutId={"hero-text"}
          className={styles.headerText}
          variants={headerVariants}
        >
          <motion.h1
            variants={heroTextVariants}
            className={styles.text__header}
          >
            Henry
          </motion.h1>
          <motion.h1
            variants={heroTextVariants}
            className={styles.text__header}
          >
            Jones
          </motion.h1>
        </motion.div>
      )}
    </>
  )
}

// * ///////////////////////////// * //
// *           PRE-HERO            * //
// * ///////////////////////////// * //

const preHeroVariants = {
  initial: { opacity: 0 },
  hello: { opacity: 1, transition: { staggerChildren: 0.3 } },
}

const preHeroTextVariants = {
  initial: { opacity: 0, y: 20 },
  hello: { opacity: 1, y: 0 },
  hello2: {
    opacity: 0,
    y: 10,
    transition: { type: "spring", bounce: 0.25, stiffness: 200 },
  },
}

// * ///////////////////////////// * //
// *              HERO             * //
// * ///////////////////////////// * //

const heroVariants = {
  initial: { opacity: 0 },
  hello: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.7,
    },
  },
}

const heroTextVariants = {
  initial: { opacity: 0, y: 20 },
  hello: { opacity: 1, y: 0 },
}

// * ///////////////////////////// * //
// *             SUB-HERO          * //
// * ///////////////////////////// * //

const subHeroVariants = {
  initial: { opacity: 0 },
  hello: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 1.4 },
  },
}

const subHeroTextVariants = {
  initial: { opacity: 0, y: 20 },
  hello: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.35, stiffness: 130 },
  },
  hello2: {
    opacity: 0,
    y: -10,
    transition: { type: "spring", bounce: 0.25, stiffness: 200 },
  },
}

const subText: string = "Software Engineer/3D Artist"

export const Hero = ({ currentVariant }: HeroProps) => {
  return (
    <>
      {["initial", "hello", "hello2"].includes(currentVariant) && (
        <motion.div
          exit={{ opacity: 0, scale: 0.5 }}
          animate={currentVariant}
          className={styles.heroWrapper}
        >
          <motion.span className={styles.preHero} variants={preHeroVariants}>
            <motion.h2
              variants={preHeroTextVariants}
              className={styles.text__preHero}
            >
              Hi
            </motion.h2>
            <motion.h2
              variants={preHeroTextVariants}
              className={styles.text__preHero}
            >
              I'm
            </motion.h2>
          </motion.span>
          <motion.div
            layoutId={"hero-text"}
            className={styles.hero}
            variants={heroVariants}
          >
            <motion.h1
              variants={heroTextVariants}
              className={styles.text__hero}
            >
              Henry
            </motion.h1>
            <motion.h1
              variants={heroTextVariants}
              className={styles.text__hero}
            >
              Jones
            </motion.h1>
          </motion.div>
          <motion.span className={styles.subHero} variants={subHeroVariants}>
            {Array.from(subText).map((char) => {
              return (
                <motion.h4
                  variants={subHeroTextVariants}
                  className={styles.text__subHero}
                >
                  {char}
                </motion.h4>
              )
            })}
          </motion.span>
        </motion.div>
      )}
    </>
  )
}
