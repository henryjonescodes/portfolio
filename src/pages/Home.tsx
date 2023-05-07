import Traced from '../components/Traced/Traced'
import React from 'react'
import styles from './pages.module.scss'
import NameSvg from '../assets/svg/Name.svg'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Traced.div className={styles.home} contentClassName={styles.homeContent}>
        {/* <NameSvg /> */}
      </Traced.div>
    </div>
  )
}

export default Home
