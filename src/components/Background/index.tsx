import { motion } from 'framer-motion';
import styles from './background.module.scss';
import cn from 'classnames';
import { useSettings } from '@context/SettingsContext';

const Background = () => {
  const { animationDisabled } = useSettings();
  return (
    <>
      <motion.div className={cn(styles.backdrop)} />
      <div className={styles.grid} aria-hidden>
        <div className={styles.gridRows} />
        <div className={styles.gridColumns} />
      </div>
      <motion.div
        className={cn(styles.scanlines, {
          [styles.noAnimation]: animationDisabled, // Conditionally apply a no-animation style
        })}
      />
    </>
  );
};

export default Background;
