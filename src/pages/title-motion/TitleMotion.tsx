import css from "pages/pages.module.scss"
import DevNav, { DevNavInputType } from "components/dev-nav/DevNav"
import TitleMotionDisplay2 from "./TitleMotionDisplay2"
import SiteNav from "components/dev-nav/SiteNav"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import TitleMotionDisplay from "./TitleMotionDisplay"
import TitleMotionDisplay3 from "./TitleMotionDisplay3"
const styles = css as any

const TitleMotion = () => {
  const location = useLocation()
  const pageName = location.hash.slice(1, location.hash.length) || "0"

  const localNavItems: DevNavInputType[] = [
    {
      href: "/title-motion",
      buttonText: "Title Motion 0",
    },
    {
      href: "/title-motion#1",
      buttonText: "Title Motion 1",
      withHash: true,
    },
    {
      href: "/title-motion#2",
      buttonText: "Title Motion 2",
      withHash: true,
    },
    {
      href: "/title-motion#3",
      buttonText: "Title Motion 3",
      withHash: true,
    },
  ]

  return (
    <>
      <div className={styles.pageTitleMotion}>
        <SiteNav showToolbar={true} />
        {pageName === "0" && <TitleMotionDisplay />}
        {pageName === "1" && <TitleMotionDisplay2 />}
        {pageName === "2" && <TitleMotionDisplay3 />}
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

export default TitleMotion
