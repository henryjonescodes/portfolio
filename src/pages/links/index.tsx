import { motion } from 'framer-motion';
import { useMemo } from 'react';
import LinkIcon from '@assets/svg/icons/link.svg?react';
import AnimatedBorderBox from '@components/AnimatedBorderBox';
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
    <PageContents key="links" className={styles.links} fill>
      <div className={styles.center}>
        <header className={styles.header}>
          <motion.h1>
            <TypewriterText text="Henry Jones" staggerChildren={0.05} />
          </motion.h1>
          <motion.h3 aria-level={2}>
            <TypewriterText text="Creative Developer" />
          </motion.h3>
        </header>
        <AnimatedBorderBox className={styles.panel} contentClassName={styles.panelContent}>
          <div className={styles.titleBar} aria-hidden>
            <LinkIcon className={styles.titleIcon} />
            <TypewriterText text="links" />
          </div>
          <motion.nav variants={listVariants} className={styles.keys} aria-label="Links">
            {links.map((link) => (
              <LinkEntry key={link.label} {...link} />
            ))}
          </motion.nav>
        </AnimatedBorderBox>
      </div>
    </PageContents>
  );
};

export default Links;
