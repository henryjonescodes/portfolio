import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import PageContents, {
  PageContentsProps,
} from "../../components/Page/PageContents";
import TypewriterText from "../../components/TypewriterText";
import styles from "./experience.module.scss";

const Experience = ({ initialLoad }: PageContentsProps) => {
  return (
    <PageContents initialLoad={initialLoad}>
      <motion.h1>
        <TypewriterText text={"Experience"} staggerChildren={0.05} />
      </motion.h1>

      <motion.div>
        <motion.h2>
          <TypewriterText text={"Channel (ChannelAI)"} />
        </motion.h2>
        <motion.h3>
          <TypewriterText
            text={"Frontend iOS Engineer and Design System Lead"}
          />
        </motion.h3>
        <motion.p>
          <TypewriterText
            text={`• Delivered interactive UI features and maintained design assets across departments for Channel's AI-powered chat platform.`}
          />
        </motion.p>
        <motion.p>
          <TypewriterText
            text={`• Worked extensively with Objective-C, Swift, and SwiftUI to implement core iOS features such as user profiles, media galleries, and app settings.`}
          />
        </motion.p>
        <motion.p>
          <TypewriterText
            text={`• Led design system management, ensuring consistency in components, color, and typography across the app.`}
          />
        </motion.p>
      </motion.div>

      <motion.div>
        <motion.h2>
          <TypewriterText text={"Mushroom (Mushroom.gg)"} />
        </motion.h2>
        <motion.h3>
          <TypewriterText text={"Full Stack Engineer and Design System Lead"} />
        </motion.h3>
        <motion.p>
          <TypewriterText
            text={`• Contributed to the implementation of chat and feed features for a gaming-focused social media platform.`}
          />
        </motion.p>
        <motion.p>
          <TypewriterText
            text={`• Managed cross-platform development for web and mobile using React, React Native, and GraphQL.`}
          />
        </motion.p>
        <motion.p>
          <TypewriterText
            text={`• Led the development and maintenance of design libraries, including UI components and iconography.`}
          />
        </motion.p>
      </motion.div>

      <motion.div>
        <motion.h2>
          <TypewriterText text={"Union College"} />
        </motion.h2>
        <motion.h3>
          <TypewriterText text={"UI/UX Researcher"} />
        </motion.h3>
        <motion.p>
          <TypewriterText
            text={`• Conducted a research study on user trust in software agents, using a custom Java game environment.`}
          />
        </motion.p>
        <motion.p>
          <TypewriterText
            text={`• Designed and analyzed experiments to measure user interactions with varying levels of agent reliability.`}
          />
        </motion.p>
      </motion.div>

      <motion.div>
        <motion.h2>
          <TypewriterText text={"Tumblr"} />
        </motion.h2>
        <motion.h3>
          <TypewriterText text={"Systems Intern"} />
        </motion.h3>
        <motion.p>
          <TypewriterText
            text={`• Supported the systems department in various tasks during a high-school internship.`}
          />
        </motion.p>
        <motion.p>
          <TypewriterText
            text={`• Gained exposure to the fast-paced environment of a tech startup, learning foundational industry skills.`}
          />
        </motion.p>
      </motion.div>
    </PageContents>
  );
};

export default Experience;
