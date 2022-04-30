import DevNav, { DevNavInputType } from "@components/dev-nav/DevNav"
import SiteNav from "@components/dev-nav/SiteNav"
import css from "@pages/pages.module.scss"
import { useLocation } from "react-router"
import AnimationOne from "./AnimationOne"
const styles = css as any

const IntroAnimations = () => {
  const location = useLocation()
  const pageName = location.hash.slice(1, location.hash.length) || "0"

  const localNavItems: DevNavInputType[] = [
    {
      href: "/intro-animations",
      buttonText: "Intro 1",
    },
    // {
    //   href: "/intro-animations#1",
    //   buttonText: "Intro 2",
    //   withHash: true,
    // },
    // {
    //   href: "/intro-animations#2",
    //   buttonText: "Intro 3",
    //   withHash: true,
    // },
  ]
  return (
    <>
      <div className={styles.pageWrapper}>
        <SiteNav showToolbar={false} />
        {pageName === "0" && <AnimationOne />}
        {/* {pageName === "1" && <AnimationTwo />} */}
        {/* {pageName === "2" && <AnimationThree />} */}
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

export default IntroAnimations
