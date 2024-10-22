import { motion } from "framer-motion";

// Define the staggered character typing effect
const staggeredChar = {
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
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const TypewriterText = ({
  text,
  staggerChildren = 0.005,
}: {
  text: string;
  staggerChildren?: number;
}) => {
  return (
    <motion.span
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerChildren, // Time between each character's appearance
          },
        },
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={staggeredChar}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TypewriterText;
