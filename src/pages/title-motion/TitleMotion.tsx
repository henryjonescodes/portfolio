import React from "react"
import css from "./../pages.module.scss"
import DevNav from "../../components/dev-nav/DevNav"
const styles = css as any
const TitleMotion = () => {
  return (
    <div className={styles.pageThreeScroller}>
      <DevNav />
    </div>
  )
}

export default TitleMotion
