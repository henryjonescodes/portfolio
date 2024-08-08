import Channel from '@assets/jobs/channel-icon.svg'
import Mushroom from '@assets/jobs/mushroom-icon.svg'
import Tumblr from '@assets/jobs/tumblr-icon.svg'
import Book from '@assets/svg/icons/book.svg'
import House from '@assets/svg/icons/house.svg'



export const locationData: Record<'portland' | 'paloAlto' | 'nyc' | 'schenectady', PointOfInterest> =
  {
    // portland: {
    //   prefix: 'I grew up in',
    //   title: 'Portland, Maine',
    //   description:
    //     'I grew up in the northeast in coastal Maine. I spent my time sailing off rocky shores, hiking and biking around pristine mountains, lakes, and rivers, and cooking at various restaurants throughout Portland’s diverse restaurant scene.',
    //   mapTitle: 'PORTLAND, ME',
    //   mapHighlights: [{ icon: Book, text: 'Casco Bay HS' }],
    // },
    portland: {
      prefix: 'I’m currently based in',
      title: 'Portland, Maine',
      description:
        'I’m searching for my next professional adventure in software, enjoying summer on the coast with family and friends, and getting some of my personal projects off of my backlog.',
      mapTitle: 'PORTLAND, ME',
      mapHighlights: [{ icon: House, text: 'Home' }],
    },
    paloAlto: {
      prefix: 'I make apps in',
      title: 'Palo Alto, California',
      description:
        'I’ve spent the past few years Immersed in the consumer-tech startup scene building elegant and performant chat and social media UIs for web and mobile.',
      mapTitle: 'PALO ALTO, CA',
      mapHighlights: [
        { icon: Mushroom, text: 'Mushroom.gg' },
        { icon: Channel, text: 'ChannelAI' },
      ],
    },
    nyc: {
      prefix: 'I interned at Tumblr in',
      title: 'New York City',
      description:
        'After an internship with Tumblr early on my journey into software and a stint living in Manhattan during college, I love NYC. I’m currently in process of moving from California, destination Brooklyn.',
      mapTitle: 'NEW YORK, NY',
      mapHighlights: [{ icon: Tumblr, text: 'Tumblr' }],
    },
    schenectady: {
      prefix: 'I went to Union College in',
      title: 'Schenectady, New York',
      description:
        'Focusing on UI research and creative development I earned a B.A. in Computer Science with a minor in Spanish, collecting various 3D design and film studies credits along the way.',
      mapTitle: 'SCHENECTADY, NY',
      mapHighlights: [{ icon: Book, text: 'Union College' }],
    },
  }

