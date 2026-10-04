import Channel from '@assets/svg/experience/channel-icon.svg?react';
import Mushroom from '@assets/svg/experience/mushroom-icon.svg?react';
import Book from '@assets/svg/icons/book.svg?react';
import Building from '@assets/svg/icons/building.svg?react';
import styles from './map-components.module.scss';

type PointOfInterest = {
  prefix: string;
  title: string;
  description: string;
  mapTitle: string;
  mapHighlights: {
    icon: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string;
      }
    >;
    text: string;
  }[];
  className: string;
  pinClassName: string;
};

export type LocationPinKeys = 'portland' | 'paloAlto' | 'nyc' | 'schenectady';

export const locationData: Record<LocationPinKeys, PointOfInterest> = {
  nyc: {
    prefix: 'I’m based in',
    title: 'New York City',
    description:
      'I live in New York City and work remotely as a full stack engineer at Arbor, building the features that show people how much they save, with React, TypeScript and a real-time notification system behind them.',
    mapTitle: 'NEW YORK, NY',
    mapHighlights: [{ icon: Building, text: 'Arbor (remote)' }],
    className: styles.nyc,
    pinClassName: styles.nycPin,
  },
  paloAlto: {
    prefix: 'I made apps in',
    title: 'Palo Alto, California',
    description:
      'I’ve spent the past few years Immersed in the consumer-tech startup scene building elegant and performant chat and social media UIs for web and mobile.',
    mapTitle: 'PALO ALTO, CA',
    mapHighlights: [
      { icon: Mushroom, text: 'Mushroom.gg' },
      { icon: Channel, text: 'ChannelAI' },
    ],
    className: styles.paloAlto,
    pinClassName: styles.paloAltoPin,
  },
  schenectady: {
    prefix: 'I studied Computer Science at',
    title: 'Union College',
    description:
      'Focusing on UI research and creative development I earned a B.A. in Computer Science with a minor in Spanish, collecting various 3D design and film studies credits along the way.',
    mapTitle: 'SCHENECTADY, NY',
    mapHighlights: [{ icon: Book, text: 'Union College' }],
    className: styles.schenectady,
    pinClassName: styles.schenectadyPin,
  },
  portland: {
    prefix: 'I grew up in',
    title: 'Portland, Maine',
    description:
      'I grew up in the northeast in coastal Maine. I spent my time sailing off rocky shores, hiking and biking around pristine mountains, lakes, and rivers, and cooking at various restaurants throughout Portland’s diverse restaurant scene.',
    mapTitle: 'PORTLAND, ME',
    mapHighlights: [{ icon: Book, text: 'Casco Bay HS' }],
    className: styles.portland,
    pinClassName: styles.portlandPin,
  },
};
