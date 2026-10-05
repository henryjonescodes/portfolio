import { motion } from 'framer-motion';
import type { Effort } from '@components/ExperienceEntry/types';
import PanelGrid from '@components/Panels';
import RichText from './RichText';
import { formatDateRange } from '@utils/text';
import styles from './efforts.module.scss';

type EffortViewProps = {
  effort: Effort;
  onMention?: (entryId: string, effortId: string | null, source?: HTMLElement) => void;
};

/** One effort: its title and summary typed in, then its panels. */
const EffortView = ({ effort, onMention }: EffortViewProps) => (
  <motion.div className={styles.effort} initial="initial" animate="animate">
    <h3>{effort.title}</h3>
    {(effort.dateString || effort.startDate) && (
      <p className={styles.dates}>
        {effort.dateString ?? formatDateRange(effort.startDate, effort.endDate)}
      </p>
    )}
    <p>
      <RichText text={effort.summary} onMention={onMention} staggerChildren={0.004} />
    </p>
    {!!effort.panels?.length && <PanelGrid panels={effort.panels} />}
  </motion.div>
);

export default EffortView;
