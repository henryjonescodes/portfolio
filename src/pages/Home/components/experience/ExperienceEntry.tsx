import CompassSvg from '@assets/svg/icons/compass.svg'
import cn from 'classnames'
import { LayoutGroup, motion } from 'framer-motion'
import React from 'react'
import { ExperienceDetails, getDateString } from './experience.contents'
import styles from './experience.module.scss'
import StopwatchSvg from '@assets/svg/icons/stopwatch.svg'
import CalendarSvg from '@assets/svg/socials/calendar.svg'

export const CARD_ANIMATION_DURATION_SECONDS = 0.35

type ExperienceProps = {
  id: string
  pageOpen: boolean
  inList: boolean
  details: ExperienceDetails
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Experience = ({
  id,
  pageOpen,
  inList,
  onClick,
  details: {
    title,
    location,
    blurb,
    responsibilities,
    skills,
    backgroundImage,
    color,
    logoType,
    startDate,
    endDate,
  },
}: ExperienceProps) => {
  const isOpen = pageOpen && !inList
  const date = getDateString(startDate, endDate, true)
  return (
    <LayoutGroup id={id}>
      <motion.div
        layout
        layoutId={id}
        className={cn({
          [styles.job]: true,
          [styles.jobCard]: !isOpen,
          [styles.jobPage]: isOpen,
        })}
        transition={{ duration: CARD_ANIMATION_DURATION_SECONDS }}
        onClick={(event) => {
          onClick(event)
        }}
      >
        <motion.span
          layoutId={'header'}
          className={styles.header}
          transition={{ duration: 0 }}
        >
          <motion.span layoutId={'headerTitle'} className={styles.title}>
            <motion.img
              layoutId={'logotype'}
              src={logoType}
              alt="This company's logotype and logo"
            />
          </motion.span>
          <motion.span
            layoutId={'date'}
            className={styles.date}
            transition={{
              duration: pageOpen
                ? CARD_ANIMATION_DURATION_SECONDS * 1.1
                : CARD_ANIMATION_DURATION_SECONDS,
            }}
          >
            <motion.h3 transition={{ duration: 0 }}>{date}</motion.h3>
          </motion.span>
        </motion.span>
        <motion.div
          layoutId={'body'}
          className={styles.body}
          transition={{
            duration: 0,
          }}
        >
          <motion.div
            layoutId={'bodyContent'}
            className={styles.content}
            transition={{ duration: CARD_ANIMATION_DURATION_SECONDS * 0.9 }}
          >
            <motion.div layoutId={'bodyTitle'} className={styles.title}>
              <motion.h1>{title}</motion.h1>
              <motion.span className={styles.date}>
                <StopwatchSvg />
                <motion.h3>{date}</motion.h3>
              </motion.span>
              <motion.span>
                <CompassSvg />
                <motion.h3>{location}</motion.h3>
              </motion.span>
            </motion.div>
            {isOpen && (
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
          <motion.span
            className={cn({
              [styles.skills]: true,
              [styles.skillsHidden]: pageOpen == true,
            })}
          >
            {skills.map((skill, index) => (
              <motion.div key={index}>
                <skill.icon />
              </motion.div>
            ))}
          </motion.span>
        </motion.div>
        <motion.div
          layoutId={'background'}
          className={styles.background}
          transition={
            {
              // duration: CARD_ANIMATION_DURATION_SECONDS * 0.6,
            }
          }
          style={{ backgroundColor: color }}
        />
        <motion.div
          layoutId={'backgroundImage'}
          className={styles.backgroundImage}
          transition={{
            duration: pageOpen
              ? CARD_ANIMATION_DURATION_SECONDS * 1.5
              : CARD_ANIMATION_DURATION_SECONDS,
          }}
        >
          <motion.img
            layoutId={'backgroundImageImg'}
            src={backgroundImage}
            alt="Background"
            transition={{
              duration: pageOpen
                ? CARD_ANIMATION_DURATION_SECONDS * 1.5
                : CARD_ANIMATION_DURATION_SECONDS,
            }}
          />
        </motion.div>
      </motion.div>
    </LayoutGroup>
  )
}

export default Experience
