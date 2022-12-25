import About from "components/about/About"
import Scene from "components/scene/Scene"

import SiteNav from "components/dev-nav/SiteNav"
import css from "pages/pages.module.scss"
const styles = css as any

const ThreeScroller = () => {
  return (
    <div className={styles.pageThreeScroller}>
      <SiteNav showToolbar={true} />
      <Scene />
      <About />
    </div>
  )
}

export default ThreeScroller
