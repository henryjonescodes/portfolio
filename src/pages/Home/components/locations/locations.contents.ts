import Channel from '@assets/jobs/channel-icon.svg'
import Mushroom from '@assets/jobs/mushroom-icon.svg'
import Tumblr from '@assets/jobs/tumblr-icon.svg'
import Book from '@assets/svg/icons/book.svg'

export type PointOfInterest = {
  prefix: string
  title: string
  description: string
  mapTitle: string
  mapHighlights: {
    icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    text: string
  }[]
}

export const locationData: Record<'portland' | 'paloAlto' | 'nyc' | 'schenectady', PointOfInterest> =
  {
    portland: {
      prefix: 'I grew up in',
      title: 'Portland, Maine',
      description:
        'I grew up in the northeast in coastal Maine. I spent my time sailing off rocky shores, hiking and biking around pristine mountains, lakes, and rivers, and cooking at various restaurants throuought Portland’s diverse restaurant scene.',
      mapTitle: 'PORTLAND, ME',
      mapHighlights: [{ icon: Book, text: 'Casco Bay HS' }],
    },
    paloAlto: {
      prefix: 'I worked at startups in',
      title: 'Palo Alto, California',
      description:
        'I grew up in the northeast in coastal Maine. I spent my time sailing off rocky shores, hiking and biking around pristine mountains, lakes, and rivers, and cooking at various restaurants throuought Portland’s diverse restaurant scene.',
      mapTitle: 'PALO ALTO, CA',
      mapHighlights: [
        { icon: Mushroom, text: 'Mushroom.gg' },
        { icon: Channel, text: 'ChannelAI' },
      ],
    },
    nyc: {
      prefix: 'I lived and interned in',
      title: 'New York, New York',
      description:
        'I grew up in the northeast in coastal Maine. I spent my time sailing off rocky shores, hiking and biking around pristine mountains, lakes, and rivers, and cooking at various restaurants throuought Portland’s diverse restaurant scene.',
      mapTitle: 'NEW YORK, NY',
      mapHighlights: [{ icon: Tumblr, text: 'Tumblr' }],
    },
    schenectady: {
      prefix: 'I went to Union College in',
      title: 'Schenectady, New York',
      description:
        'I grew up in the northeast in coastal Maine. I spent my time sailing off rocky shores, hiking and biking around pristine mountains, lakes, and rivers, and cooking at various restaurants throuought Portland’s diverse restaurant scene.',
      mapTitle: 'SCHENECTADY, NY',
      mapHighlights: [{ icon: Book, text: 'Union College' }],
    },
  }

const keys = ['portland', 'paloAlto', 'nyc', 'schenectady'] as const
export type LocationPinKeys = (typeof keys)[number]