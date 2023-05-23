import Traced from '../components/Traced/Traced'
import React from 'react'
import styles from './pages.module.scss'
import NameSvg from '../assets/svg/Name.svg'
import MoonMagnifySvg from '../assets/svg/MoonMagnify.svg'
import Name from '@assets/svg/Name.svg'
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Traced.div className={styles.home} contentClassName={styles.homeContent}>
        <Name className={styles.name} />
      </Traced.div>
    </div>
  )
}

export default Home
