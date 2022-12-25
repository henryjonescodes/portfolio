import SiteNav from "components/dev-nav/SiteNav"
import css from "pages/pages.module.scss"

const styles = css as any

const Home = () => {
  return (
    <div className={styles.pageHome}>
      <SiteNav showToolbar={true} />
    </div>
  )
}

export default Home
