import React from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import styles from "./glitch-media.module.scss";
import { useSettings } from "@context/SettingsContext";

type GlitchMediaProps = {
  className?: string;
} & (
  | {
      Icon: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string;
        }
      >;
      video?: never;
      img?: never;
    }
  | {
      video: React.ReactElement<HTMLVideoElement>;
      Icon?: never;
      img?: never;
    }
  | {
      img: React.ReactElement<HTMLImageElement>;
      Icon?: never;
      video?: never;
    }
) &
  ({ url: string; onClick?: never } | { onClick?: () => void; url?: never });

const GlitchMedia: React.FC<GlitchMediaProps> = ({
  Icon,
  video,
  img,
  className,
  url,
  onClick,
}) => {
  const { animationDisabled } = useSettings();

  // Function to handle the content within the wrapper
  const renderContent = () => {
    const MediaElement = Icon ? (
      <Icon className={cn(styles.icon, styles.iconPrimary)} />
    ) : img ? (
      React.cloneElement(img, {
        className: cn(styles.icon, styles.iconPrimary, img.props.className),
      })
    ) : video ? (
      // Wrap the video in a div with className styles.videoWrapper
      <div className={cn(styles.videoWrapper, styles.iconPrimary)}>
        {React.cloneElement(video, {
          className: cn(styles.video, video.props.className),
        })}
      </div>
    ) : null;

    if (animationDisabled) {
      return MediaElement;
    }

    return (
      <motion.div className={styles.glitch__warp}>
        {MediaElement}
        <motion.div className={styles.glitch__layers}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(styles.glitch__layer, styles[`glitch__layer${i}`])}
            >
              {Icon ? (
                <Icon className={styles.icon} />
              ) : img ? (
                React.cloneElement(img, {
                  className: cn(styles.icon, img.props.className),
                })
              ) : video ? (
                <div className={styles.videoWrapper}>
                  {React.cloneElement(video, {
                    className: cn(styles.video, video.props.className),
                  })}
                </div>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  };

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

export default GlitchMedia;
