import { motion } from "framer-motion";
import React from "react";

// Animation variants for individual characters
const characterVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20, // Characters move upwards on exit
    transition: {
      duration: 0.2,
    },
  },
};

// Animation variants for the parent container
const textVariants = (staggerChildren: number, staggerDirection: 1 | -1) => ({
  initial: {
    opacity: 1,
  },
  animate: {
    transition: {
      staggerChildren: staggerChildren, // Time between each character's appearance
      staggerDirection: staggerDirection,
    },
  },
  exit: {
    transition: {
      staggerChildren: staggerChildren / 4, // Stagger the children on exit
      staggerDirection: staggerDirection * -1, // Reverse the order for exit
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
});

// TypeScript interface for component props
interface TypewriterTextProps {
  text: string;
  staggerChildren?: number;
  staggerDirection?: -1 | 1; // Direction for staggering children on exit (default: -1)
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  staggerChildren = 0.009,
  staggerDirection = 1,
}) => {
  return (
    <motion.span variants={textVariants(staggerChildren, staggerDirection)}>
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={characterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TypewriterText;
