import DevNav from "components/dev-nav/DevNav"
import DripTextDisplay from "./DripTextDisplay"

import css from "pages/pages.module.scss"
const styles = css as any

const DripText = () => {
  return (
    <div className={styles.pageHome}>
      <DevNav showToolBar={true} />
      <DripTextDisplay />
    </div>
  )
}

export default DripText
