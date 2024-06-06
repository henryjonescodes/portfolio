import mushroomBackground from '@assets/jobs/mushroom-background.png'
import mushroomLogotype from '@assets/jobs/mushroom-logotype.png'

import MushroomLogotypeSvg from '@assets/jobs/mushroom-logotype.svg'

import channelBackground from '@assets/jobs/channel-background.png'
import channelLogotype from '@assets/jobs/channel-logotype.png'

import unionCollegeBackground from '@assets/jobs/union-college-background.png'
import unionCollegeLogotype from '@assets/jobs/union-college-logotype.png'

import tumblrBackground from '@assets/jobs/tumblr-background.png'
import tumblrLogotype from '@assets/jobs/tumblr-logotype.png'

import ExpoSvg from '@assets/svg/tools/expo-0.svg'
import FigmaSvg from '@assets/svg/tools/figma.svg'
import GraphqlSvg from '@assets/svg/tools/graphql.svg'
import PostgresqlSvg from '@assets/svg/tools/postgresql.svg'
import ReactSvg from '@assets/svg/tools/react-0.svg'
import TypeScriptSvg from '@assets/svg/tools/typescript-0.svg'

export type JobResponsibility = {
  title: string;
  description: string;
};

export type JobSkill = {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  title: string;
};

export type ExperienceDetails = {
  date: string;
  title: string;
  location: string;
  color: string;
  blurb: string;
  responsibilities: JobResponsibility[];
  skills: JobSkill[];
  backgroundImage: string;
  LogoType: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
};

type ExperienceMap = {
  [key: string]: ExperienceDetails;
};

export const mushroomDetails:ExperienceDetails = {
  date: 'March 2022 - January 2024',
  title: 'Software Engineer',
  location: 'Palo Alto, CA',
  color: "#F71953",
  blurb: 'Frontend focused engineer and design/engineering liaison. Balanced technical precision with creative flair to create engaging gamified social media experiences across web, mobile, and Discord.',
  responsibilities: [
    {
      title: 'Design System Engineering Lead',
      description: 'Spearheaded the development and maintenance of interactive interface implementations, focusing on intuitive user experiences and robust backend functionality.',
    },
    {
      title: 'React/React-Native Design Implementation',
      description: 'Implemented dynamic and responsive user interfaces, leveraging React and React Native to deliver a seamless cross-platform experience.',
    },
    {
      title: 'GraphQL Integration',
      description: 'Integrated GraphQL for efficient data management in numerous interfaces and projects.',
    },
  ],
  skills: [
    { icon: ReactSvg, title: 'React' },
    { icon: PostgresqlSvg, title: 'PostgreSQL' },
    { icon: GraphqlSvg, title: 'GraphQL' },
    { icon: TypeScriptSvg, title: 'TypeScript' },
    { icon: ExpoSvg, title: 'Expo' },
    { icon: FigmaSvg, title: 'Figma' },
  ],
  backgroundImage: mushroomBackground,
  LogoType: MushroomLogotypeSvg
};

export const channelDetails: ExperienceDetails = {
  date: 'January 2024 - Present',
  title: 'Software Engineer',
  location: 'Palo Alto, CA',
  color: '#191A1F',
  blurb: 'iOS developer crafting the future of AI-enhanced communication. Design-Tech Bridge facilitating rapid iteration and design system consistency.',
  responsibilities: [
    {
      title: 'UI Interoperability Expert',
      description: 'Seamlessly uniting SwiftUI with UIKit to deliver inclusive, future-forward interfaces that bridge new possibilities with established functionality.',
    },
    {
      title: 'SwiftUI Design System Innovator',
      description: 'Building and maintaining a SwiftUI-centric design system, ensuring visual and functional excellence throughout our AI-integrated chat interfaces.',
    },
    {
      title: 'GraphQL Integration',
      description: 'Integrated GraphQL for efficient data management in numerous interfaces and projects.',
    },
  ],
  skills: [
    // { icon: SwiftSvg, title: 'Swift' },
    // { icon: ObjectiveCSvg, title: 'Objective-C' },
    { icon: FigmaSvg, title: 'Figma' },
  ],
  backgroundImage: channelBackground,
  LogoType: MushroomLogotypeSvg
};

export const unionCollegeDetails: ExperienceDetails = {
  date: 'Fall 2017 - Spring 2021',
  title: 'B.A. Computer Science',
  location: 'Schenectady, NY',
  color: '#990000', // Use the color from the logo/banner
  blurb: 'Studied computer science with a major focus on user interfaces. Took various art classes including 3D Graphics (art/CS cross departmental) and physical computing (microcontroller enhanced art in physical media).',
  responsibilities: [
    {
      title: 'UI Interoperability Expert',
      description: 'Seamlessly uniting SwiftUI with UIKit to deliver inclusive, future-forward interfaces that bridge new possibilities with established functionality.',
    },
    {
      title: 'SwiftUI Design System Innovator',
      description: 'Building and maintaining a SwiftUI-centric design system, ensuring visual and functional excellence throughout our AI-integrated chat interfaces.',
    },
    {
      title: 'GraphQL Integration',
      description: 'Integrated GraphQL for efficient data management in numerous interfaces and projects.',
    },
  ],
  skills: [
    // { icon: SwiftSvg, title: 'Swift' },
    // { icon: ObjectiveCSvg, title: 'Objective-C' },
    { icon: FigmaSvg, title: 'Figma' },
  ],
  backgroundImage: unionCollegeBackground,
  LogoType: MushroomLogotypeSvg
};

export const experienceMap: ExperienceMap = {
  mushroom: mushroomDetails,
  channel: channelDetails,
  union: unionCollegeDetails,
};