import DevNav from "components/dev-nav/DevNav"
import DripTextDisplay from "./DripTextDisplay"

import css from "pages/pages.module.scss"
import SiteNav from "components/dev-nav/SiteNav"
const styles = css as any

const DripText = () => {
  return (
    <div className={styles.pageHome}>
      <SiteNav showToolbar={true} />
      <DripTextDisplay />
    </div>
  )
}

export default DripText
