// LinkEntry.tsx
import { motion } from "framer-motion";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import styles from "./links.module.scss";
import TypewriterText from "@components/TypewriterText";
import cn from "classnames";

type EntryProps = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  label: string;
  fill?: boolean;
  stroke?: boolean;
  index: number;
  isHovered: boolean;
  isOtherHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

const backgroundVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 2.8,
    },
  },
};

const iconVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const LinkEntry = ({
  Icon,
  label,
  fill = false,
  stroke = false,
  isHovered,
  isOtherHovered,
  onHoverStart,
  onHoverEnd,
}: EntryProps) => {
  return (
    <motion.div
      className={styles.entryWrapper}
      initial={{ scale: 1, filter: "saturate(1)" }}
      animate={{
        scale: isHovered ? 1.02 : 1,
        filter: isOtherHovered ? "saturate(0.5)" : "saturate(1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <AnimatedBorderBox
        className={styles.entry}
        contentClassName={styles.entryContent}
        borderWidth={4}
      >
        <motion.div
          className={styles.background}
          variants={backgroundVariants}
        />
        <motion.div
          className={cn(styles.icon, {
            [styles.iconFill]: fill,
            [styles.iconStroke]: stroke,
          })}
          variants={iconVariants}
        >
          <Icon />
        </motion.div>
        <motion.h3 className={styles.label}>
          <TypewriterText text={label} staggerChildren={0.08} />
        </motion.h3>
      </AnimatedBorderBox>
    </motion.div>
  );
};

export default LinkEntry;
