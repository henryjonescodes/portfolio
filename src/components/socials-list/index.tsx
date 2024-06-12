import React from 'react'
import LinkedIn from '@assets/svg/socials/linkedIn.svg'
import GitHub from '@assets/svg/socials/github.svg'
import Instagram from '@assets/svg/socials/Instagram.svg'
import Calendly from '@assets/svg/socials/calendar.svg'
import Link from '@assets/svg/icons/link.svg'
import Email from '@assets/svg/icons/send.svg'

import {
  CALENDAR_URL,
  EMAIL_URL,
  GITHUB_PROFILE_URL,
  INSTAGRAM_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from '@constants/links.constants'

import styles from './socials-list.module.scss'

type SocialsIconProps = {
  url: string
  newTab: boolean
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

const SocialsList = () => {
  return (
    <span className={styles.list}>
      <SocialsIcon url={LINKEDIN_PROFILE_URL} newTab={true} icon={LinkedIn} />
      <SocialsIcon url={GITHUB_PROFILE_URL} newTab={true} icon={GitHub} />
      <SocialsIcon url={INSTAGRAM_PROFILE_URL} newTab={true} icon={Instagram} />
      <SocialsIcon url={EMAIL_URL} newTab={true} icon={Email} />
      <SocialsIcon url={CALENDAR_URL} newTab={true} icon={Calendly} />
      <SocialsIcon url="/links" newTab={false} icon={Link} />
    </span>
  )
}

const SocialsIcon: React.FC<SocialsIconProps> = ({
  url,
  newTab,
  icon: Icon,
}) => {
  return (
    <a
      href={url}
      target={newTab ? '_blank' : '_self'}
      rel={newTab ? 'noopener noreferrer' : ''}
      className={styles.icon}
    >
      <Icon />
    </a>
  )
}

export default SocialsList
