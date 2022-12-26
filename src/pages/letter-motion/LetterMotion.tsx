import css from "pages/pages.module.scss"
import DevNav, { DevNavInputType } from "components/dev-nav/DevNav"
import TitleMotionDisplay2 from "pages/title-motion/dev/TitleMotionDisplay2"
import SiteNav from "components/dev-nav/SiteNav"
import { useLocation } from "react-router-dom"
import LetterMotionDisplay from "./letter-motion/LetterMotionDisplay"
const styles = css as any

const LetterMotion = () => {
  const location = useLocation()
  const pageName = location.hash.slice(1, location.hash.length) || "0"

  const localNavItems: DevNavInputType[] = [
    {
      href: "/letter-motion",
      buttonText: "Title Motion 0",
    },
    {
      href: "/letter-motion#1",
      buttonText: "Title Motion 1",
      withHash: true,
    },
  ]

  return (
    <>
      <div className={styles.pageTitleMotion}>
        <SiteNav showToolbar={false} />
        {pageName === "0" && <LetterMotionDisplay />}
        {pageName === "1" && <LetterMotionDisplay />}
      </div>
      <DevNav
        className={styles.pageTitleMotion__nav}
        navItems={localNavItems}
        hiding={false}
        withHash={true}
      />
    </>
  )
}

export default LetterMotion
