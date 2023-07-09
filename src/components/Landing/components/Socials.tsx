import React from 'react'
import styles from './landing-components.module.scss'
import GitHubSvg from './../../../assets/svg/GitHub.svg'
import InstagramSvg from './../../../assets/svg/Instagram.svg'
import { Variants, motion } from 'framer-motion'

type Props = {
  visible: boolean
}

const Socials = ({ visible }: Props) => {
  const variants: Variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  }

  const parentVariants: Variants = {
    visible: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
        staggerDirection: -1,
      },
    },
    hidden: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  }
  return (
    <motion.span
      animate={visible ? 'visible' : 'hidden'}
      className={styles.socials}
      variants={parentVariants}
    >
      <motion.div variants={variants} className={styles.socialsItem}>
        <GitHubSvg />
      </motion.div>
      <motion.div variants={variants} className={styles.socialsItem}>
        <InstagramSvg />
      </motion.div>
    </motion.span>
  )
}

export default Socials
