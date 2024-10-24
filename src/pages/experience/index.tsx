import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import PageContents, {
  PageContentsProps,
} from "../../components/Page/PageContents";
import TypewriterText from "../../components/TypewriterText";
import styles from "./experience.module.scss";

const experienceVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Date formatter function
const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  const start = startDate.toLocaleDateString("en-US", formatOptions);

  if (!endDate) {
    return `${start}`;
  }

  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

  if (sameYear) {
    if (sameMonth) {
      return `${start}`;
    } else {
      const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });
      return `${startDate.toLocaleDateString("en-US", {
        month: "short",
      })} - ${endMonth} ${startDate.getFullYear()}`;
    }
  } else {
    const end = endDate.toLocaleDateString("en-US", formatOptions);
    return `${start} - ${end}`;
  }
};

// ExperienceEntry component (not exported)
type ExperienceEntryProps = {
  institution: string;
  title: string;
  description: string[];
  startDate: Date;
  endDate?: Date;
};

const ExperienceEntry = ({
  institution,
  title,
  description,
  startDate,
  endDate,
}: ExperienceEntryProps) => {
  const dateRange = formatDateRange(startDate, endDate);

  return (
    <motion.div className={styles.entry}>
      <motion.span className={styles.header}>
        <motion.div className={styles.title}>
          <motion.h2>
            <TypewriterText text={institution} />
          </motion.h2>
          <motion.p>
            <TypewriterText text={dateRange} />
          </motion.p>
        </motion.div>
        <motion.div className={styles.subtitle}>
          <motion.h3>
            <TypewriterText text={title} />
          </motion.h3>
        </motion.div>
      </motion.span>
      <AnimatedBorderBox
        className={styles.box}
        contentClassName={styles.boxContent}
        borderWidth={2.5}
      >
        {description.map((desc, index) => (
          <motion.p key={index}>
            <TypewriterText text={`• ${desc}`} />
          </motion.p>
        ))}
      </AnimatedBorderBox>
    </motion.div>
  );
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
            "Delivered interactive UI features and maintained design assets across departments for Channel's AI-powered chat platform.",
            "Worked extensively with Objective-C, Swift, and SwiftUI to implement core iOS features such as user profiles, media galleries, and app settings.",
            "Led design system management, ensuring consistency in components, color, and typography across the app.",
          ]}
          startDate={new Date(2024, 0)}
          endDate={new Date(2024, 4)}
        />

        <ExperienceEntry
          institution="Mushroom.gg"
          title="Full Stack Engineer, Design System Lead"
          description={[
            "Contributed to the implementation of chat and feed features for a gaming-focused social media platform.",
            "Managed cross-platform development for web and mobile using React, React Native, and GraphQL.",
            "Led the development and maintenance of design libraries, including UI components and iconography.",
          ]}
          startDate={new Date(2022, 2)}
          endDate={new Date(2024, 0)}
        />

        <ExperienceEntry
          institution="Union College"
          title="UI/UX Researcher"
          description={[
            "Conducted a research study on user trust in software agents, using a custom Java game environment.",
            "Designed and analyzed experiments to measure user interactions with varying levels of agent reliability.",
          ]}
          startDate={new Date(2020, 8)}
          endDate={new Date(2021, 5)}
        />

        <ExperienceEntry
          institution="Tumblr"
          title="Systems Intern"
          description={[
            "Supported the systems department in various tasks during a high-school internship.",
            "Gained exposure to the fast-paced environment of a tech startup, learning foundational industry skills.",
          ]}
          startDate={new Date(2014, 1)}
        />
      </motion.div>
    </PageContents>
  );
};

export default Experience;
