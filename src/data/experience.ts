import type { EntryData } from '@components/ExperienceEntry/types';
import Java from '@assets/svg/tools/Java.svg?react';
import React from '@assets/svg/tools/React.svg?react';
import Sass from '@assets/svg/tools/Sass.svg?react';
import Typescript from '@assets/svg/tools/Typescript.svg?react';
import Swift from '@assets/svg/tools/Swift.svg?react';

export const experienceData: Record<string, EntryData> = {
  arbor: {
    id: 'arbor',
    title: 'Arbor',
    subtitle: 'Full Stack Engineer',
    description: [
      '— Designed and delivered custom email notification system to provide real-time insights to users about their savings with Arbor ',
    ],
    blurb:
      'Full stack engineer building the features that show people how much they save with Arbor, starting with a real-time email notification system.',
    startDate: new Date(2025, 0),
    tools: [
      {
        Icon: React,
        label: 'React',
      },
      {
        Icon: Typescript,
        label: 'Typescript',
      },
    ],
  },
  channelai: {
    id: 'channelai',
    title: 'ChannelAI',
    subtitle: 'iOS Engineer, Design System Lead',
    description: [
      "— Delivered interactive UI features and maintained design assets across departments for Channel's AI-powered chat platform.",
      '— Worked extensively with Objective-C, Swift, and SwiftUI to implement core iOS features such as user profiles, media galleries, and app settings.',
      '— Led design system management, ensuring consistency in components, color, and typography across the app.',
    ],
    blurb:
      'iOS developer crafting the future of AI-enhanced communication. Design-Tech Bridge facilitating rapid iteration and design system consistency.',
    startDate: new Date(2024, 0),
    endDate: new Date(2024, 4),
    tools: [
      {
        Icon: Swift,
        label: 'Swift',
      },
    ],
  },
  mushroom: {
    id: 'mushroom',
    title: 'Mushroom.gg',
    subtitle: 'Full Stack Engineer, Design System Lead',
    description: [
      '— Contributed to the implementation of chat and feed features for a gaming-focused social media platform.',
      '— Managed cross-platform development for web and mobile using React, React Native, and GraphQL.',
      '— Led the development and maintenance of design libraries, including UI components and iconography.',
    ],
    blurb:
      'Frontend focused engineer and design/engineering liaison. Balanced technical precision with creative flair to create engaging gamified social media experiences across web, mobile, and Discord.',
    startDate: new Date(2022, 2),
    endDate: new Date(2024, 0),
    tools: [
      {
        Icon: React,
        label: 'React',
      },
      {
        Icon: React,
        label: 'React-Native',
      },
      {
        Icon: Typescript,
        label: 'Typescript',
      },
      {
        Icon: Sass,
        label: 'Sass',
      },
    ],
  },
  union: {
    id: 'union',
    title: 'Union College',
    subtitle: 'UI/UX Researcher',
    description: [
      '— Conducted a research study on user trust in software agents, using a custom Java game environment.',
      '— Designed and analyzed experiments to measure user interactions with varying levels of agent reliability.',
    ],
    blurb:
      'Bachelor of arts in Computer Science, minor in Spanish. Focused on user interface design principles, 3D/Multimedia art, and UX research.',
    startDate: new Date(2020, 8),
    endDate: new Date(2021, 5),
    tools: [
      {
        Icon: Java,
        label: 'Java',
      },
    ],
  },
  tumblr: {
    id: 'tumblr',
    title: 'Tumblr',
    subtitle: 'Systems Intern',
    description: [
      '— Supported the systems department in various tasks during a high-school internship.',
      '— Gained exposure to the fast-paced environment of a tech startup, learning foundational industry skills.',
    ],
    blurb:
      'Interned with the systems department at Tumblr, studying system architecture, dev-ops best practices, and deployment strategies.',
    endDate: new Date(2014, 1),
  },
};

// Ordered list for display
export const experienceOrder = ['arbor', 'channelai', 'mushroom', 'union', 'tumblr'];
