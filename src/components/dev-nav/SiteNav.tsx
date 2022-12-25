import DevNav, { DevNavInputType, DevNavPrefilledProps } from "./DevNav"

const SiteNav = ({ transition, showToolbar }: DevNavPrefilledProps) => {
  const siteNavItems: DevNavInputType[] = [
    {
      href: "/",
      buttonText: "Home",
    },
    {
      href: "/three-js",
      buttonText: "Three Scroller",
    },
    {
      href: "/title-motion",
      buttonText: "Title Motion",
    },
    {
      href: "/drip-text",
      buttonText: "Drip Text",
    },
  ]

  return (
    <DevNav
      navItems={siteNavItems}
      showToolbar={showToolbar}
      transition={transition}
      hiding={true}
    />
  )
}

export default SiteNav
