import mushroomBackground from '@assets/jobs/mushroom-background.png'
import mushroomLogotype from '@assets/jobs/mushroom-logotype.png'

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
import ObjectiveCSvg from '@assets/svg/tools/objective-c.svg'
import RubySvg from '@assets/svg/tools/ruby.svg'
import SwiftSvg from '@assets/svg/tools/swift-01.svg'
import XMPPSvg from '@assets/svg/tools/xmpp.svg'

export type JobResponsibility = {
  title: string;
  description: string;
};

export type JobSkill = {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  title: string;
};

export type ExperienceDetails = {
  title: string;
  location: string;
  color: string;
  blurb: string;
  responsibilities: JobResponsibility[];
  skills: JobSkill[];
  backgroundImage: string;
  logoType: string;
  startDate: Date;
  endDate?: Date | null;
};

type ExperienceMap = {
  [key: string]: ExperienceDetails;
};

export const getDateString = (startDate: Date, endDate: Date | null, short?: boolean): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: short ? 'short' : 'long' };
  const start = startDate.toLocaleDateString('en-US', options);
  
  if (!endDate) {
    return start;
  }
  
  const today = new Date();
  const isToday = endDate.getDate() === today.getDate() &&
                  endDate.getMonth() === today.getMonth() &&
                  endDate.getFullYear() === today.getFullYear();
  
  const end = isToday ? (short ? 'Now' : 'Present') : endDate.toLocaleDateString('en-US', options);
  
  return `${start} - ${end}`;
};

export const mushroomDetails:ExperienceDetails = {
  startDate: new Date(2022, 2, 1), 
  endDate: new Date(2024, 0, 1), 
  title: 'Software Engineer',
  location: 'Palo Alto, CA',
  color: "#F71953",
  blurb: 'Frontend focused engineer and design/engineering liaison. Balanced technical precision with creative flair to create engaging gamified social media experiences across web, mobile, and Discord.',
  responsibilities: [
    {
      title: 'Design System Engineering Lead',
      description: 'Built and maintained color, typography, and component libraries to enable consistent UI elements across our web, mobile, and discord products',
    },
    {
      title: 'React/React-Native Design Implementation',
      description: 'Helped architect, build, and publish the Mushroom mobile app using React-Native, obsessing over feature parity to ensure a consistent user experience across both projects.',
    },
    {
      title: 'GraphQL Integration',
      description: 'Enhanced engagement by introducing new features from concept to production, integrating Postgres with React via custom GraphQL for a richer social media experience.',
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
  logoType: mushroomLogotype,
};

export const channelDetails: ExperienceDetails = {
  startDate: new Date(2024, 0, 1),
  endDate: new Date(2024, 4, 1),
  title: 'Software Engineer',
  location: 'Palo Alto, CA',
  color: '#191A1F',
  blurb: 'iOS developer crafting the future of AI-enhanced communication. Design-Tech Bridge facilitating rapid iteration and design system consistency.',
  responsibilities: [
    {
      title: 'Founding Engineer',
      description: 'Built out initial iOS functionality working with a bare-bones team of 3 from idea to app store release.',
    },
    {
      title: 'UI Interoperability Expert',
      description: 'Seamlessly uniting SwiftUI with UIKit to deliver inclusive, future-forward interfaces that bridge new possibilities with established functionality.',
    },
    {
      title: 'AI Model Integrator',
      description: 'Enhanced engagement by introducing new features from concept to production, integrating Postgres with React via custom GraphQL for a richer social media experience.',
    },
  ],
  skills: [
    { icon: SwiftSvg, title: 'Swift' },
    { icon: ObjectiveCSvg, title: 'Objective-C' },
    { icon: FigmaSvg, title: 'Figma' },
  ],
  backgroundImage: channelBackground,
  logoType: channelLogotype,
};

export const unionCollegeDetails: ExperienceDetails = {
  startDate: new Date(2017,8,1),
  endDate: new Date(2021,5,1),
  title: 'B.A. Computer Science',
  location: 'Schenectady, NY',
  color: '#892034', // Use the color from the logo/banner
  blurb: 'Bachelor of arts in Computer Science, minor in Spanish. Focused on user interface design principles, 3D/Multimedia art, and UX research.',
  responsibilities: [
    {
      title: 'User Interface Researcher',
      description: 'Designed and implemented a research study examining users’ trust response to software agents of varying reliability within a simplified video game environment.',
    },
    {
      title: 'UX Analyzer',
      description: `Conducted statistical analyses of multiple-cohort UX experiments via A/B testing to derive insights users' perception of software reliability.`,
    },
  ],
  skills: [
 
  ],
  backgroundImage: unionCollegeBackground,
  logoType: unionCollegeLogotype
};

export const tumblrDetails: ExperienceDetails = {
  startDate: new Date(2015,1,1),
  endDate: null,
  title: 'Software Intern (Systems)',
  location: 'New York, NY',
  color: '#001935', // Use the color from the logo/banner
  blurb: 'Studied computer science with a major focus on user interfaces. Took various art classes including 3D Graphics (art/CS cross departmental) and physical computing (microcontroller enhanced art in physical media).',
  responsibilities: [
    {
      title: 'Systems Scholar',
      description: 'Assisted in the development and deployment of new system features while collaborating with senior engineers to gain comprehensive insights into system architecture and operational processes.',
    },
  ],
  skills: [
    { icon: RubySvg, title: 'Ruby' },
  ],
  backgroundImage: tumblrBackground,
  logoType: tumblrLogotype
};

export const experienceMap: ExperienceMap = {
  "mushroom": mushroomDetails,
  "channel": channelDetails,
  "union": unionCollegeDetails,
  "tumblr": tumblrDetails,
};