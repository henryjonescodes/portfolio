import { motion } from 'framer-motion';
import EntryList from '@components/EntryList';
import PageContents from '@components/Page/PageContents';
import TypewriterText from '@components/TypewriterText';
import { experienceData, experienceOrder } from '@data/experience';
import styles from './experience.module.scss';

const experienceList = experienceOrder.map((id) => experienceData[id]);

const experienceVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Experience = () => (
  <PageContents key={'experience'} className={styles.experience} fill>
    <motion.div variants={experienceVariants} className={styles.content}>
      <motion.h1>
        <TypewriterText text={'Experience'} staggerChildren={0.05} />
      </motion.h1>
      <EntryList entries={experienceList} />
    </motion.div>
  </PageContents>
);

export default Experience;
