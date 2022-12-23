import DevNav from "../../components/dev-nav/DevNav"
import css from "./../pages.module.scss"

const styles = css as any

const Home = () => {
  return (
    <div className={styles.pageHome}>
      <DevNav showToolBar={true} />
    </div>
  )
}

export default Home
