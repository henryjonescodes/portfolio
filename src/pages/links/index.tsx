import PageContents from "@components/Page/PageContents";
import { motion } from "framer-motion";
import styles from "./links.module.scss";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import Expand from "@assets/svg/icons/expand.svg?react";
import TypewriterText from "@components/TypewriterText";

const linksVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Links = () => {
  return (
    <PageContents key={"links"} className={styles.links}>
      <motion.div variants={linksVariants} className={styles.content}>
        <LinkEntry Icon={Expand} label="Instagram" />
        <LinkEntry Icon={Expand} label="Git" />
        <LinkEntry Icon={Expand} label="Instagram" />
        <LinkEntry Icon={Expand} label="Git" />
        <LinkEntry Icon={Expand} label="Instagram" />
        <LinkEntry Icon={Expand} label="Git" />
        <LinkEntry Icon={Expand} label="Instagram" />
        <LinkEntry Icon={Expand} label="Git" />
        <LinkEntry Icon={Expand} label="Instagram" />
        <LinkEntry Icon={Expand} label="Git" />
      </motion.div>
    </PageContents>
  );
};

type EntryProps = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  label: string;
};

const entryVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const backgroundVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1.8,
    },
  },
};

const iconVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

const LinkEntry = ({ Icon, label }: EntryProps) => {
  return (
    <AnimatedBorderBox
      className={styles.entry}
      contentClassName={styles.entryContent}
      borderWidth={4}
      variants={entryVariants}
    >
      <motion.div className={styles.background} variants={backgroundVariants} />
      <motion.div className={styles.icon} variants={iconVariants}>
        <Icon />
      </motion.div>
      <motion.h3 className={styles.label}>
        <TypewriterText text={label} staggerChildren={0.08} />
      </motion.h3>
    </AnimatedBorderBox>
  );
};

export default Links;
