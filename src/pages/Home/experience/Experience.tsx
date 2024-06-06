import mushroomBackground from '@assets/jobs/mushroom-background.png'
import MushroomLogotypeSvg from '@assets/jobs/mushroom-logotype.svg'
import CompassSvg from '@assets/svg/icons/compass.svg'
import ExpoSvg from '@assets/svg/tools/expo-0.svg'
import FigmaSvg from '@assets/svg/tools/figma.svg'
import GraphqlSvg from '@assets/svg/tools/graphql.svg'
import PostgresqlSvg from '@assets/svg/tools/postgresql.svg'
import ReactSvg from '@assets/svg/tools/react-0.svg'
import TypeScriptSvg from '@assets/svg/tools/typescript-0.svg'
import cn from 'classnames'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
} from 'framer-motion'
import React from 'react'
import styles from './experience.module.scss'

const Experience = ({
  id,
  selectedId,
  onClick,
}: {
  id: string
  selectedId: string | null
  onClick: () => void
}) => {
  const isSelected = selectedId === id
  return (
    <LayoutGroup id={id}>
      {isSelected && <div className={styles.jobHidden} />}
      <motion.div
        layout
        layoutId={id}
        className={cn({
          [styles.job]: true,
          [styles.jobCard]: !isSelected,

          // [styles.jobModal]: selectedId === id,
          [styles.jobPage]: isSelected,
        })}
        onClick={() => {
          onClick()
        }}
      >
        <motion.span layoutId={'header'} className={styles.header}>
          <motion.span layoutId={'headerTitle'} className={styles.title}>
            <MushroomLogotypeSvg />
          </motion.span>
          <motion.span layoutId={'date'} className={styles.date}>
            <motion.h3>March 2022 - January 2024</motion.h3>
          </motion.span>
        </motion.span>
        <motion.div layoutId={'body'} className={styles.body}>
          <motion.div layoutId={'bodyContent'} className={styles.content}>
            <motion.div layoutId={'bodyTitle'} className={styles.title}>
              <motion.h1>Software engineer</motion.h1>
              <motion.span>
                <CompassSvg />
                <motion.h3>Palo Alto, CA</motion.h3>
              </motion.span>
            </motion.div>
            {/* <AnimatePresence> */}
            {isSelected && (
              <>
                <motion.div layoutId={'bodyBlurb'} className={styles.blurb}>
                  <motion.p layoutId={'bodyBlurbContents'}>
                    Frontend focused engineer and design/engineering liaison.
                    Balanced technical precision with creative flair to create
                    engaging gamified social media experiences across web,
                    mobile, and Discord.
                  </motion.p>
                </motion.div>
                <motion.div
                  layoutId={'bodyResponsibilities'}
                  className={styles.responsibilities}
                >
                  <motion.h3>Responsibilities</motion.h3>
                  <motion.div>
                    <motion.h2>Design System Engineering Lead</motion.h2>
                    <motion.p>
                      Spearheaded the development and maintenance of interactive
                      interface implementations, focusing on intuitive user
                      experiences and robust backend functionality.
                    </motion.p>
                  </motion.div>
                  <motion.div>
                    <motion.h2>
                      React/React-Native Design Implementation
                    </motion.h2>
                    <motion.p>
                      Implemented dynamic and responsive user interfaces,
                      leveraging React and React Native to deliver a seamless
                      cross-platform experience.
                    </motion.p>
                  </motion.div>
                  <motion.div>
                    <motion.h2>GraphQL Integration</motion.h2>
                    <motion.p>
                      Integrated GraphQL for efficient data management in
                      numerous interfaces and projects
                    </motion.p>
                  </motion.div>
                </motion.div>
              </>
            )}
            {/* </AnimatePresence> */}
          </motion.div>
          <motion.span layoutId={'bodySkills'} className={styles.skills}>
            <ReactSvg />
            <PostgresqlSvg />
            <GraphqlSvg />
            <TypeScriptSvg />
            <ExpoSvg />
            <FigmaSvg />
          </motion.span>
        </motion.div>
        <motion.div layoutId={'background'} className={styles.background} />
        <motion.div
          layoutId={'backgroundImage'}
          className={styles.backgroundImage}
        >
          <motion.img
            layoutId={'backgroundImageImg'}
            src={mushroomBackground}
            alt="Mushroom background"
          />
        </motion.div>
      </motion.div>
    </LayoutGroup>
  )
}

export default Experience
