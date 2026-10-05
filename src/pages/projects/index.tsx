import { motion } from 'framer-motion';
import EntryList from '@components/EntryList';
import PageContents from '@components/Page/PageContents';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import { projectsData, projectsOrder } from '@data/projects';
import styles from './projects.module.scss';

const projectList = projectsOrder.map((id) => projectsData[id]);

const Projects = () => {
  const { TRANSITIONS } = useAnimations();

  const projectsVariants = {
    animate: {
      transition: TRANSITIONS.PROJECTS.ANIMATE_STAGGER,
    },
  };

  return (
    <PageContents key={'projects'} className={styles.projects} fill>
      <motion.div variants={projectsVariants} className={styles.content}>
        <motion.h1>
          <TypewriterText
            text={'Projects'}
            staggerChildren={TRANSITIONS.PROJECTS_TITLE.ANIMATE_STAGGER.staggerChildren}
          />
        </motion.h1>
        <EntryList entries={projectList} mediaInList />
      </motion.div>
    </PageContents>
  );
};

export default Projects;
