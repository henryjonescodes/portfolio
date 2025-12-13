import type { EntryData } from "@components/ExperienceEntry/types";

export const projectsData: Record<string, EntryData> = {
  portfoliov2: {
    id: "portfoliov2",
    title: "Portfolio v2",
    description: [
      "Portfolio site showcasing 2D animations, work experience, and my presence online,",
      "Tools: Framer Motion, React, SASS, Webpack, SVG",
    ],
    url: "https://v2.henryjones.xyz",
    dateString: "2023",
  },
  virtualportfolio: {
    id: "virtualportfolio",
    title: "Virtual Portfolio",
    description: [
      "Experiment with using Three.js to build a 3D portfolio site.",
      "All models were custom made in Blender.",
      "Tools: Three.js, React, Blender",
    ],
    url: "https://tower.henryjones.xyz",
    dateString: "2022",
  },
  portfoliov1: {
    id: "portfoliov1",
    title: "Portfolio v1",
    description: [
      "Playful portfolio site showcasing pre-tech work experience & interactive 2D animations,",
      "Tools: Framer Motion, React",
    ],
    url: "https://v1.henryjones.xyz",
    dateString: "2021",
  },
  thesis: {
    id: "thesis",
    title: "Senior Thesis",
    description: [
      "Trust Response to Anticipatory Software Agents",
      "Undergraduate capstone project on human computer interaction exploring the trust response of study subjects with unreliable suggestions from a software agent,",
      "Tools: Java, Swing",
    ],
    url: "/pdf/TrustResponseToAnticipatorySoftwareAgents.pdf",
    startDate: new Date(2020, 8),
    endDate: new Date(2021, 5),
  },
};

export const projectsOrder = ["portfoliov2", "virtualportfolio", "portfoliov1", "thesis"];
