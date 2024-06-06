import React from 'react'
import styles from './links.module.scss'
import Instagram from '@assets/svg/socials/Instagram.svg'
import GitHub from '@assets/svg/socials/github-black.svg'
import Linkedin from '@assets/svg/socials/linkedin-black.svg'
import Mail from '@assets/svg/socials/mail.svg'
import Calendar from '@assets/svg/socials/calendar.svg'
import Website from '@assets/svg/socials/website.svg'

import IconsGrid from '@assets/svg/backgrounds/IconsGrid.svg'
import IconsGridSquare from '@assets/svg/backgrounds/IconsGridSquare.svg'

const Links = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <div className={styles.header}>
          <h1>Henry Jones</h1>
          <h3>Creative Developer</h3>
        </div>
        <div className={styles.links}>
          <LinksRow
            title="Email"
            icon={Mail}
            url="mailto:henryjonescodes@gmail.com"
          />
          <LinksRow
            title="Calendar"
            icon={Calendar}
            url="https://calendar.google.com"
          />
          <LinksRow
            title="LinkedIn"
            icon={Linkedin}
            url="https://www.linkedin.com/in/henryjonescodes/"
          />
          <LinksRow
            title="Instagram"
            icon={Instagram}
            url="https://www.instagram.com/theycallmezonez/"
          />
          <LinksRow
            title="Github"
            icon={GitHub}
            url="https://github.com/henryjonescodes/"
          />
          <LinksRow title="Website" icon={Website} url="/" />
        </div>
      </div>
      <div className={styles.background}>
        <IconsGridSquare preserveAspectRatio="xMidYMid slice" />
      </div>
    </div>
  )
}

type LinksRowProps = {
  title: string
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  url: string // Add a new prop for the URL
}

const LinksRow: React.FC<LinksRowProps> = ({ title, icon: Icon, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.row}
    >
      <Icon />
      <h4>{title}</h4>
    </a>
  )
}
export default Links
