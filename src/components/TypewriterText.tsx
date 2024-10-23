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
  exit: {
    opacity: 0,
    y: -20, // Characters move upwards on exit
    transition: {
      duration: 0.2,
    },
  },
};

// Animation variants for the parent container
const textVariants = (staggerChildren: number) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerChildren, // Time between each character's appearance
    },
  },
  exit: {
    transition: {
      staggerChildren: staggerChildren / 4, // Stagger the children on exit
      staggerDirection: -1, // Reverse the order for exit
    },
  },
});

// TypeScript interface for component props
interface TypewriterTextProps {
  text: string;
  staggerChildren?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  staggerChildren = 0.009,
}) => {
  return (
    <motion.span variants={textVariants(staggerChildren)}>
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={characterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TypewriterText;
