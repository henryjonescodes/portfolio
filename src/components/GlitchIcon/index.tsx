import React from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { linkProps } from '@utils/links';
import { Link, useLocation } from 'react-router-dom';
import styles from './glitch-icon.module.scss';
import { useSettings } from '@context/SettingsContext';

/** Offset copies stacked over the original for the glitch effect (styled per index). */
const GLITCH_LAYERS = [0, 1, 2, 3, 4];

type GlitchIconProps = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  className?: string;
} & ({ url: string; onClick?: never } | { onClick?: () => void; url?: never }) & {
    /** Accessible name; required in practice when the link shows only an icon. */
    label?: string;
    /** Icons drawn with strokes are themed on the stroke instead of the fill. */
    paint?: 'fill' | 'stroke';
  };

const GlitchIcon: React.FC<GlitchIconProps> = ({
  Icon,
  className,
  url,
  onClick,
  label,
  paint = 'fill',
}) => {
  const { animationDisabled } = useSettings();
  const paintClass = paint === 'stroke' && styles.stroke;
  const { search } = useLocation();
  // Function to handle the content within the wrapper
  const renderContent = () =>
    animationDisabled ? (
      <Icon className={cn(styles.icon, styles.iconPrimary)} />
    ) : (
      <motion.div className={styles.glitch__warp}>
        <Icon className={cn(styles.icon, styles.iconPrimary)} />
        <motion.div className={styles.glitch__layers} aria-hidden>
          {GLITCH_LAYERS.map((i) => (
            <motion.div key={i} className={cn(styles.glitch__layer, styles[`glitch__layer${i}`])}>
              <Icon className={styles.icon} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );

  // A page path stays in the app and keeps the query (lite, debug); files and other sites
  // open in a tab.
  if (url && /^\/[^.]*$/.test(url)) {
    return (
      <Link
        to={{ pathname: url, search }}
        aria-label={label}
        className={cn(styles.glitch, paintClass, className)}
      >
        {renderContent()}
      </Link>
    );
  }

  if (url) {
    return (
      <a
        {...linkProps(url)}
        aria-label={label}
        className={cn(styles.glitch, paintClass, className)}
      >
        {renderContent()}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(styles.glitch, styles.button, paintClass, className)}
      >
        {renderContent()}
      </button>
    );
  }

  return <div className={cn(styles.glitch, paintClass, className)}>{renderContent()}</div>;
};

export default GlitchIcon;
