export type ExperienceData = {
  id: string;
  title: string;
  subtitle?: string;
  description: string[];
  startDate?: Date;
  endDate?: Date;
};

export const experienceData: Record<string, ExperienceData> = {
  arbor: {
    id: "arbor",
    title: "Arbor",
    subtitle: "Full Stack Engineer",
    description: [
      "— Designed and delivered custom email notification system to provide real-time insights to users about their savings with Arbor ",
    ],
    startDate: new Date(2025, 0),
  },
  channelai: {
    id: "channelai",
    title: "ChannelAI",
    subtitle: "iOS Engineer, Design System Lead",
    description: [
      "— Delivered interactive UI features and maintained design assets across departments for Channel's AI-powered chat platform.",
      "— Worked extensively with Objective-C, Swift, and SwiftUI to implement core iOS features such as user profiles, media galleries, and app settings.",
      "— Led design system management, ensuring consistency in components, color, and typography across the app.",
    ],
    startDate: new Date(2024, 0),
    endDate: new Date(2024, 4),
  },
  mushroom: {
    id: "mushroom",
    title: "Mushroom.gg",
    subtitle: "Full Stack Engineer, Design System Lead",
    description: [
      "— Contributed to the implementation of chat and feed features for a gaming-focused social media platform.",
      "— Managed cross-platform development for web and mobile using React, React Native, and GraphQL.",
      "— Led the development and maintenance of design libraries, including UI components and iconography.",
    ],
    startDate: new Date(2022, 2),
    endDate: new Date(2024, 0),
  },
  union: {
    id: "union",
    title: "Union College",
    subtitle: "UI/UX Researcher",
    description: [
      "— Conducted a research study on user trust in software agents, using a custom Java game environment.",
      "— Designed and analyzed experiments to measure user interactions with varying levels of agent reliability.",
    ],
    startDate: new Date(2020, 8),
    endDate: new Date(2021, 5),
  },
  tumblr: {
    id: "tumblr",
    title: "Tumblr",
    subtitle: "Systems Intern",
    description: [
      "— Supported the systems department in various tasks during a high-school internship.",
      "— Gained exposure to the fast-paced environment of a tech startup, learning foundational industry skills.",
    ],
    endDate: new Date(2014, 1),
  },
};

// Ordered list for display
export const experienceOrder = [
  "arbor",
  "channelai",
  "mushroom",
  "union",
  "tumblr",
];
