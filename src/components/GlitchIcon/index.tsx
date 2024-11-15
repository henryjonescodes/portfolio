import React from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import styles from "./glitch-icon.module.scss";
import { useSettings } from "@context/SettingsContext";

type GlitchIconProps = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  className?: string;
} & ({ url: string; onClick?: never } | { onClick?: () => void; url?: never });

const GlitchIcon: React.FC<GlitchIconProps> = ({
  Icon,
  className,
  url,
  onClick,
}) => {
  const { animationDisabled } = useSettings();
  // Function to handle the content within the wrapper
  const renderContent = () =>
    animationDisabled ? (
      <Icon className={cn(styles.icon, styles.iconPrimary)} />
    ) : (
      <motion.div className={styles.glitch__warp}>
        <Icon className={cn(styles.icon, styles.iconPrimary)} />
        <motion.div className={styles.glitch__layers}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(styles.glitch__layer, styles[`glitch__layer${i}`])}
            >
              <Icon className={styles.icon} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );

  // Determine wrapper and apply appropriate props
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(styles.glitch, className)}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <div onClick={onClick} className={cn(styles.glitch, className)}>
      {renderContent()}
    </div>
  );
};

export default GlitchIcon;
