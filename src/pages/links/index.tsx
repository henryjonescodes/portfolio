// Links.tsx
import List from "@assets/svg/icons/list.svg?react";
import Calendar from "@assets/svg/socials/calendar.svg?react";
import Github from "@assets/svg/socials/github.svg?react";
import Instagram from "@assets/svg/socials/Instagram.svg?react";
import LinkedIn from "@assets/svg/socials/linkedIn.svg?react";
import Email from "@assets/svg/socials/mail.svg?react";
import PageContents from "@components/Page/PageContents";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./links.module.scss";
import LinkEntry from "./LinkEntry";
import TypewriterText from "@components/TypewriterText";

const linkEntries = [
  { Icon: Email, label: "Email", stroke: true },
  { Icon: Calendar, label: "Calendar", stroke: true },
  { Icon: LinkedIn, label: "Linkedin", fill: true },
  { Icon: Instagram, label: "Instagram", fill: true },
  { Icon: Github, label: "Github", fill: true },
  { Icon: List, label: "Resume", stroke: true },
];

const linksVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Links = () => {
  const [hoveredEntry, setHoveredEntry] = useState<number | null>(null);

  return (
    <PageContents key={"links"} className={styles.links}>
      <motion.h1>
        <TypewriterText text={"Henry Jones"} staggerChildren={0.05} />
      </motion.h1>
      <motion.h3>
        <TypewriterText text="Creative Developer" />
      </motion.h3>
      <motion.div variants={linksVariants} className={styles.content}>
        {linkEntries.map((entry, index) => (
          <LinkEntry
            key={index}
            index={index}
            Icon={entry.Icon}
            label={entry.label}
            fill={entry.fill}
            stroke={entry.stroke}
            isHovered={hoveredEntry === index}
            isOtherHovered={hoveredEntry !== null && hoveredEntry !== index}
            onHoverStart={() => setHoveredEntry(index)}
            onHoverEnd={() => setHoveredEntry(null)}
          />
        ))}
      </motion.div>
    </PageContents>
  );
};

export default Links;
