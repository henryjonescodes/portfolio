import { motion } from 'framer-motion';
import cn from 'classnames';

import styles from './landing.module.scss';

import CustomHTML from '@components/3D/CustomHTML';
import ControlPanel from '@components/ControlPanel';

import { useZoom } from '@context/ZoomContext';

const InfoPanel = () => {
  const { zoomLevel, toggleInfoModeZoomPosition } = useZoom();

  return (
    <CustomHTML transform occlude="blending">
      <motion.div
        className={cn(styles.infoPanel, {
          [styles.button]: zoomLevel !== 'info',
        })}
        onClick={() => {
          if (zoomLevel === 'info') {
            return;
          }
          toggleInfoModeZoomPosition();
        }}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={cn(styles.content, { [styles.disabled]: zoomLevel !== 'info' })}>
          <ControlPanel showLock onClose={toggleInfoModeZoomPosition} />
        </div>
      </motion.div>
    </CustomHTML>
  );
};

export default InfoPanel;
