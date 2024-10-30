import React from "react";
import styles from "./glitch-icon.module.scss";
import cn from "classnames";

type GlitchIconProps = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
};

const GlitchIcon = ({ Icon }: GlitchIconProps) => {
  return (
    <div className={styles.glitch}>
      <Icon className={cn(styles.icon, styles.iconPrimary)} />
      <div className={styles.glitch__layers}>
        <div className={`${styles.glitch__layer} ${styles.glitch__layer1}`}>
          <Icon className={styles.icon} />
        </div>
        <div className={`${styles.glitch__layer} ${styles.glitch__layer2}`}>
          <Icon className={styles.icon} />
        </div>
        <div className={`${styles.glitch__layer} ${styles.glitch__layer3}`}>
          <Icon className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default GlitchIcon;
