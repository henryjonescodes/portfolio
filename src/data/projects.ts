import type { EntryData } from "@components/ExperienceEntry/types";
import GitHub from "@assets/svg/socials/github.svg?react";
import ThreeJs from "@assets/svg/tools/ThreeJs.svg?react";
import Blender from "@assets/svg/tools/Blender.svg?react";
import Java from "@assets/svg/tools/Java.svg?react";
import React from "@assets/svg/tools/React.svg?react";
import Sass from "@assets/svg/tools/Sass.svg?react";
import Typescript from "@assets/svg/tools/Typescript.svg?react";
import Framer from "@assets/svg/tools/Framer.svg?react";

export const projectsData: Record<string, EntryData> = {
  portfoliov2: {
    id: "portfoliov2",
    title: "Portfolio v2",
    description: [
      "Portfolio site showcasing 2D animations, work experience, and my presence online,",
      "Tools: Framer Motion, React, SASS, Webpack, SVG",
    ],
    blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    url: "https://v2.henryjones.xyz",
    dateString: "2023",
    tools: [
      {
        Icon: Framer ,
        label: 'Framer Motion'
      },
      {
        Icon: React,
        label: 'React'
      },
      {
        Icon: Sass,
        label: 'Sass'
      },
      {
        Icon: Blender,
        label: 'Blender'
      },
    ],
  },
  virtualportfolio: {
    id: "virtualportfolio",
    title: "Virtual Portfolio",
    description: [
      "Experiment with using Three.js to build a 3D portfolio site.",
      "All models were custom made in Blender.",
      "Tools: Three.js, React, Blender",
    ],
    blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    url: "https://tower.henryjones.xyz",
    tools: [
      {
        Icon: ThreeJs,
        label: 'Three.js'
      },
      {
        Icon: React,
        label: 'React'
      },
      {
        Icon: Blender,
        label: 'Blender'
      },
    ],
    dateString: "2022",
  },
  portfoliov1: {
    id: "portfoliov1",
    title: "Portfolio v1",
    description: [
      "Playful portfolio site showcasing pre-tech work experience & interactive 2D animations,",
      "Tools: Framer Motion, React",
    ],
    blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    url: "https://v1.henryjones.xyz",
    dateString: "2021",
    tools: [
      {
        Icon: Framer,
        label: 'Framer Motion'
      },
      {
        Icon: React,
        label: 'React'
      },
    ],
  },
  thesis: {
    id: "thesis",
    title: "Senior Thesis",
    description: [
      "Trust Response to Anticipatory Software Agents",
      "Undergraduate capstone project on human computer interaction exploring the trust response of study subjects with unreliable suggestions from a software agent,",
      "Tools: Java, Swing",
    ],
    blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    url: "/pdf/TrustResponseToAnticipatorySoftwareAgents.pdf",
    startDate: new Date(2020, 8),
    endDate: new Date(2021, 5),
    tools: [
      {
        Icon: Java,
        label: 'Java'
      },
      {
        Icon: Java,
        label: 'Swing'
      },
    ],
  },
};

export const projectsOrder = ["portfoliov2", "virtualportfolio", "portfoliov1", "thesis"];
