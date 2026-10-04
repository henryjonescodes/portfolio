import type { FunctionComponent, SVGProps } from 'react';
import List from '@assets/svg/icons/list.svg?react';
import Calendar from '@assets/svg/socials/calendar.svg?react';
import Github from '@assets/svg/socials/github.svg?react';
import Instagram from '@assets/svg/socials/Instagram.svg?react';
import LinkedIn from '@assets/svg/socials/linkedIn.svg?react';
import Email from '@assets/svg/socials/mail.svg?react';

export type LinkData = {
  label: string;
  href: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  /** Whether the icon is drawn with fills or strokes, which the theme colours differently. */
  paint: 'fill' | 'stroke';
};

export const RESUME_URL = '/pdf/Henry-Jones-Resume.pdf';

export const links: LinkData[] = [
  { label: 'Email', href: 'mailto:henryjonescodes@gmail.com', Icon: Email, paint: 'stroke' },
  {
    label: 'Calendar',
    href: 'https://calendly.com/henryjonescodes',
    Icon: Calendar,
    paint: 'stroke',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/henryjonescodes/',
    Icon: LinkedIn,
    paint: 'fill',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/theycallmezonez/',
    Icon: Instagram,
    paint: 'fill',
  },
  { label: 'GitHub', href: 'https://github.com/henryjonescodes/', Icon: Github, paint: 'fill' },
  { label: 'Resume', href: RESUME_URL, Icon: List, paint: 'stroke' },
];
