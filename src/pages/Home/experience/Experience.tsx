import CompassSvg from '@assets/svg/icons/compass.svg'
import cn from 'classnames'
import { LayoutGroup, motion } from 'framer-motion'
import React from 'react'
import { ExperienceDetails } from './experience.contents'
import styles from './experience.module.scss'

type ExperienceProps = {
  id: string
  selectedId: string | null
  isOverlay: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement>, id: string) => void
  details: ExperienceDetails
}

const Experience = ({
  id,
  selectedId,
  isOverlay,
  onClick,
  details: {
    date,
    title,
    location,
    blurb,
    responsibilities,
    skills,
    backgroundImage,
    LogoType,
  },
}: ExperienceProps) => {
  const pageMode = selectedId === id && isOverlay

  return (
    <LayoutGroup id={id}>
      {pageMode && <div className={styles.jobHidden} />}
      <motion.div
        layout
        layoutId={id}
        className={cn({
          [styles.job]: true,
          [styles.jobCard]: !pageMode,
          [styles.jobPage]: pageMode,
        })}
        onClick={(event) => {
          onClick(event, id)
        }}
      >
        <motion.span layoutId={'header'} className={styles.header}>
          <motion.span layoutId={'headerTitle'} className={styles.title}>
            <LogoType />
          </motion.span>
          <motion.span layoutId={'date'} className={styles.date}>
            <motion.h3>{date}</motion.h3>
          </motion.span>
        </motion.span>
        <motion.div layoutId={'body'} className={styles.body}>
          <motion.div layoutId={'bodyContent'} className={styles.content}>
            <motion.div layoutId={'bodyTitle'} className={styles.title}>
              <motion.h1>{title}</motion.h1>
              <motion.span>
                <CompassSvg />
                <motion.h3>{location}</motion.h3>
              </motion.span>
            </motion.div>
            {pageMode && (
              <>
                <motion.div layoutId={'bodyBlurb'} className={styles.blurb}>
                  <motion.p layoutId={'bodyBlurbContents'}>{blurb}</motion.p>
                </motion.div>
                <motion.div
                  layoutId={'bodyResponsibilities'}
                  className={styles.responsibilities}
                >
                  <motion.h3>Responsibilities</motion.h3>
                  {responsibilities.map((responsibility, index) => (
                    <motion.div key={index}>
                      <motion.h2>{responsibility.title}</motion.h2>
                      <motion.p>{responsibility.description}</motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
          <motion.span layoutId={'bodySkills'} className={styles.skills}>
            {skills.map((skill, index) => (
              <skill.icon key={index} />
            ))}
          </motion.span>
        </motion.div>
        <motion.div layoutId={'background'} className={styles.background} />
        <motion.div
          layoutId={'backgroundImage'}
          className={styles.backgroundImage}
        >
          <motion.img
            layoutId={'backgroundImageImg'}
            src={backgroundImage}
            alt="Background"
          />
        </motion.div>
      </motion.div>
    </LayoutGroup>
  )
}

export default Experience
