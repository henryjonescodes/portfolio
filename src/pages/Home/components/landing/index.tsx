import React from 'react'
import styles from './landing.module.scss'
import SocialsList from '@components/socials-list'

import backgroundVideo from '@assets/video/landing-01.mp4'

import cn from 'classnames'
import VideoBackground from '@components/video-background'
const Landing = () => {
  return (
    <div className={styles.wrapper}>
      <VideoBackground videoSrc={backgroundVideo} />
      <div className={styles.hero}>
        <div className={styles.header}>
          <h1>Henry Jones</h1>
          <h2>Creative Developer</h2>
          <h3>Shaping human-oriented digital experiences</h3>
          <SocialsList />
        </div>
        <div
          className={cn({
            [styles.about]: true,
            [styles.aboutLeading]: true,
          })}
        >
          <h3>About</h3>
          <p>
            My journey into creative development began with a passion for poster
            and screenprinting design, which quickly evolved into a love for
            coding and web development in my teens. Since then, I’ve had the
            opportunity to build dynamic, customer-facing UIs for dynamic
            startups in Silicon Valley hard at work building an accessible
            future for human-AI interaction.
          </p>
        </div>
      </div>
      <div className={styles.blurb}>
        <div
          className={cn({
            [styles.about]: true,
            [styles.aboutTrailing]: true,
          })}
        >
          <p>
            Currently, I focus on creating accessible and intuitive user
            interfaces, thriving in the intersection of design and engineering.
            I enjoy crafting software that not only looks good but performs
            seamlessly. In my free time, I delve into personal projects
            involving Three.js and React, exploring the creative potentials of
            web development.
          </p>
          <p>
            When I'm not coding, you'll find me rock climbing, reading, or
            exploring the latest tech trends.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Landing
