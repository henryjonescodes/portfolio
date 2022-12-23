import React from "react"
import Scene from "../../components/scene/Scene"
import About from "../../components/about/About"
import DevNav from "../../components/dev-nav/DevNav"

import css from "./../pages.module.scss"
const styles = css as any

const ThreeScroller = () => {
  return (
    <div className={styles.pageThreeScroller}>
      <DevNav />
      <Scene />
      <About />
    </div>
  )
}

export default ThreeScroller