import { getAuth } from "firebase/auth"
import DevNav, {
  DevNavButton,
  DevNavInputType,
  DevNavPrefilledProps,
} from "./DevNav"
import firebase from "firebaseApp"
import { useContext } from "react"
import { AuthContext } from "Auth"

const SiteNav = ({ transition, showToolbar }: DevNavPrefilledProps) => {
  const auth = getAuth(firebase)
  const { currentUser } = useContext(AuthContext)
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
      href: "/letter-motion",
      buttonText: "Letter Motion",
    },
    {
      href: "/drip-text",
      buttonText: "Drip Text",
    },
    {
      href: "/loading-animations",
      buttonText: "Loading Animations",
    },
    {
      href: "/intro-animations",
      buttonText: "Intro Animations",
    },
    {
      href: "/porthole",
      buttonText: "Porthole",
    },
  ]

  if (!currentUser) {
    return null
  }

  return (
    <DevNav
      navItems={siteNavItems}
      showToolbar={showToolbar}
      transition={transition}
      hiding={true}
    >
      <DevNavButton
        key={"sign-out"}
        buttonText={"Sign Out"}
        onClick={() => {
          auth.signOut()
        }}
        isSelected={false}
      />
    </DevNav>
  )
}

export default SiteNav
