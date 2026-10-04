import { motion } from 'framer-motion';
import type { Effort } from '@components/ExperienceEntry/types';
import PanelGrid from '@components/Panels';
import RichText from './RichText';
import type { Point } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import styles from './efforts.module.scss';

type EffortViewProps = {
  effort: Effort;
  onMention?: (entryId: string, effortId: string | null, origin?: Point) => void;
};

/** One effort: its title and summary typed in, then its panels. */
const EffortView = ({ effort, onMention }: EffortViewProps) => (
  <motion.div className={styles.effort} initial="initial" animate="animate">
    <h3>{effort.title}</h3>
    <p>
      <RichText text={effort.summary} onMention={onMention} staggerChildren={0.004} />
    </p>
    {!!effort.panels?.length && <PanelGrid panels={effort.panels} />}
  </motion.div>
);

export default EffortView;
