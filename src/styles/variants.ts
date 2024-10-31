export const iconVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// TODO: remove the old ones
export const commonExit = {
  opacity: 0,
  transition: {
    duration: 0.3,
    when: "afterChildren",
  },
};

export const commonInitial = {
  opacity: 0,
};