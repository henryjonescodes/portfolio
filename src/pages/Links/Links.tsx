import React from 'react'
import styles from './links.module.scss'
import Instagram from '@assets/svg/socials/instagram-black.svg'
import GitHub from '@assets/svg/socials/github-black.svg'
import Linkedin from '@assets/svg/socials/linkedin-black.svg'
import Mail from '@assets/svg/socials/mail.svg'
import Calendar from '@assets/svg/socials/calendar-black.svg'
import Website from '@assets/svg/socials/website.svg'
import Resume from '@assets/svg/icons/list-black.svg'

import IconsGridSquare from '@assets/svg/backgrounds/IconsGridSquare.svg'
import {
  CALENDAR_URL,
  EMAIL_URL,
  GITHUB_PROFILE_URL,
  INSTAGRAM_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from '@constants/links.constants'

const Links = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <div className={styles.header}>
          <h1>Henry Jones</h1>
          <h3>Creative Developer</h3>
        </div>
        <div className={styles.links}>
          <LinksRow title="Email" icon={Mail} href={EMAIL_URL} />
          <LinksRow title="Calendar" icon={Calendar} href={CALENDAR_URL} />
          <LinksRow
            title="LinkedIn"
            icon={Linkedin}
            href={LINKEDIN_PROFILE_URL}
          />
          <LinksRow
            title="Instagram"
            icon={Instagram}
            href={INSTAGRAM_PROFILE_URL}
          />
          <LinksRow title="Github" icon={GitHub} href={GITHUB_PROFILE_URL} />
          <LinksRow
            title="Resume"
            icon={Resume}
            href="/public/Henry-Jones-Resume.pdf"
            download="Henry-Jones-Resume.pdf"
          />
          <LinksRow title="Website" icon={Website} href="/" />
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
  href: string
  download?: string
}

const LinksRow: React.FC<LinksRowProps> = ({
  title,
  icon: Icon,
  href,
  download,
}) => {
  return (
    <a
      href={href}
      download={download}
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
