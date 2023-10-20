import React from 'react'
import styles from './socials-email.module.scss'
import GitHubSvg from './../../../../assets/svg/GitHub.svg'
import InstagramSvg from './../../../../assets/svg/Instagram.svg'
import { motion } from 'framer-motion'

type EntryProps = {
  children: React.ReactNode
  href: string
  onClick?: () => void
}

type Props = {
  visible: boolean
}

const socialInfoVariants = {
  hidden: {
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const SocialsEntry = ({ children, href, onClick }: EntryProps) => {
  return (
    <div className={styles.socialsEntry}>
      <a href={href}>
        <div className={styles.socialsEntryButton} onClick={onClick}>
          {children}
        </div>
      </a>
    </div>
  )
}

export const Socials = ({ visible }: Props) => {
  return (
    <motion.div
      className={styles.socials}
      variants={socialInfoVariants}
      initial={'hidden'}
      animate={visible ? 'visible' : 'hidden'}
      transition={{
        delay: visible ? 4.5 : 0,
        type: 'spring',
        clamp: true,
        stiffness: 250,
        damping: 100,
      }}
    >
      <div className={styles.socialsButtons}>
        <SocialsEntry href="">
          <GitHubSvg />
        </SocialsEntry>
        <SocialsEntry href="">
          <InstagramSvg />
        </SocialsEntry>
        <SocialsEntry href="">
          <GitHubSvg />
        </SocialsEntry>
        <SocialsEntry href="">
          <InstagramSvg />
        </SocialsEntry>
        <div className={styles.socialsBar} />
      </div>
    </motion.div>
  )
}
