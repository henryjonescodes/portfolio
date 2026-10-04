import { motion } from 'framer-motion';
import TypewriterText from '@components/TypewriterText';
import PageContents from '@components/Page/PageContents';
import { useNavigatePreserveQuery } from '@hooks/useNavigatePreserveQuery';
import { useAnimations } from '@context/AnimationContext';
import styles from './home.module.scss';

const MENU = [
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
];

const Home = () => {
  const navigate = useNavigatePreserveQuery();
  const { TRANSITIONS } = useAnimations();

  const menuVariants = {
    animate: {
      transition: TRANSITIONS.HOME.MENU_ANIMATE_STAGGER,
    },
  };

  const textStaggerSeconds = TRANSITIONS.TYPEWRITER.ANIMATE_STAGGER.staggerChildren;

  return (
    <PageContents key={'menu'} className={styles.menu}>
      <motion.h1 variants={menuVariants}>
        <TypewriterText text="Henry Jones" staggerChildren={textStaggerSeconds} />
      </motion.h1>

      <motion.h3 variants={menuVariants} aria-level={2}>
        <TypewriterText text="Creative Developer" staggerChildren={textStaggerSeconds} />
      </motion.h3>

      <motion.nav aria-label="Pages" className={styles.links}>
        {MENU.map(({ path, label }) => (
          <motion.h2 key={path} variants={menuVariants}>
            <a
              href={path}
              onClick={(e) => {
                e.preventDefault();
                navigate(path);
              }}
            >
              <TypewriterText text={label} staggerChildren={textStaggerSeconds} />
            </a>
          </motion.h2>
        ))}
      </motion.nav>
    </PageContents>
  );
};

export default Home;
