import React from "react"
import css from "pages/pages.module.scss"
import SiteNav from "components/dev-nav/SiteNav"
import AnimationOne from "./AnimationOne"
import AnimationTwo from "./AnimationTwo"
import DevNav, { DevNavInputType } from "components/dev-nav/DevNav"
import { useLocation } from "react-router"
import AnimationThree from "./AnimationThree"
const styles = css as any

const LoadingAnimations = () => {
  const location = useLocation()
  const pageName = location.hash.slice(1, location.hash.length) || "0"

  const localNavItems: DevNavInputType[] = [
    {
      href: "/loading-animations",
      buttonText: "Loading 1",
    },
    {
      href: "/loading-animations#1",
      buttonText: "Loading 2",
      withHash: true,
    },
    {
      href: "/loading-animations#2",
      buttonText: "Loading 3",
      withHash: true,
    },
  ]
  return (
    <>
      <div className={styles.pageLoadingAnimations}>
        <SiteNav showToolbar={false} />
        {pageName === "0" && <AnimationOne />}
        {pageName === "1" && <AnimationTwo />}
        {pageName === "2" && <AnimationThree />}
      </div>
      <DevNav
        className={styles.pageNav}
        navItems={localNavItems}
        hiding={false}
        withHash={true}
      />
    </>
  )
}

export default LoadingAnimations
