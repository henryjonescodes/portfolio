import type { EntryData } from '@components/ExperienceEntry/types';
import ThreeJs from '@assets/svg/tools/ThreeJs.svg?react';
import Blender from '@assets/svg/tools/Blender.svg?react';
import Java from '@assets/svg/tools/Java.svg?react';
import React from '@assets/svg/tools/React.svg?react';
import Sass from '@assets/svg/tools/Sass.svg?react';
import Framer from '@assets/svg/tools/Framer.svg?react';

export const projectsData: Record<string, EntryData> = {
  portfoliov2: {
    id: 'portfoliov2',
    panels: [
      {
        type: 'links',
        title: 'Links',
        span: 'half',
        links: [{ label: 'Visit v2.henryjones.xyz', href: 'https://v2.henryjones.xyz' }],
      },
    ],
    media: { video: 'video/v2-loop.mp4', objectPosition: '0%' },
    title: 'Portfolio v2',
    description: [
      'Portfolio site showcasing 2D animations, work experience, and my presence online,',
      'Tools: Framer Motion, React, SASS, Webpack, SVG',
    ],
    blurb:
      'The second version of this site: a 2D portfolio built around Framer Motion, with animated SVG work, work experience, and links to everywhere I am online.',
    url: 'https://v2.henryjones.xyz',
    dateString: '2023',
    tools: [
      {
        Icon: Framer,
        label: 'Framer Motion',
      },
      {
        Icon: React,
        label: 'React',
      },
      {
        Icon: Sass,
        label: 'Sass',
      },
    ],
  },
  virtualportfolio: {
    id: 'virtualportfolio',
    panels: [
      {
        type: 'links',
        title: 'Links',
        span: 'half',
        links: [{ label: 'Visit tower.henryjones.xyz', href: 'https://tower.henryjones.xyz' }],
      },
    ],
    media: { video: 'video/tower-loop.mp4' },
    title: 'Virtual Portfolio',
    description: [
      'Experiment with using Three.js to build a 3D portfolio site.',
      'All models were custom made in Blender.',
      'Tools: Three.js, React, Blender',
    ],
    blurb:
      'An experiment in building a portfolio as a 3D space with Three.js and React. Every model in the scene was made by hand in Blender.',
    url: 'https://tower.henryjones.xyz',
    tools: [
      {
        Icon: ThreeJs,
        label: 'Three.js',
      },
      {
        Icon: React,
        label: 'React',
      },
      {
        Icon: Blender,
        label: 'Blender',
      },
    ],
    dateString: '2022',
  },
  portfoliov1: {
    id: 'portfoliov1',
    panels: [
      {
        type: 'links',
        title: 'Links',
        span: 'half',
        links: [{ label: 'Visit v1.henryjones.xyz', href: 'https://v1.henryjones.xyz' }],
      },
    ],
    media: { img: 'images/v1.png' },
    title: 'Portfolio v1',
    description: [
      'Playful portfolio site showcasing pre-tech work experience & interactive 2D animations,',
      'Tools: Framer Motion, React',
    ],
    blurb:
      'The first portfolio: a playful site with interactive 2D animations that showcased my work before I moved into tech.',
    url: 'https://v1.henryjones.xyz',
    dateString: '2021',
    tools: [
      {
        Icon: Framer,
        label: 'Framer Motion',
      },
      {
        Icon: React,
        label: 'React',
      },
    ],
  },
  thesis: {
    id: 'thesis',
    panels: [
      {
        type: 'links',
        title: 'Read',
        span: 'half',
        links: [
          { label: 'Thesis (PDF)', href: '/pdf/TrustResponseToAnticipatorySoftwareAgents.pdf' },
        ],
      },
    ],
    media: { img: 'images/thesis.png' },
    title: 'Senior Thesis',
    description: [
      'Trust Response to Anticipatory Software Agents',
      'Undergraduate capstone project on human computer interaction exploring the trust response of study subjects with unreliable suggestions from a software agent,',
      'Tools: Java, Swing',
    ],
    blurb:
      'My undergraduate capstone in human computer interaction. Study participants worked with a software agent whose suggestions were deliberately unreliable, and the study measured how their trust in it responded.',
    url: '/pdf/TrustResponseToAnticipatorySoftwareAgents.pdf',
    startDate: new Date(2020, 8),
    endDate: new Date(2021, 5),
    tools: [
      {
        Icon: Java,
        label: 'Java',
      },
      {
        Icon: Java,
        label: 'Swing',
      },
    ],
  },
};

export const projectsOrder = ['portfoliov2', 'virtualportfolio', 'portfoliov1', 'thesis'];
