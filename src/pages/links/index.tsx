import { motion } from 'framer-motion';
import { useMemo } from 'react';
import PageContents from '@components/Page/PageContents';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import { links } from '@data/links';
import LinkEntry from './LinkEntry';
import styles from './links.module.scss';

const Links = () => {
  const { TRANSITIONS } = useAnimations();
  const listVariants = useMemo(
    () => ({ animate: { transition: TRANSITIONS.LINKS.ANIMATE_STAGGER } }),
    [TRANSITIONS],
  );

  return (
    <PageContents key="links" className={styles.links}>
      <motion.h1>
        <TypewriterText text="Henry Jones" staggerChildren={0.05} />
      </motion.h1>
      <motion.h3 aria-level={2}>
        <TypewriterText text="Creative Developer" />
      </motion.h3>
      <motion.nav variants={listVariants} className={styles.content} aria-label="Links">
        {links.map((link) => (
          <LinkEntry key={link.label} {...link} />
        ))}
      </motion.nav>
    </PageContents>
  );
};

export default Links;
