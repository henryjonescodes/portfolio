import type { EntryData } from "@components/ExperienceEntry/types";

export const experienceData: Record<string, EntryData> = {
  arbor: {
    id: "arbor",
    title: "Arbor",
    subtitle: "Full Stack Engineer",
    description: [
      "— Designed and delivered custom email notification system to provide real-time insights to users about their savings with Arbor ",
    ],
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    blurb: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
    blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
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
    blurb: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
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
    blurb: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
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
