import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import PageContents, {
  PageContentsProps,
} from "../../components/Page/PageContents";
import TypewriterText from "../../components/TypewriterText";
import styles from "./experience.module.scss";
import ExperienceEntry from "../../components/ExperienceEntry";

const experienceVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Experience = ({ initialLoad, fullScreen }: PageContentsProps) => {
  return (
    <PageContents initialLoad={initialLoad} fullScreen={fullScreen}>
      <motion.div variants={experienceVariants}>
        <motion.h1>
          <TypewriterText text={"Experience"} staggerChildren={0.05} />
        </motion.h1>

        <ExperienceEntry
          institution="ChannelAI"
          title="iOS Engineer, Design System Lead"
          description={[
            "— Delivered interactive UI features and maintained design assets across departments for Channel's AI-powered chat platform.",
            "— Worked extensively with Objective-C, Swift, and SwiftUI to implement core iOS features such as user profiles, media galleries, and app settings.",
            "— Led design system management, ensuring consistency in components, color, and typography across the app.",
          ]}
          startDate={new Date(2024, 0)}
          endDate={new Date(2024, 4)}
        />

        <ExperienceEntry
          institution="Mushroom.gg"
          title="Full Stack Engineer, Design System Lead"
          description={[
            "— Contributed to the implementation of chat and feed features for a gaming-focused social media platform.",
            "— Managed cross-platform development for web and mobile using React, React Native, and GraphQL.",
            "— Led the development and maintenance of design libraries, including UI components and iconography.",
          ]}
          startDate={new Date(2022, 2)}
          endDate={new Date(2024, 0)}
        />

        <ExperienceEntry
          institution="Union College"
          title="UI/UX Researcher"
          description={[
            "— Conducted a research study on user trust in software agents, using a custom Java game environment.",
            "— Designed and analyzed experiments to measure user interactions with varying levels of agent reliability.",
          ]}
          startDate={new Date(2020, 8)}
          endDate={new Date(2021, 5)}
        />

        <ExperienceEntry
          institution="Tumblr"
          title="Systems Intern"
          description={[
            "— Supported the systems department in various tasks during a high-school internship.",
            "— Gained exposure to the fast-paced environment of a tech startup, learning foundational industry skills.",
          ]}
          startDate={new Date(2014, 1)}
        />
      </motion.div>
    </PageContents>
  );
};

export default Experience;
