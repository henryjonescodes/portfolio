import Traced, { TracedWithProgress } from '../components/Traced/Traced'
import React, { useEffect } from 'react'
import styles from './pages.module.scss'
import NameSvg from '../assets/svg/Name.svg'
import MoonMagnifySvg from '../assets/svg/MoonMagnify.svg'
import Name from '@assets/svg/Name.svg'
import { useMotionValue } from 'framer-motion'
import WelcomeWallpaper from '@components/Welcome/WelcomeWallpaper'
// import WelcomeWallpaper from '@components/WelcomeWallpaper/WelcomeWallpaper'
const Home = () => {
  const pathProgress = useMotionValue(0)

  useEffect(() => {
    const increment = () => {
      const value = pathProgress.get()
      if (value >= 1) {
        return
      }
      const timer = setTimeout(() => {
        pathProgress.set(value + 0.001)
        increment()
      }, 1)
      return () => clearTimeout(timer)
    }
    increment()
  }, [])

  return (
    <div className={styles.wrapper}>
      <WelcomeWallpaper />
    </div>
  )
  return (
    <div className={styles.wrapper}>
      {/* <Traced.div className={styles.home} contentClassName={styles.homeContent}> */}
      <TracedWithProgress className={styles.home} progress={pathProgress}>
        <div className={styles.homeContent}>
          <Name className={styles.name} />
          <svg
            className={styles.generatedSvgText}
            viewBox="0 0 240 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text x="0" y="0" className="small">
              Long Generated SVG Text pretty neat
            </text>
          </svg>
        </div>
      </TracedWithProgress>
      {/* </Traced.div> */}
    </div>
  )
}

export default Home
