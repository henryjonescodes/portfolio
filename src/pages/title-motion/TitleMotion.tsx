import css from "pages/pages.module.scss"
import DevNav, { DevNavInputType } from "components/dev-nav/DevNav"
import TitleMotionDisplay2 from "./TitleMotionDisplay2"
import SiteNav from "components/dev-nav/SiteNav"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import TitleMotionDisplay from "./TitleMotionDisplay"
import TitleMotionDisplay3 from "./TitleMotionDisplay3"
import TitleMotionDisplay4 from "./TitleMotionDisplay4"
import TitleMotionDisplay5 from "./TitleMotionDisplay5"
import TitleMotionDisplay6 from "./TitleMotionDisplay6"
import TitleMotionDisplay7 from "./TitleMotionDisplay7"
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
    {
      href: "/title-motion#4",
      buttonText: "Title Motion 4",
      withHash: true,
    },
    {
      href: "/title-motion#5",
      buttonText: "Title Motion 5",
      withHash: true,
    },
    {
      href: "/title-motion#6",
      buttonText: "Title Motion 6",
      withHash: true,
    },
  ]

  return (
    <>
      <div className={styles.pageTitleMotion}>
        <SiteNav showToolbar={false} />
        {pageName === "0" && <TitleMotionDisplay />}
        {pageName === "1" && <TitleMotionDisplay2 />}
        {pageName === "2" && <TitleMotionDisplay3 />}
        {pageName === "3" && <TitleMotionDisplay4 />}
        {pageName === "4" && <TitleMotionDisplay5 />}
        {pageName === "5" && <TitleMotionDisplay6 />}
        {pageName === "6" && <TitleMotionDisplay7 />}
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
