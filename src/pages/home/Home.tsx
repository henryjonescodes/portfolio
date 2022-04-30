import React from 'react'
import About from '../../components/about/About'
import Scene from '../../components/scene/Scene'
import Styles from './home.module.css'

const Home = () => {
  return (
    <div className={Styles.home}>
        <Scene/>
        <About/>
    </div>
  )
}

export default Home