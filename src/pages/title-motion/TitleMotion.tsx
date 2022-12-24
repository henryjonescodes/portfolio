import css from "pages/pages.module.scss"
import DevNav from "components/dev-nav/DevNav"
const styles = css as any

const TitleMotion = () => {
  return (
    <div className={styles.pageTitleMotion}>
      <DevNav showToolBar={true} />
    </div>
  )
}

export default TitleMotion
