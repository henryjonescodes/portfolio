import GlitchIcon from "@components/GlitchIcon";
import { motion } from "framer-motion";
import React from "react";
import cn from "classnames";
import styles from "./glitch-icon-item.module.scss";
import TypewriterText from "@components/TypewriterText";

const glitchIconItemVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {},
  },
};

type GlitchIconProps = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  className?: string;
  iconClassName?: string;
  children: string;
} & ({ url: string; onClick?: never } | { onClick?: () => void; url?: never });

const GlitchIconItem: React.FC<GlitchIconProps> = ({
  Icon,
  className,
  iconClassName,
  url,
  onClick,
  children,
}) => {
  return (
    <motion.span
      className={cn(className, styles.wrapper)}
      variants={glitchIconItemVariants}
    >
      {!!onClick ? (
        <GlitchIcon
          Icon={Icon}
          onClick={onClick}
          className={cn(iconClassName, styles.icon)}
        />
      ) : (
        <GlitchIcon
          Icon={Icon}
          url={url}
          className={cn(iconClassName, styles.icon)}
        />
      )}
      <motion.p>
        <TypewriterText text={children} staggerChildren={0.1} />
      </motion.p>
    </motion.span>
  );
};

export default GlitchIconItem;
