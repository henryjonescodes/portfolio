import { RANGE, tune, type TransitionsConfig } from './tunable';

const S = RANGE.standard;
const E = RANGE.extended;
const F = RANGE.fine;

/**
 * Every Framer Motion transition in the site, grouped component > action > field.
 * `tune` fields are Leva-tunable multiples of a category base; plain values pass through.
 */
export const TRANSITIONS_CONFIG = {
  ABOUT_AVATAR: {
    ANIMATE: {
      delay: tune(
        'COMPONENT',
        5.0,
        E,
        'Avatar > Appear Delay',
        'Wait before avatar starts appearing',
      ),
      duration: tune(
        'COMPONENT',
        8.33,
        E,
        'Avatar > Fade In Duration',
        'How long avatar takes to fully appear',
      ),
    },
    EXIT: {
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Avatar > Fade Out Duration',
        'How long avatar takes to fade out',
      ),
    },
  },

  ABOUT_HERO: {
    ANIMATE: {
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Hero Section > Fade In',
        'Duration for hero section to appear',
      ),
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        S,
        'Hero Section > Element Stagger',
        'Delay between hero elements (name, title)',
      ),
    },
    EXIT: {
      duration: 0,
      when: 'afterChildren',
    },
  },

  ABOUT_MAP: {
    ANIMATE: {
      duration: tune('COMPONENT', 1.0, S, 'Map Section > Fade In', 'Duration for map to appear'),
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        S,
        'Map Section > Marker Stagger',
        'Delay between map markers appearing',
      ),
    },
    EXIT: {
      duration: 0,
      when: 'afterChildren',
    },
  },

  ABOUT_SOCIALS: {
    ANIMATE: {
      delay: tune(
        'COMPONENT',
        5.0,
        E,
        'Social Links > Section Delay',
        'Wait before social links section appears',
      ),
      delayChildren: tune(
        'COMPONENT',
        5.0,
        E,
        'Social Links > Icons Delay',
        'Wait before social icons start appearing',
      ),
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Social Links > Fade Duration',
        'How long each social icon takes to appear',
      ),
      staggerChildren: tune(
        'COMPONENT',
        1.33,
        S,
        'Social Links > Icon Stagger',
        'Delay between each social icon',
      ),
    },
    EXIT: {
      duration: 0,
      when: 'afterChildren',
    },
  },

  ABOUT_STATS: {
    ANIMATE: {
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Stats Section > Fade Duration',
        'How long stat trackers take to appear',
      ),
      staggerChildren: tune(
        'COMPONENT',
        1.33,
        S,
        'Stats Section > Stat Stagger',
        'Delay between each stat appearing',
      ),
    },
    EXIT: {
      duration: 0,
      when: 'afterChildren',
    },
  },

  ABOUT_TAGS: {
    ANIMATE: {
      delay: tune(
        'COMPONENT',
        3.33,
        E,
        'Skills Tags > Section Delay',
        'Wait before skills section appears',
      ),
      delayChildren: tune(
        'COMPONENT',
        3.33,
        E,
        'Skills Tags > Tags Delay',
        'Wait before skill tags start appearing',
      ),
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Skills Tags > Fade Duration',
        'How long each skill tag takes to appear',
      ),
      staggerChildren: tune(
        'COMPONENT',
        1.33,
        S,
        'Skills Tags > Tag Stagger',
        'Delay between each skill tag',
      ),
    },
    EXIT: {
      duration: 0,
      when: 'afterChildren',
    },
  },

  ANIMATED_LINE: {
    ANIMATE: {
      duration: tune(
        'COMPONENT',
        3.33,
        E,
        'Animated Line > Draw Duration',
        'How long animated line takes to draw',
      ),
      ease: 'easeInOut',
    },
  },

  BORDER_BOX: {
    ANIMATE: {
      duration: tune(
        'COMPONENT',
        5.0,
        E,
        'Border Box > Draw Duration',
        'How long animated border takes to draw',
      ),
      ease: 'easeInOut',
    },
    EXIT: {
      duration: tune(
        'COMPONENT',
        3.33,
        E,
        'Border Box > Fade Out Duration',
        'How long border takes to fade out',
      ),
      ease: 'easeInOut',
    },
  },

  COMMON: {
    EXIT: {
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Common > Exit Duration',
        'Default exit duration for generic components',
      ),
    },
  },

  EXPERIENCE: {
    ANIMATE_STAGGER: {
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        S,
        'Experience > Item Stagger Delay',
        'Delay between experience entries appearing',
      ),
    },
    TITLE_ANIMATE_STAGGER: {
      staggerChildren: tune(
        'COMPONENT',
        0.25,
        F,
        'Experience > Title Character Stagger',
        'Delay between title characters appearing',
      ),
    },
    TOOLS_ANIMATE: {
      staggerChildren: tune(
        'COMPONENT',
        1.75,
        F,
        'Experience > Tools Icon Stagger',
        'Delay between each tool icon appearing in the entry',
      ),
    },
  },

  HOME: {
    MENU_ANIMATE_STAGGER: {
      staggerChildren: tune(
        'NAV',
        0.33,
        S,
        'Home Menu > Item Stagger Delay',
        'Delay between menu items appearing',
      ),
    },
  },

  ICON: {
    ANIMATE: {
      duration: tune(
        'COMPONENT',
        1.67,
        S,
        'Icon > Fade In Duration',
        'How long icons take to fade in',
      ),
    },
    EXIT: {
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Icon > Fade Out Duration',
        'How long icons take to fade out',
      ),
    },
  },

  PANELS: {
    STAGGER: {
      delayChildren: tune(
        'MODAL',
        1.5,
        S,
        'Panels > Delay',
        'Wait for the modal morph before panels appear',
      ),
      staggerChildren: tune('MODAL', 0.4, F, 'Panels > Stagger', 'Delay between panels appearing'),
    },
    PANEL: {
      duration: tune('MODAL', 1.0, S, 'Panels > Fade In'),
    },
  },

  CAROUSEL: {
    ROW_STAGGER: {
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        F,
        'Carousel > Card Stagger',
        'Delay between cards appearing',
      ),
    },
    TILE_STAGGER: {
      staggerChildren: tune(
        'COMPONENT',
        0.15,
        F,
        'Carousel > Tile Content Stagger',
        'Delay between the parts of a tile painting in',
      ),
    },
    CARD: {
      duration: tune(
        'MODAL',
        1.17,
        S,
        'Carousel > Card Morph',
        'Card to page morph, open and close',
      ),
    },
    DATE_OPEN: {
      duration: tune(
        'MODAL',
        1.28,
        S,
        'Carousel > Date Open',
        'Date travels slightly slower than the card on open',
      ),
    },
    CONTENT: {
      duration: tune(
        'MODAL',
        1.05,
        S,
        'Carousel > Body Content',
        'Body content reflow inside the morph',
      ),
    },
    MEDIA_OPEN: {
      duration: tune(
        'MODAL',
        1.75,
        S,
        'Carousel > Media Open',
        'Media settles slower than the card on open',
      ),
    },
    DETAILS_ANIMATE: {
      delay: tune(
        'MODAL',
        1.17,
        S,
        'Carousel > Details Delay',
        'Open-only details wait for the morph',
      ),
      duration: tune('MODAL', 1.0, S, 'Carousel > Details Fade In'),
    },
  },

  LINKS: {
    ANIMATE_STAGGER: {
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        F,
        'Links > Entry Stagger',
        'Delay between link entries appearing',
      ),
    },
    BACKGROUND_ANIMATE: {
      duration: tune('COMPONENT', 9.33, E, 'Links > Background Fade In'),
    },
    ICON_ANIMATE: {
      duration: tune('COMPONENT', 1.67, S, 'Links > Icon Fade In'),
    },
    HOVER: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },

  LOADING: {
    EXIT: {
      duration: tune(
        'PAGE',
        1.0,
        S,
        'Loading Screen > Exit Duration',
        'How long loading screen takes to fade out',
      ),
      delay: tune(
        'PAGE',
        6.5,
        E,
        'Loading Screen > Exit Delay',
        'Wait before loading screen starts fading out',
      ),
    },
  },

  LOADING_PAGE: {
    ANIMATE: {
      duration: tune(
        'PAGE',
        1.67,
        S,
        'Loading Page > Fade In Duration',
        'How long loading screen takes to appear',
      ),
      delay: tune(
        'PAGE',
        0,
        S,
        'Loading Page > Appear Delay',
        'Wait before loading screen appears',
      ),
    },
  },

  MAP: {
    CONTENT_ANIMATE: {
      duration: tune(
        'COMPONENT',
        7.67,
        E,
        'Map > Content Fade Duration',
        'How long map content takes to appear',
      ),
    },
    EXIT: {
      duration: tune('COMPONENT', 1.0, S, 'Map > Exit Duration', 'How long map takes to fade out'),
    },
  },

  MAP_DESCRIPTION: {
    ANIMATE: {
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Map > Description Fade Duration',
        'How long map description takes to appear',
      ),
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        S,
        'Map > Description Stagger Delay',
        'Delay between description paragraphs',
      ),
    },
    EXIT: {
      duration: tune(
        'COMPONENT',
        0,
        S,
        'Map > Description Exit Duration',
        'How long description takes to fade out',
      ),
      when: 'afterChildren',
    },
  },

  MAP_SLIDER: {
    ANIMATE: {
      duration: tune(
        'COMPONENT',
        0.67,
        S,
        'Map > Slider Item Fade Duration',
        'How long each slider item takes to appear',
      ),
      staggerChildren: tune(
        'COMPONENT',
        0.17,
        F,
        'Map > Slider Item Stagger Delay',
        'Delay between slider items appearing',
      ),
      staggerDirection: -1,
    },
    EXIT: {
      duration: tune(
        'COMPONENT',
        0.67,
        S,
        'Map > Slider Exit Duration',
        'How long slider takes to fade out',
      ),
      staggerChildren: tune(
        'COMPONENT',
        0.07,
        F,
        'Map > Slider Exit Stagger Delay',
        'Delay between items fading out',
      ),
      when: 'afterChildren',
    },
  },

  MODAL: {
    CONTAINER_ANIMATE: {
      duration: tune(
        'MODAL',
        1.0,
        S,
        'Modal > Container Expand/Collapse',
        'Duration for modal container layout animation',
      ),
      ease: 'easeInOut',
    },
    CONTENT_ANIMATE: {
      duration: tune(
        'MODAL',
        1.0,
        S,
        'Modal > Content Transition',
        'Duration for content area animation',
      ),
    },
    DATE_ANIMATE: {
      duration: tune(
        'MODAL',
        1.1,
        S,
        'Modal > Date Field Duration',
        'Date range animation duration',
      ),
    },
    DESCRIPTION_ANIMATE: {
      delay: tune(
        'MODAL',
        1.67,
        S,
        'Modal > Description Text Delay',
        'Delay before blurb/description appears',
      ),
    },
    LAYOUT_ANIMATE: {
      delay: tune(
        'MODAL',
        0.67,
        S,
        'Modal > Layout Change Delay',
        'Wait before layout expands to full size',
      ),
    },
    OVERLAY_ANIMATE: {
      duration: tune('MODAL', 1.0, S, 'Modal > Background Overlay', 'Dark overlay fade duration'),
    },
  },

  MODAL_HEADER: {
    TEXT_ANIMATE: {
      duration: tune(
        'MODAL',
        6.67,
        E,
        'Modal > Header Text Duration',
        'Title/subtitle animation duration',
      ),
      delay: tune(
        'MODAL',
        6.67,
        E,
        'Modal > Header Text Delay',
        'Wait before header text animates',
      ),
    },
  },

  MODAL_NAVBAR: {
    ANIMATE: {
      duration: tune(
        'MODAL',
        0.67,
        S,
        'Modal > Navbar Fade In',
        'How long modal navbar takes to appear',
      ),
      delay: tune(
        'MODAL',
        0.33,
        S,
        'Modal > Navbar Appear Delay',
        'Wait before navbar starts fading in',
      ),
    },
    CHILDREN_ANIMATE: {
      delayChildren: tune(
        'MODAL',
        3.33,
        E,
        'Modal > Navbar Children Delay',
        'Delay before navbar buttons animate',
      ),
    },
    LINE_ANIMATE: {
      duration: tune(
        'MODAL',
        1.5,
        S,
        'Modal > Navbar Border Line',
        'Animated line draw duration in navbar',
      ),
    },
  },

  MODAL_TEXT: {
    ANIMATE_STAGGER: {
      staggerChildren: tune(
        'MODAL',
        5.7,
        E,
        'Modal > Text Paragraphs Stagger',
        'Delay between paragraphs appearing',
      ),
    },
    PAINT_ANIMATE: {
      duration: tune(
        'MODAL',
        1.67,
        S,
        'Modal > Text Paint Duration',
        'How long text takes to fade in',
      ),
    },
  },

  NAV: {
    ANIMATE_STAGGER: {
      staggerChildren: tune(
        'NAV',
        0.33,
        S,
        'Nav Bar > Item Stagger',
        'Delay between each nav item appearing',
      ),
    },
    EXIT: {
      duration: tune(
        'NAV',
        0.5,
        S,
        'Nav Bar > Exit Duration',
        'How long nav bar takes to fade out',
      ),
    },
    HOME_FIRST_LOAD_ANIMATE: {
      delay: tune(
        'NAV',
        4.33,
        E,
        'Nav Bar > Home First Load Delay',
        'Extra delay on initial home page load',
      ),
    },
  },

  NAV_BUTTON: {
    ACTIVE_ANIMATE: {
      duration: tune(
        'NAV',
        0.33,
        S,
        'Nav Button > Activate Duration',
        'Button transition when becoming active',
      ),
    },
    INACTIVE_ANIMATE: {
      duration: tune(
        'NAV',
        0.5,
        S,
        'Nav Button > Deactivate Duration',
        'Button transition when becoming inactive',
      ),
    },
  },

  NAV_ITEM: {
    BORDER_ANIMATE: {
      duration: tune(
        'NAV',
        0.83,
        S,
        'Nav Item > Border Draw Duration',
        'How long animated border takes to draw',
      ),
      delay: tune(
        'NAV',
        2.5,
        S,
        'Nav Item > Border Appear Delay',
        'Wait before border starts animating',
      ),
      ease: 'easeInOut',
    },
    BORDER_EXIT: {
      duration: tune(
        'NAV',
        0.5,
        S,
        'Nav Item > Border Fade Out',
        'Border fade out duration on exit',
      ),
    },
    FADE_ANIMATE: {
      duration: tune(
        'NAV',
        1.0,
        S,
        'Nav Item > Fade In Duration',
        'How long nav items take to fade in',
      ),
      delay: tune(
        'NAV',
        1.0,
        S,
        'Nav Item > Appear Delay',
        'Wait before nav items start fading in',
      ),
    },
    TEXT_ANIMATE_STAGGER: {
      staggerChildren: tune(
        'TEXT',
        0.15,
        F,
        'Nav Item > Text Character Stagger',
        'Delay between characters in nav items',
      ),
    },
  },

  NAV_MINIMAL: {
    ANIMATE: {
      delay: tune(
        'NAV',
        1.17,
        S,
        'Nav Bar > Minimal Mode Delay',
        'Delay when animations are disabled',
      ),
      duration: tune(
        'NAV',
        0.83,
        S,
        'Nav Bar > Minimal Mode Duration',
        'Duration when animations are disabled',
      ),
    },
    EXIT: {
      duration: tune('NAV', 0.5, S, 'Nav Bar > Minimal Mode Exit', 'Exit duration in minimal mode'),
    },
  },

  PAGE: {
    CHILDREN_ANIMATE: {
      delayChildren: tune(
        'PAGE',
        0.4,
        S,
        'Page > Children Delay',
        'Delay before child elements animate',
      ),
    },
    ENTER_ANIMATE: {
      delay: tune('PAGE', 0.2, S, 'Page > Enter Delay', 'Wait time before page starts fading in'),
    },
    EXIT: {
      duration: tune(
        'PAGE',
        0.4,
        S,
        'Page > Fade Out Duration',
        'How long page container takes to fade out',
      ),
      when: 'beforeChildren',
    },
    FADE_IN_ANIMATE: {
      duration: tune(
        'PAGE',
        1.0,
        S,
        'Page > Fade In Duration',
        'How long page container takes to fade in',
      ),
    },
    FADE_OUT_EXIT: {
      duration: tune(
        'PAGE',
        0.4,
        S,
        'Page > Fade Out Duration (exit)',
        'How long page container takes to fade out',
      ),
    },
    FIRST_LOAD_ANIMATE: {
      delay: tune('PAGE', 1.0, S, 'Page > First Load Delay', 'Extra delay on initial page load'),
    },
    FIRST_LOAD_CHILDREN_ANIMATE: {
      delayChildren: tune(
        'PAGE',
        0.4,
        S,
        'Page > First Load Children Delay',
        'Child element delay on first load',
      ),
    },
    NORMAL_ANIMATE: {
      duration: tune(
        'PAGE',
        1.0,
        S,
        'Page > Normal Fade In Duration',
        'How long page container takes to fade in',
      ),
      delay: tune(
        'PAGE',
        0.2,
        S,
        'Page > Normal Enter Delay',
        'Wait time before page starts fading in',
      ),
      delayChildren: tune(
        'PAGE',
        0.4,
        S,
        'Page > Normal Children Delay',
        'Delay before child elements animate',
      ),
      when: 'beforeChildren',
    },
  },

  PAGE_CONTENTS: {
    EMBEDDED_ANIMATE: {
      duration: tune(
        'PAGE',
        0.2,
        S,
        'Page Contents > Fade In',
        'Inner page content fade in duration',
      ),
      delay: tune(
        'PAGE',
        0.6,
        S,
        'Page Contents > 3D Embedded Delay',
        'Delay when page is in 3D mixer view',
      ),
      delayChildren: tune(
        'PAGE',
        0.6,
        S,
        'Page Contents > 3D Children Delay',
        'Delay when page is in 3D mixer view',
      ),
      staggerChildren: tune(
        'PAGE',
        1.0,
        S,
        'Page Contents > Stagger',
        'Delay between child elements appearing',
      ),
    },
    EXIT: {
      duration: tune(
        'PAGE',
        0.2,
        S,
        'Page Contents > Fade Out',
        'Inner page content fade out duration',
      ),
      when: 'afterChildren',
    },
    FULLSCREEN_ANIMATE: {
      duration: tune(
        'PAGE',
        0.2,
        S,
        'Page Contents > Fullscreen Fade In',
        'Inner page content fade in duration',
      ),
      delay: tune(
        'PAGE',
        0.6,
        S,
        'Page Contents > Fullscreen Delay',
        'Delay when page is in fullscreen mode',
      ),
      delayChildren: tune(
        'PAGE',
        0.6,
        S,
        'Page Contents > Fullscreen Children',
        'Delay when page is in fullscreen mode',
      ),
      staggerChildren: tune(
        'PAGE',
        1.0,
        S,
        'Page Contents > Fullscreen Stagger',
        'Delay between child elements appearing',
      ),
    },
    MINIMAL_SHOWN: {
      duration: tune(
        'PAGE',
        0.2,
        S,
        'Page Contents > Minimal Fade In',
        'Inner page content fade in duration',
      ),
    },
    MINIMAL_REMOVED: {
      when: 'beforeChildren',
    },
  },

  PROJECTS: {
    ANIMATE_STAGGER: {
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        S,
        'Projects > Item Stagger Delay',
        'Delay between project cards appearing',
      ),
    },
    ENTRY_ANIMATE: {
      duration: tune(
        'COMPONENT',
        7.67,
        E,
        'Projects > Entry Fade Duration',
        'How long project card takes to appear',
      ),
    },
    EXIT: {
      duration: tune(
        'COMPONENT',
        1.0,
        S,
        'Projects > Exit Duration',
        'How long projects page takes to exit',
      ),
    },
  },

  PROJECTS_TITLE: {
    ANIMATE_STAGGER: {
      staggerChildren: tune(
        'COMPONENT',
        0.25,
        F,
        'Projects > Title Character Stagger',
        'Delay between title characters appearing',
      ),
    },
  },

  SCENE_CLOSE_BUTTON: {
    ANIMATE: {
      delay: tune(
        'COMPONENT',
        5.0,
        E,
        'Close Button > Appear Delay',
        'Wait before close button appears',
      ),
      duration: tune(
        'COMPONENT',
        6.67,
        E,
        'Close Button > Fade In Duration',
        'How long close button takes to appear',
      ),
    },
    EXIT: {
      duration: tune(
        'COMPONENT',
        3.33,
        E,
        'Close Button > Exit Duration',
        'How long close button takes to fade out',
      ),
    },
  },

  STAT_TRACKER: {
    ANIMATE: {
      staggerChildren: tune(
        'COMPONENT',
        1.33,
        S,
        'Stat Blocks > Appear Stagger',
        'Delay between each stat block appearing',
      ),
      staggerDirection: -1,
    },
    BLOCK_ANIMATE: {
      duration: tune(
        'COMPONENT',
        0.23,
        S,
        'Stat Block > Fade In Duration',
        'How long each stat block takes to appear',
      ),
      delay: tune(
        'COMPONENT',
        0.23,
        S,
        'Stat Block > Appear Delay',
        'Initial delay before stat blocks animate',
      ),
    },
    EXIT: {
      staggerChildren: tune(
        'COMPONENT',
        0.33,
        S,
        'Stat Blocks > Exit Stagger',
        'Delay between each stat block fading out',
      ),
      staggerDirection: 1,
    },
    TEXT_ANIMATE_STAGGER: {
      staggerChildren: tune(
        'TEXT',
        0.15,
        F,
        'Stat Tracker > Text Character Stagger',
        'Delay between characters in stats',
      ),
    },
  },

  TYPEWRITER: {
    ANIMATE_STAGGER: {
      staggerChildren: tune(
        'TEXT',
        0.15,
        F,
        'Typewriter > Character Stagger',
        'Delay between each character typing',
      ),
    },
    CHAR_ANIMATE: {
      duration: tune(
        'TEXT',
        1.0,
        S,
        'Typewriter > Character Duration',
        'How long each character takes to appear',
      ),
    },
    EXIT: {
      duration: tune(
        'TEXT',
        1.5,
        S,
        'Typewriter > Exit Duration',
        'How long text takes to fade out',
      ),
    },
  },
} satisfies TransitionsConfig;
