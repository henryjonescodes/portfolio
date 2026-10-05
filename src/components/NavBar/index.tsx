import { AnimatePresence, motion } from 'framer-motion';
import { useSettings } from '@context/SettingsContext';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { useNavigatePreserveQuery } from '@hooks/useNavigatePreserveQuery';
import { useAnimations } from '@context/AnimationContext';
import { widthSmall } from '@styles/layout.constants.ts';
import { isMobile } from 'react-device-detect';
import TypewriterText from '@components/TypewriterText';
import AnimatedLine from '@components/AnimatedLine';

import Checklist from '@assets/svg/icons/check-list.svg?react';
import Code from '@assets/svg/icons/code.svg?react';
import Expand from '@assets/svg/icons/expand.svg?react';
import Handheld from '@assets/svg/icons/handheld.svg?react';
import Home from '@assets/svg/icons/home.svg?react';
import Pause from '@assets/svg/icons/pause.svg?react';
import Play from '@assets/svg/icons/play.svg?react';
import SoundOff from '@assets/svg/icons/sound-off.svg?react';
import SoundOn from '@assets/svg/icons/sound-on.svg?react';
import Settings from '@assets/svg/icons/settings.svg?react';
import User from '@assets/svg/icons/user.svg?react';

import { usePage } from '@context/PageContext';
import { useZoom } from '@context/ZoomContext';
import { useLoading } from '@context/LoadingContext';
import { useControlPanel } from '@context/ControlPanelContext';
import { usePreferences } from '@context/PreferencesContext';

import styles from './nav-bar.module.scss';
import NavBarButton from './NavBarButton';
import NavBarItem from './NavbarItem';

type NavBarProps = {
  page: string | undefined;
};

const NavBar = ({ page }: NavBarProps) => {
  const navigate = useNavigatePreserveQuery(); // Initialize the navigate function
  const { width } = useWindowDimensions();
  const { embedded } = usePage();
  const { animationDisabled, setAnimationDisabled } = useSettings();
  const { firstPageLoad, liteMode } = useLoading();
  const { zoomLevel, toggleFullscreenZoomPosition } = useZoom();
  const { TRANSITIONS } = useAnimations();
  const { preferences, setPreference } = usePreferences();
  const { open: panelOpen, setOpen: setPanelOpen } = useControlPanel();

  const navBarVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        ...TRANSITIONS.NAV_ITEM.FADE_ANIMATE,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const minimalNavBarVariants = {
    animate: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.7,
        duration: 0.5,
        when: 'afterChildren',
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
      },
    },
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const pageName = page ? page : 'home';
  const mini = embedded || width < widthSmall;
  const centerText = mini ? pageName : `$henry-jones/${pageName}`;

  return (
    <motion.nav
      aria-label="Site"
      className={styles.navigationBar}
      variants={firstPageLoad ? navBarVariants : minimalNavBarVariants}
      initial={firstPageLoad ? 'initial' : 'animate'}
      animate={firstPageLoad ? 'animate' : 'show'}
      exit={firstPageLoad ? 'exit' : 'exit'}
    >
      <AnimatedLine className={styles.navbarBorder} borderWidth={5} horizontal />

      <motion.span className={styles.contents}>
        <motion.span className={styles.left}>
          <NavBarItem
            mini={mini}
            label="About"
            onClick={() => handleNavClick('/about')}
            selected={page === 'about'}
            Icon={User}
          />
          <NavBarItem
            mini={mini}
            label="Experience"
            onClick={() => handleNavClick('/experience')}
            selected={page === 'experience'}
            Icon={Checklist}
          />
          <NavBarItem
            mini={mini}
            label="Projects"
            onClick={() => handleNavClick('/projects')}
            selected={page === 'projects'}
            Icon={Code}
          />
        </motion.span>
        <motion.span className={styles.center}>
          <motion.h3>
            <AnimatePresence>
              <motion.span
                initial={animationDisabled ? 'animate ' : 'initial'}
                animate="animate"
                exit="exit"
                variants={{
                  animate: {
                    transition: {
                      delayChildren: firstPageLoad ? 2.6 : 0,
                    },
                  },
                }}
              >
                <TypewriterText key={centerText} text={centerText ?? ''} staggerChildren={0.05} />
              </motion.span>
            </AnimatePresence>
          </motion.h3>
        </motion.span>
        <motion.span className={styles.right}>
          <NavBarButton
            onClick={() => setPreference('sound', !preferences.sound)}
            active={!preferences.sound}
            Icon={SoundOn}
            ActiveIcon={SoundOff}
            label={preferences.sound ? 'Sound on' : 'Sound off'}
          />
          {!embedded && zoomLevel === 'fullscreen' && (
            <NavBarButton
              onClick={() => setPanelOpen(!panelOpen)}
              Icon={Settings}
              label={panelOpen ? 'Close control panel' : 'Open control panel'}
            />
          )}
          <NavBarButton
            onClick={() => setAnimationDisabled(!animationDisabled, true)}
            Icon={Pause}
            ActiveIcon={Play}
            active={animationDisabled}
            label={animationDisabled ? 'Play animations' : 'Pause animations'}
          />
          <NavBarButton
            onClick={() => {
              toggleFullscreenZoomPosition();
            }}
            active={zoomLevel === 'fullscreen'}
            Icon={Expand}
            ActiveIcon={Handheld}
            label={
              zoomLevel !== 'fullscreen'
                ? 'Full screen'
                : liteMode && isMobile
                  ? 'View in 3D'
                  : 'Back to the device'
            }
          />
          <NavBarButton onClick={() => navigate(`/`, { replace: true })} Icon={Home} label="Home" />
        </motion.span>
      </motion.span>
    </motion.nav>
  );
};

export default NavBar;
