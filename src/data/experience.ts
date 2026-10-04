import type { EntryData } from '@components/ExperienceEntry/types';
import Java from '@assets/svg/tools/Java.svg?react';
import React from '@assets/svg/tools/React.svg?react';
import Sass from '@assets/svg/tools/Sass.svg?react';
import Typescript from '@assets/svg/tools/Typescript.svg?react';
import Swift from '@assets/svg/tools/Swift.svg?react';
import Book from '@assets/svg/icons/book-01.svg?react';
import Handheld from '@assets/svg/icons/handheld.svg?react';
import Mail from '@assets/svg/socials/mail.svg?react';

export const experienceData: Record<string, EntryData> = {
  arbor: {
    id: 'arbor',
    media: { placeholder: 'Arbor product screens: the savings view or a notification' },
    title: 'Arbor',
    subtitle: 'Full Stack Engineer',
    description: [
      '— Designed and delivered custom {{arbor/notifier|email notification system}} to provide real-time insights to users about their savings with Arbor',
    ],
    blurb:
      'Full stack engineer building the features that show people how much they save with Arbor, starting with a real-time {{arbor/notifier|email notification system}}, and building {{arbor/almanac|Almanac}}, the team’s skill manager.',
    startDate: new Date(2025, 0),
    gallery: [
      { shape: 'wide', media: { placeholder: 'Arbor savings dashboard, desktop' } },
      { shape: 'tall', media: { placeholder: 'A savings email on a phone' } },
      { shape: 'square', media: { placeholder: 'Notification template close-up' } },
      { shape: 'square', media: { placeholder: 'Team or office photo' } },
      { shape: 'wide', media: { placeholder: 'Almanac skill catalogue' } },
    ],
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
    efforts: [
      {
        id: 'notifier',
        title: 'User notifier',
        Icon: Mail,
        paint: 'stroke',
        summary:
          'A real-time email notification system that shows Arbor users what they are saving.',
        panels: [
          {
            type: 'hero',
            title: 'At a glance',
            items: [
              {
                value: 250000,
                format: 'compact',
                suffix: '/ month',
                label: 'Notifications sent',
                unverified: true,
              },
              {
                value: 99.99,
                format: 'percent',
                label: 'Delivered successfully',
                meter: 0.9999,
                unverified: true,
              },
            ],
          },
          {
            type: 'media',
            span: 'full',
            media: { placeholder: 'A savings email as it lands in an inbox' },
          },
        ],
      },
      {
        id: 'almanac',
        title: 'Almanac',
        Icon: Book,
        summary:
          'A skill manager for the team’s AI coding agents: one catalogue of shared skills, kept in step across every repo.',
        panels: [
          {
            type: 'media',
            span: 'full',
            media: { placeholder: 'Screenshot of the Almanac skill catalogue' },
          },
        ],
      },
    ],
  },
  channelai: {
    id: 'channelai',
    media: { placeholder: 'ChannelAI iOS screens on a phone frame' },
    title: 'ChannelAI',
    subtitle: 'iOS Engineer, Design System Lead',
    description: [
      "— Delivered interactive UI features and maintained design assets across departments for Channel's AI-powered chat platform.",
      '— Worked extensively with Objective-C, Swift, and SwiftUI to implement core iOS features such as user profiles, media galleries, and app settings.',
      '— Led {{channelai/kiki|design system}} management, ensuring consistency in components, color, and typography across the app.',
    ],
    blurb:
      'iOS developer crafting the future of AI-enhanced communication. Design-Tech Bridge facilitating rapid iteration and design system consistency.',
    startDate: new Date(2024, 0),
    endDate: new Date(2024, 4),
    gallery: [
      { shape: 'tall', media: { placeholder: 'ChannelAI chat screen on an iPhone' } },
      { shape: 'square', media: { placeholder: 'Profile screen' } },
      { shape: 'square', media: { placeholder: 'Media gallery screen' } },
      { shape: 'wide', media: { placeholder: 'Kiki UI component sheet' } },
    ],
    tools: [
      {
        Icon: Swift,
        label: 'Swift',
      },
    ],
    efforts: [
      {
        id: 'kiki',
        title: 'Kiki UI',
        Icon: Handheld,
        summary:
          'The design system behind ChannelAI’s iOS app: shared components, color and typography, kept consistent across the app and with design.',
        panels: [
          {
            type: 'media',
            span: 'full',
            media: { placeholder: 'Kiki UI component sheet, or a few screens built with it' },
          },
        ],
      },
    ],
  },
  mushroom: {
    id: 'mushroom',
    media: { placeholder: 'Mushroom.gg feed or chat screens, web and mobile' },
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
    gallery: [
      { shape: 'wide', media: { placeholder: 'Mushroom.gg feed on web' } },
      { shape: 'tall', media: { placeholder: 'Chat on mobile' } },
      { shape: 'square', media: { placeholder: 'Icon set from the design library' } },
    ],
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
    media: { placeholder: 'A still from the thesis or a Union College project' },
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
    media: { placeholder: 'A sample of the Tumblr-era work' },
    title: 'Tumblr',
    subtitle: 'Systems Intern',
    description: [
      '— Supported the systems department in various tasks during a high-school internship.',
      '— Gained exposure to the fast-paced environment of a tech startup, learning foundational industry skills.',
    ],
    blurb:
      'Interned with the systems department at Tumblr, studying system architecture, dev-ops best practices, and deployment strategies.',
    dateString: '2015',
  },
};

// Ordered list for display
export const experienceOrder = ['arbor', 'channelai', 'mushroom', 'union', 'tumblr'];
