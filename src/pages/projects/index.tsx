import { motion } from 'framer-motion';
import PageContents from '@components/Page/PageContents';
import ProjectCarousel from '@components/ProjectCarousel';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import { projectsData, projectsOrder } from '@data/projects';
import styles from './projects.module.scss';

const projects = projectsOrder.map((id) => projectsData[id]);

const Projects = () => {
  const { TRANSITIONS } = useAnimations();

  return (
    <PageContents key="projects" className={styles.projects}>
      <ProjectCarousel projects={projects}>
        <motion.h1>
          <TypewriterText
            text="Projects"
            staggerChildren={TRANSITIONS.PROJECTS_TITLE.ANIMATE_STAGGER.staggerChildren}
          />
        </motion.h1>
      </ProjectCarousel>
    </PageContents>
  );
};

export default Projects;
