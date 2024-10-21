import { motion } from "framer-motion";

// Define the staggered character typing effect
const staggeredChar = (lineIndex: number) => ({
  hidden: { opacity: 0, y: 20 }, // Characters come from below
  visible: ([charIndex, charCount]: [number, number]) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: lineIndex * 0.5 + charIndex * 0.05, // Stagger appearance
      duration: 0.2,
    },
  }),
  exit: ([charIndex, charCount]: [number, number]) => ({
    opacity: 0,
    y: 0,
    transition: {
      delay: (charCount - charIndex) * 0.05,
      duration: 0.2,
    },
  }),
});

// Component to animate text with staggered characters
const TypewriterText = ({
  text,
  lineIndex = 0,
}: {
  text: string;
  lineIndex?: number;
}) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={staggeredChar(lineIndex)}
          custom={[index, text.length]}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
};

export default TypewriterText;
